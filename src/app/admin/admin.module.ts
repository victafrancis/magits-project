import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';
import { RoleGuard } from '../_guards/role-guard.service';
import { AuthGuard } from '../_guards/auth-guard.service';



@NgModule({
  declarations: [HomeComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  providers:[
    RoleGuard,
    AuthGuard
  ]
})
export class AdminModule { }
