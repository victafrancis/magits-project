import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CourseService } from 'src/app/_services/course/course.service';

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css']
})
export class SessionInfoComponent implements OnInit {

  session_info: any;
  course: any;

  constructor(
      @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any,
      private dialogRef: MatDialogRef<SessionInfoComponent>,
      private courseApi: CourseService
  ) {
      this.session_info = recievedData.session_info;

      //GET COURSE DATA
      this.courseApi.GetCourse(this.session_info.course).subscribe(data=>{
        this.course = data;
      });

   }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
