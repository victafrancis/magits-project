import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
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
  number_of_students: any;

  constructor(
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
    private matDialog: MatDialog,
    private datePipe: DatePipe
  ) {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    // GETS ALL COURSE INSTRUCTORS
    this.courseApi.GetCourseInstructors(this.course_id).subscribe(data => {
      for (const i in data) {
        this.instructors.push(
          { name: data[i].firstname + " " + data[i].lastname, id: data[i]._id });
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

        // end
        var end_hour = data.schedule[i].end.slice(0, 2);
        var end_min = data.schedule[i].end.slice(3);
        var end = new Date();
        end.setHours(end_hour, end_min, 0);
        data.schedule[i].end = this.datePipe.transform(end, "h:mm a");
      }

      this.number_of_students = data.members.length;
      this.course.details = data.details;
      this.course.instructors = data.instructors;
      this.course.max_students = data.max_students;
      this.course.name = data.name;
      this.course.schedule = data.schedule;
      data.session_membership == null ? this.session_membership = null : this.session_membership = data.session_membership;
      data.subscription_membership == null ? this.subscription_membership = null : this.subscription_membership = data.subscription_membership;

    });

  }

  ngOnInit() {
  }

  openEditScheduleModal() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.id = "edit-schedule-component";
    dialogConfig.height = "55%";
    dialogConfig.width = "35%";
    dialogConfig.data = { course_id: this.course_id };
    const modalDialog = this.matDialog.open(EditScheduleComponent, dialogConfig);
  }

  openEditCourseModal() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.id = "edit-course-component";
    dialogConfig.height = "55%";
    dialogConfig.width = "35%";
    dialogConfig.data = { course_id: this.course_id };
    const modalDialog = this.matDialog.open(EditCourseComponent, dialogConfig);
  }

  openAssignInstructorModal() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose() = true;
    dialogConfig.id = "assign-instructor-component";
    dialogConfig.height = "55%";
    dialogConfig.width = "35%";
    dialogConfig.data = { course_id: this.course_id };

    const modalDialog = this.matDialog.open(AssignInstructorComponent, dialogConfig);
  }

  openEditMembershipModal() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose() = true;
    dialogConfig.id = "edit-membership-component";
    dialogConfig.height = "55%";
    dialogConfig.width = "35%";
    dialogConfig.data = { course_id: this.course_id, subscription_membership: this.subscription_membership, session_membership: this.session_membership };
    const modalDialog = this.matDialog.open(EditMembershipComponent, dialogConfig);
  }
}
