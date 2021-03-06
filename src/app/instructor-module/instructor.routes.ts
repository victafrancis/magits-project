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
import { CreateAnnouncementComponent } from './announcements/create-announcement/create-announcement.component';
import { AddMemberComponent } from '../admin-module/members/add-member/add-member.component';
import { MyCourseProfComponent } from './my-courses/my-course-prof/my-course-prof.component';
import { SessInfoComponent } from './my-courses/sess-info/sess-info.component';
import { ViewStudentsComponent } from './course-list/view-students/view-students.component';
import { AnnouncementInfoComponent } from './announcements/announcement-info/announcement-info.component';


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
      { path: 'create-announcement', component: CreateAnnouncementComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'add-member', component: AddMemberComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'my-course-prof/:id', component: MyCourseProfComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'sess-info/:id', component: SessInfoComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'view-students/:id', component: ViewStudentsComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
      { path: 'announcement-info/:id', component: AnnouncementInfoComponent, data: {role: 'instructor'}, canActivate: [RoleGuard]},
    ]
  }
];
