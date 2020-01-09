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


export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    data: {role: 'Admin'},
    canActivate: [RoleGuard],
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full',data: {role: 'Admin'}, canActivate: [RoleGuard]},
      { path: 'home', component: HomeComponent,data: {role: 'Admin'},canActivate: [RoleGuard]},
      { path: 'courses', component: CoursesComponent, data: {role: 'Admin'}, canActivate: [RoleGuard]},
      { path: 'instructors', component: InstructorsComponent, data: {role: 'Admin'}, canActivate: [RoleGuard]},
      { path: 'sessions', component: SessionsComponent, data: {role: 'Admin'}, canActivate: [RoleGuard]},
      { path: 'members', component: MembersComponent, data: {role: 'Admin'}, canActivate: [RoleGuard]},
      { path: 'announcements', component: AnnouncementsComponent, data: {role: 'Admin'}, canActivate: [RoleGuard]},
      { path: 'create-course', component: CreateCourseComponent, data: {role: 'Admin'}, canActivate: [RoleGuard]}
    ]
  }
];
