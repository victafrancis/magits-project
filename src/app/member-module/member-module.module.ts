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



@NgModule({
  declarations: [HomeComponent, LayoutComponent],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    CommonModule,
    RouterModule.forChild(memberRoutes)
  ],
  providers: [
    RoleGuard,
    AuthGuard
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MemberModule { }
