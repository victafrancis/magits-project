import { Routes } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { RoleGuard } from '../_guards/role-guard.service';
import { HomeComponent } from './home/home.component'; 
import { CoursesComponent } from './courses/courses.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { SessionsComponent } from './sessions/sessions.component';
import { MembersComponent } from './members/members.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { AuthGuard } from '../_guards/auth-guard.service';


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
      { path: 'add-instructor', component: AddInstructorComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'add-member', component: AddMemberComponent, data: {role: 'admin'}, canActivate: [RoleGuard]},
      { path: 'create-announcement', component: CreateAnnouncementComponent, data: {role: 'admin'}, canActivate: [RoleGuard]}
    ]
  }
];
