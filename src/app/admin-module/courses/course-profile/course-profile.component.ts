import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services/user/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { Course } from 'src/app/_services/course/course';
import { AssignInstructorComponent } from '../assign-instructor/assign-instructor.component';
import { EditMembershipComponent } from '../edit-membership/edit-membership.component';

@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.css']
})
export class CourseProfileComponent implements OnInit {
  course_id: any;
  session_membership: any;
  subscription_membership: any;
  course = new Course();
  instructors = [];

  constructor(
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private userApi: UserService,
    private matDialog: MatDialog,
    private location: Location
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
      this.course.details = data.details;
      this.course.instructors = data.instructors;
      this.course.max_students = data.max_students;
      this.course.name = data.name;
      this.course.schedule = data.schedule;
      this.course.session_membership = data.session_membership;
      this.course.subscription_membership = data.subscription_membership;
    });

  }

  ngOnInit() {
  }

  openEditScheduleModal(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.id = "edit-schedule-component";
    dialogConfig.height = "55%";
    dialogConfig.width = "35%";
    dialogConfig.data = {course_id: this.course_id};
    const modalDialog = this.matDialog.open(EditScheduleComponent, dialogConfig);
  }

  openEditCourseModal(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.id = "edit-course-component";
    dialogConfig.height = "55%";
    dialogConfig.width = "35%";
    dialogConfig.data = {course_id: this.course_id};
    const modalDialog = this.matDialog.open(EditCourseComponent, dialogConfig);
  }
  
  openAssignInstructorModal(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose() = true;
    dialogConfig.id = "assign-instructor-component";
    dialogConfig.height = "55%";
    dialogConfig.width = "35%";
    dialogConfig.data = {course_id: this.course_id};

    const modalDialog = this.matDialog.open(AssignInstructorComponent, dialogConfig);
  }

  openEditMembershipModal(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose() = true;
    dialogConfig.id = "edit-membership-component";
    dialogConfig.height = "55%";
    dialogConfig.width = "35%";
    dialogConfig.data = {course_id: this.course_id, subscription_membership: this.course.subscription_membership, session_membership: this.course.session_membership};
    const modalDialog = this.matDialog.open(EditMembershipComponent, dialogConfig);
  }
}
