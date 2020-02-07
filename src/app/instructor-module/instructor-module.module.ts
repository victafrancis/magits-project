import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RoleGuard } from '../_guards/role-guard.service';
import { AuthGuard } from '../_guards/auth-guard.service';
import { RouterModule } from '@angular/router';
import { instructorRoutes } from './instructor.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../material.module';
import { CourseListComponent } from './course-list/course-list.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MembersComponent } from './members/members.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProfileComponent } from './profile/profile.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckInMemberComponent } from './home/check-in-member/check-in-member.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrInfoComponent } from './home/check-in-member/qr/qr-info/qr-info.component';
import { QrInfoDialogComponent } from './home/check-in-member/qr/qr-info-dialog/qr-info-dialog.component';
import { FormatsDialogComponent } from './home/check-in-member/qr/formats-dialog/formats-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SessionInfoComponent } from './home/session-info/session-info.component';
import { MatTableModule } from '@angular/material/table';
import { EnrollStudentComponent } from './course-list/enroll-student/enroll-student.component';
import { CourseProfileComponent } from './course-list/course-profile/course-profile.component';
import { ConfirmEnrollComponent } from './course-list/confirm-enroll/confirm-enroll.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';


@NgModule({
  declarations: [HomeComponent, LayoutComponent, CourseListComponent, MyCoursesComponent, 
    MembersComponent, AnnouncementsComponent, ProfileComponent, CheckInMemberComponent,
     QrInfoComponent, QrInfoDialogComponent, FormatsDialogComponent, SessionInfoComponent, EnrollStudentComponent, 
     CourseProfileComponent, ConfirmEnrollComponent, MemberProfileComponent],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    CommonModule,
    RouterModule.forChild(instructorRoutes),
    ReactiveFormsModule,
    ZXingScannerModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule 
  ],
  providers:[
    RoleGuard,
    AuthGuard,
    DatePipe
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [SessionInfoComponent,ConfirmEnrollComponent]
})
export class InstructorModule { }
