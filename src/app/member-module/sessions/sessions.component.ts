import { Component, OnInit, Inject, Optional, NgZone } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../../_services/user/user.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { DatePipe } from '@angular/common'
import { CourseService } from '../../_services/course/course.service';
import { MatTableDataSource } from '@angular/material';
import { Session } from '../../_services/session/session';
import { timingSafeEqual } from 'crypto';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FeedbackService } from "../../_services/feedback/feedback.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  token = this._authService.decode();
  value = this.token.subject;

  displayedColumns: string[] = ['date', 'course', 'schedule', 'sendFeedback'];
  dataSource: MatTableDataSource<Session>;
  UserData: any = [];
  course_name: any;


  
  sessionWhole: any = [];

  constructor(private courseApi: CourseService, public datePipe: DatePipe, public dialog: MatDialog, private userApi: UserService, private _authService: AuthService) {

      this.userApi.GetMemberSessionsAttended({'subject': this.value}).subscribe(data => {
        for(let x in data){
          let DataList: any = {};
          this.sessionWhole = data;
          this.dataSource = new MatTableDataSource<Session>(this.sessionWhole);
        }
      });
   }

  
  openDialog(element): void {
    const dialogRef = this.dialog.open(DialogOverviewSessionFeedback, {
      maxWidth: '350px',
      maxHeight: '750px',
      width: '80%',
      data: { session: element}
    });
    //console.log(element);

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-sessionFeedback.html',
  styleUrls: ['./sessions.component.css']
})
export class DialogOverviewSessionFeedback {
userFeedback : FormGroup;
course_id: any;
courseName: any;
start_time: any;
end_time: any;
date:any;
session_id: any;
token = this._authService.decode();
value = this.token.subject;
error = false;


session: any;

  constructor( private router: Router,
    private ngZone: NgZone,
    private _authService: AuthService, private feedbackApi: FeedbackService , public fb: FormBuilder, public datePipe: DatePipe, @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any,
    public dialogRef: MatDialogRef<DialogOverviewSessionFeedback>){

      this.session = this.recievedData.session;
      //console.log(this.recievedData.session);
      this.userFeedback = this.fb.group({
        content: ['', [Validators.required]],
      }); 

    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendFeedback(){
    this.feedbackApi.AddFeedback({'content': this.userFeedback.value.content, 'member': this.value, 'session': this.session.session_id}).subscribe(res => {
      this.onNoClick();
      window.alert('Successfully gave feedback. Thank You!');
      location.reload();
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userFeedback.controls[controlName].hasError(errorName);
  }

}

