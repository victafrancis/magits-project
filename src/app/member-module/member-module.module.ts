import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { memberRoutes } from './member.routes';
import { RoleGuard } from '../_guards/role-guard.service';
import { AuthGuard } from '../_guards/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../material.module';
import { CoursesComponent } from './courses/courses.component';
import { SessionsComponent, DialogOverviewSessionFeedback } from './sessions/sessions.component';
import { ProfileComponent, DialogOverviewChangePassword } from './profile/profile.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import {MatDialogModule} from '@angular/material/dialog';
import { CourseDescriptionComponent } from './courses/course-description/course-description.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';




@NgModule({
  entryComponents: [SessionsComponent, DialogOverviewSessionFeedback, ProfileComponent, DialogOverviewChangePassword],
  declarations: [HomeComponent, LayoutComponent, CoursesComponent, SessionsComponent, ProfileComponent, DialogOverviewSessionFeedback, CourseDescriptionComponent, DialogOverviewChangePassword],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    CommonModule,
    NgxQRCodeModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(memberRoutes),
    MatSortModule
  ],
  bootstrap: [SessionsComponent],

  providers: [
    RoleGuard,
    AuthGuard
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MemberModule { }
