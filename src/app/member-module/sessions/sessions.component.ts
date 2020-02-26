import { Component, OnInit, Inject, Optional } from '@angular/core';
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
  course_id: any;
  course_name: any;
  course_start_time: any;
  course_end_time: any;
  course_date: any;
  session_id: any;
  sent_feedback: boolean = false;

  constructor(private courseApi: CourseService, public datePipe: DatePipe, public dialog: MatDialog, private userApi: UserService, private _authService: AuthService) {

      this.userApi.GetMemberSessionsAttended({'subject': this.value}).subscribe(data => {
        for(let x in data){
          let DataList: any = {};
          DataList.date = data[x].date;
          DataList.start_time = data[x].start_time;
          DataList.end_time = data[x].end_time;
          //this.sent_feedback = data[x].feedback_sent;
          DataList.boolFeedback = data[x].feedback_sent;
          //console.log(this.sent_feedback);

          this.courseApi.GetCourse(data[x].course_id).subscribe(data1 => {
            DataList.courseName = data1.name;
            this.course_name = data1.name;
          });

          this.UserData.push(DataList);
          this.course_id = data[x].course_id;
          this.course_start_time = data[x].start_time;
          this.course_end_time = data[x].end_time;
          this.course_date = data[x].date;
          this.session_id = data[x].session_id;

          this.dataSource = new MatTableDataSource<Session>(this.UserData);
        }
        //console.log(data);
      });
   }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewSessionFeedback, {
      maxWidth: '350px',
      width: '80%',
      data: {course_id: this.course_id, courseName: this.course_name, start_time: this.course_start_time, end_time: this.course_end_time, date: this.course_date, session_id: this.session_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

  constructor(private _authService: AuthService, private feedbackApi: FeedbackService , public fb: FormBuilder, public datePipe: DatePipe, @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any,
    public dialogRef: MatDialogRef<DialogOverviewSessionFeedback>){

      this.course_id = this.recievedData.course_id;
      this.courseName = this.recievedData.courseName;
      this.start_time = this.recievedData.start_time;
      this.end_time = this.recievedData.end_time;
      this.date = this.recievedData.date;
      this.session_id = this.recievedData.session_id

      this.userFeedback = this.fb.group({
        content: ['', [Validators.required]],
      }); 

    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendFeedback(){
    this.feedbackApi.AddFeedback({'content': this.userFeedback.value.content, 'member': this.value, 'session': this.session_id}).subscribe(res => {
      this.onNoClick();
      window.alert('Successfully gave feedback. Thank You!');
      window.location.reload();

    })
    //console.log(this.userFeedback.value.content);
    //console.log(this.value);
    //console.log(this.session_id);

  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userFeedback.controls[controlName].hasError(errorName);
  }

}

