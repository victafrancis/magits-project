import { Routes } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { RoleGuard } from '../_guards/role-guard.service';
import { HomeComponent } from './home/home.component'; 
import { CourseListComponent } from './course-list/course-list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MembersComponent } from './members/members.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProfileComponent } from './profile/profile.component';


export const instructorRoutes: Routes = [
  {
    path: 'instructor',
    component: LayoutComponent,
    data: {role: 'Instructor'},
    canActivate: [RoleGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full',data: {role: 'Instructor'}, canActivate: [RoleGuard]},
      { path: 'home', component: HomeComponent,data: {role: 'Instructor'},canActivate: [RoleGuard]},
      { path: 'course-list', component: CourseListComponent, data: {role: 'Instructor'}, canActivate: [RoleGuard]},
      { path: 'my-courses', component: MyCoursesComponent, data: {role: 'Instructor'}, canActivate: [RoleGuard]},
      { path: 'members', component: MembersComponent, data: {role: 'Instructor'}, canActivate: [RoleGuard]},
      { path: 'announcements', component: AnnouncementsComponent, data: {role: 'Instructor'}, canActivate: [RoleGuard]},
      { path: 'profile', component: ProfileComponent, data: {role: 'Instructor'}, canActivate: [RoleGuard]}
    ]
  }
];
