import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { Course } from 'src/app/_services/course/course';
import { Schedule } from 'src/app/_services/schedule/schedule';

import { UserService } from '../../../_services/user/user.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { ScheduleService } from 'src/app/_services/schedule/schedule.service';


@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {
  course_id: any;
  course = new Course();
  sched : Array<Schedule> = [];
  myIns = [];
  myStatus = "";
  token = this._authService.decode();
  value = this.token.subject;

  constructor(private actRoute: ActivatedRoute,  private courseApi: CourseService, private userApi: UserService, private _authService: AuthService, private schedApi: ScheduleService) {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');
    
 // GETS THE COURSE DETAILS
  this.courseApi.GetCourse(this.course_id).subscribe(data => {
  this.course.details = data.details;
  this.course.instructors = data.instructors;
  let tempArr: Array<String> = [];
    for(let y in data.instructors){
      userApi.GetUser(data.instructors[y]).subscribe(data1 => {
        tempArr.push(data1.firstname + " " + data1.lastname)
        this.myIns = tempArr;
      })
    } 
    this.myStatus = "Not Enrolled";
        userApi.GetUser(this.value).subscribe(data2 => {
            for(let z in data2.courses){
              if(data._id == data2.courses[z].course){
                this.myStatus = "Enrolled";
              }
            }
    })
  this.course.schedule = data.schedule[0]._id;
  for(let y in data.schedule){
    schedApi.GetSchedule(data.schedule[y]._id).subscribe(data3 => {
      this.sched.push(data3);
    });
  }
  this.course.name = data.name;
  // not used
  this.course.session_membership = data.session_membership;
  this.course.subscription_membership = data.subscription_membership;
  this.course.max_students = data.max_students;
  });
  }
  ngOnInit() {
  }

}
