import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CreateCourseComponent } from './create-course/create-course.component';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent, LayoutComponent, CoursesComponent, InstructorsComponent, SessionsComponent, MembersComponent, AnnouncementsComponent, CreateCourseComponent, AddInstructorComponent, AddMemberComponent, CreateAnnouncementComponent],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    CommonModule,
    RouterModule.forChild(adminRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    RoleGuard,
    AuthGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
