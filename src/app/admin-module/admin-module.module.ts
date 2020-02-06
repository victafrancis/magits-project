import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';
import { RoleGuard } from '../_guards/role-guard.service';
import { AuthGuard } from '../_guards/auth-guard.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../material.module';
import { CoursesComponent } from './courses/courses.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { SessionsComponent } from './sessions/sessions.component';
import { MembersComponent } from './members/members.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { AddInstructorComponent } from './instructors/add-instructor/add-instructor.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import { CreateAnnouncementComponent } from './announcements/create-announcement/create-announcement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { CourseProfileComponent } from './courses/course-profile/course-profile.component';
import { InstructorProfileComponent } from './instructors/instructor-profile/instructor-profile.component';
import { MAT_CHECKBOX_CLICK_ACTION, MatCheckbox, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { EnrollStudentComponent } from './courses/enroll-student/enroll-student.component';
import { ModalComponent } from './courses/modal/modal.component';
import { EditScheduleComponent } from './courses/edit-schedule/edit-schedule.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ViewStudentsComponent } from './courses/view-students/view-students.component';
import { AssignInstructorComponent } from './courses/assign-instructor/assign-instructor.component';

@NgModule({
  declarations: [HomeComponent, LayoutComponent, CoursesComponent, 
    InstructorsComponent, SessionsComponent, MembersComponent, AnnouncementsComponent, 
    CreateCourseComponent, AddInstructorComponent, AddMemberComponent, CreateAnnouncementComponent, 
    MemberProfileComponent, CourseProfileComponent, InstructorProfileComponent, EnrollStudentComponent, 
    ModalComponent, EditScheduleComponent, EditCourseComponent, ViewStudentsComponent, AssignInstructorComponent],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers:[
    RoleGuard,
    AuthGuard,
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ModalComponent, EditScheduleComponent, EditCourseComponent, AssignInstructorComponent]
})
export class AdminModule { }
