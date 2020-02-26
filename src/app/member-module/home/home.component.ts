import { Component, OnInit, OnDestroy, Inject, Optional } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { map, filter, mergeMap } from "rxjs/operators";
import { MediaChange, MediaObserver  } from '@angular/flex-layout';
import { UserService } from '../../_services/user/user.service';
import { User } from '../../_services/user/user';
import { CourseService } from '../../_services/course/course.service';
import { Course } from '../../_services/course/course';
import { MatTableDataSource } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { DatePipe } from '@angular/common'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Schedule } from 'src/app/_services/schedule/schedule';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
//QR Code
token = this._authService.decode();
value = this.token.subject;
myNumberQRVersion = 9;

//data
UserData: any = [];
dataSourceMembership: MatTableDataSource<Course>;
displayedColumnsMembership: string[] = ['name', 'membership_type','session_remaining'];

UserDataAnnouncement: any = [];
dataSourceAnnouncement: MatTableDataSource<Announcement>;
displayedColumnsAnnouncement: string[] = ['date','from','subject'];
courseWhole: any = [];

// this is for flex grid, please no touch
  watcher: Subscription;
  columns: number = 4;

  constructor( public dialog: MatDialog, public datePipe: DatePipe, private _authService: AuthService, media: MediaObserver, private userApi: UserService, private courseApi: CourseService, private announcementApi: AnnouncementService) {
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change) {
        if (change.mqAlias == 'xs') {
          this.columns = 1;
          this.myNumberQRVersion = 7;
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
    this.userApi.GetMemberCourseDetails({'subject': this.value}).subscribe(data => {
      //console.log(data);
      for(let x in data){
        this.courseWhole = data;
      }
      this.dataSourceMembership = new MatTableDataSource<Course>(this.courseWhole);
    })

    

    this.announcementApi.GetAnnouncements().subscribe(data => {
      this.UserDataAnnouncement = data;
      this.dataSourceAnnouncement = new MatTableDataSource<Announcement>(this.UserDataAnnouncement);
      //console.log(this.UserDataAnnouncement);
    });

   }



   openDialog(element): void {
    const dialogRef = this.dialog.open(DialogCourseInfo, {
      maxWidth: '350px',
      maxHeight: '750px',
      width: '80%',
      data: {course: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }


  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
  //// this is for flex grid, please no touch



  ngOnInit() {
  }



  // call to logout event
  logout() {
    this._authService.logout();
  }
}



@Component({
  selector: 'dialog-course-info',
  templateUrl: './dialog-course-info.html',
  styleUrls: ['./home.component.css']
})

export class DialogCourseInfo {

//data for modal courses
course: any;
sched : Array<Schedule> = [];
ins : Array<any> = [];
insConverted: Array<any> = [];
//

constructor(private userApi: UserService, @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any, public dialogRef: MatDialogRef<DialogCourseInfo>){
 
  this.course = this.recievedData.course;
  this.sched = this.course.course.schedule;
  this.ins = this.course.course.instructors;
  for(let x in this.ins){
    let Datalist: any = {};
    userApi.GetUser(this.ins[x]).subscribe(data => {
      Datalist.ins = data.firstname + " " + data.lastname;
      this.insConverted.push(Datalist);
      //console.log(this.insConverted);
    })
  }
  //console.log(this.recievedData.course);
  //console.log(this.sched);

}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


