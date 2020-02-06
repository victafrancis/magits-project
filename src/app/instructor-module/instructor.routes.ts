import { Routes } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { RoleGuard } from '../_guards/role-guard.service';
import { HomeComponent } from './home/home.component'; 
import { CourseListComponent } from './course-list/course-list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MembersComponent } from './members/members.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../_guards/auth-guard.service';
import { CheckInMemberComponent } from './home/check-in-member/check-in-member.component';
import { CourseProfileComponent } from './course-list/course-profile/course-profile.component';
import { EnrollStudentComponent } from './course-list/enroll-student/enroll-student.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';


export const instructorRoutes: Routes = [
  {
    path: 'instructor',
    component: LayoutComponent,
    data: {role: 'instructor'},
    canActivate: [RoleGuard, AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full',data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'home', component: HomeComponent,data: {role: 'instructor'},canActivate: [RoleGuard]},
      { path: 'course-list', component: CourseListComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'my-courses', component: MyCoursesComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'members', component: MembersComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'announcements', component: AnnouncementsComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'profile/:id', component: ProfileComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'check-in-member', component: CheckInMemberComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'course-profile/:id', component: CourseProfileComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'enroll-student/:id', component: EnrollStudentComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'member-profile/:id', component: MemberProfileComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},


    ]
  }
];
