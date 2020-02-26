import { Course } from 'src/app/_services/course/course';
// import { MatDialog } from '@angular/material';
// import { FormBuilder } from '@angular/forms';

import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services/user/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Location, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';

@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.css']
})
export class CourseProfileComponent implements OnInit {
//WATCHER
myNumberQRVersion = 9;
  watcher: Subscription;
  columns: number = 4;


  course_id: any;
  course = new Course();
  instructors = [];

  constructor(
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
    private datePipe: DatePipe,
    media: MediaObserver, 
  )
  {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    // GETS ALL COURSE INSTRUCTORS
    this.courseApi.GetCourseInstructors(this.course_id).subscribe(data => {
      for (const i in data) {
        this.instructors.push(
          {name: data[i].firstname + " " + data[i].lastname, id: data[i]._id});
      }
    });

    // GETS THE COURSE DETAILS
    this.courseApi.GetCourse(this.course_id).subscribe(data => {

      for (const i in data.schedule) {
        // start
        var start_hour = data.schedule[i].start.slice(0, 2);
        var start_min = data.schedule[i].start.slice(3);
        var start = new Date();
        start.setHours(start_hour, start_min, 0);
        data.schedule[i].start = this.datePipe.transform(start, "h:mm a");

        // // end
        var end_hour = data.schedule[i].end.slice(0, 2);
        var end_min = data.schedule[i].end.slice(3);
        var end = new Date();
        end.setHours(end_hour, end_min, 0);
        data.schedule[i].end = this.datePipe.transform(end, "h:mm a");

        // let newStart = this.datePipe.transform(this.stringToDate(data.schedule[i].start), 'h:mm a');
        // let newEnd = this.datePipe.transform(this.stringToDate(data.schedule[i].end), 'h:mm a');
        // this.course.schedule[i].start = newStart;
        // this.course.schedule[i].end = newEnd;
      }

      this.course.details = data.details;
      this.course.instructors = data.instructors;
      this.course.max_students = data.max_students;
      this.course.name = data.name;
      this.course.schedule = data.schedule;
      console.log(this.course.schedule)
      this.course.session_membership = data.session_membership;
      this.course.subscription_membership = data.subscription_membership;
    });

     // data.schedule[i].start = this.datePipe.transform(this.stringToDate(data.schedule[i].start), 'h:mm a');
        // data.schedule[i].end = this.datePipe.transform(this.stringToDate(data.schedule[i].end), 'h:mm a');
    //WATCHER
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

  }

  ngOnInit() {
  }

   //Transform end time from string to datetime
   stringToDate(time: any){
     console.log(time);
    var newTime = new Date();
    var end_hour = time.slice(0,2);
    var end_min = time.slice(3);
    newTime.setHours(end_hour, end_min, 0);
    return newTime;
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

}
