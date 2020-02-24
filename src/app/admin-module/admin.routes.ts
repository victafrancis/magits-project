import { Routes } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { RoleGuard } from '../_guards/role-guard.service';
import { HomeComponent } from './home/home.component'; 
import { CoursesComponent } from './courses/courses.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { SessionsComponent } from './sessions/sessions.component';
import { MembersComponent } from './members/members.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

import { AuthGuard } from '../_guards/auth-guard.service';

import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { AddInstructorComponent } from './instructors/add-instructor/add-instructor.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import { CreateAnnouncementComponent } from './announcements/create-announcement/create-announcement.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { CourseProfileComponent } from './courses/course-profile/course-profile.component';
import { InstructorProfileComponent } from './instructors/instructor-profile/instructor-profile.component';
import { EnrollStudentComponent } from './courses/enroll-student/enroll-student.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ViewStudentsComponent } from './courses/view-students/view-students.component';
import { CourseSessionsComponent } from './sessions/course-sessions/course-sessions.component';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    data: {role: 'admin'},
    canActivate: [RoleGuard, AuthGuard],
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full',data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'home', component: HomeComponent,data: {role: 'admin'},canActivate: [RoleGuard]},
      { path: 'courses', component: CoursesComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'instructors', component: InstructorsComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'sessions', component: SessionsComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'members', component: MembersComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'announcements', component: AnnouncementsComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'create-course', component: CreateCourseComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'enroll-student/:id', component: EnrollStudentComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'add-instructor', component: AddInstructorComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'add-member', component: AddMemberComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'create-announcement', component: CreateAnnouncementComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'course-profile/:id', component: CourseProfileComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'member-profile/:id', component: MemberProfileComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'instructor-profile/:id', component: InstructorProfileComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'edit-course/:id', component: EditCourseComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'view-students/:id', component: ViewStudentsComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'course-sessions/:id', component: CourseSessionsComponent, data: {role: 'admin', canActivate: [RoleGuard]}}
    ]
  }
];
