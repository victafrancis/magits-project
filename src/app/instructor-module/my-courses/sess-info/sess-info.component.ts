import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';
import { FormGroup} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SessionService } from 'src/app/_services/session/session.service';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/_services/user/user';
import { Location } from '@angular/common';
import { UserService } from 'src/app/_services/user/user.service';
import { CourseService } from 'src/app/_services/course/course.service';
import { FeedbackService } from 'src/app/_services/feedback/feedback.service';
import { Feedback } from 'src/app/_services/feedback/feedback';



@Component({
  selector: 'app-sess-info',
  templateUrl: './sess-info.component.html',
  styleUrls: ['./sess-info.component.css']
})
export class SessInfoComponent implements OnInit {
  // 
  myNumberQRVersion = 9;
  watcher: Subscription;
  columns: number = 4;

//Course Info
course: any={};

//SessionInfo
  session_id: any;
  session: any;
  sessionForm: FormGroup;

//Attendees Table
  attendees: any=[];
  displayedColumns: string[] = ['member','customColumn'];
  attendeeDataSource: MatTableDataSource<User>;
  checkInTime: any=[];

//Feedback Table
  feedback: any=[];
  feedbackDisplayedColumns: string[] = ['content'];
  feedbackDataSource: MatTableDataSource<Feedback>;

  //LOADING
  isLoading: boolean = true;
  noAttendees: boolean = false; 

   constructor(
     public dialog: MatDialog, 
     private _authService: AuthService,
     media: MediaObserver, 
     private actRoute: ActivatedRoute, 
     private sessionApi: SessionService,
     private sessionApi2: SessionService,
     private location: Location,
     private memberApi: UserService,
     private courseApi: CourseService,
     private feedbackApi: FeedbackService
     ) {

    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change) {
        if (change.mqAlias == 'xs') {
          this.columns = 1;
          this.myNumberQRVersion = 4;
        } else if( change.mqAlias == 'sm'){
          this.myNumberQRVersion = 8;
        } else if( change.mqAlias == 'md'){
          this.myNumberQRVersion = 9;
        } else {
          this.columns = 2;
          this.myNumberQRVersion = 11;
        }
      }
    });

    this.session_id = this.actRoute.snapshot.paramMap.get('id');
    
    // GET SESSION INFORMATION
    this.sessionApi.GetSession(this.session_id).subscribe(data => {
        this.session = data;

    // GET COURSE NAME OF THIS SESSION
    this.courseApi.GetCourse(data.course).subscribe(courseData=>{
      this.course = courseData;
    })

    // GET FEEDBACK FROM THIS SESSION
    this.sessionApi2.ViewSessionFeedback({session_id: this.session_id}).subscribe(feedbackData => {
     this.feedback = feedbackData;
     this.feedbackDataSource = new MatTableDataSource<Feedback>(this.feedback);
    });

      // GET SESSION ATTENDEES
      if(data.attendees){
        for (let index in data.attendees) { 

          if(data.attendees[index].member != undefined ){
            this.checkInTime[this.checkInTime.length] = data.attendees[index].time;
            this.getUser(data.attendees[index].member);
          }
        }  
      }else{

        // if(data.attendees.length > 0){
        //   this.isLoading = false;
        // }else if(data.attendees.length == 0){
        //   this.isLoading = false;
        //   this.noAttendees = true;
        // }
  
      }
      

      });

    }
   

   public handleError = (controlName: string, errorName: string) => {
    return this.sessionForm.controls[controlName].hasError(errorName);
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  ngOnInit() {
  
  }

  back(){
    this.location.back();
  }

  getUser(id:any){
    this.memberApi.GetUser(id).subscribe(user =>{
      this.attendees.push(user);
      this.attendeeDataSource = new MatTableDataSource<User>(this.attendees);
    }) 

  }

}
