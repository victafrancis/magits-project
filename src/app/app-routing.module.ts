import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_login/login.component';
import { PageNotFoundComponent } from './_page-not-found/page-not-found.component';
import { adminRoutes } from './admin-module/admin.routes';
import { RegisterComponent } from './register/register.component';
import { MemberModule } from './member-module/member-module.module';
import { InstructorModule } from './instructor-module/instructor-module.module';
import { AdminModule } from './admin-module/admin-module.module';
import { LoginPageGuard } from './_guards/login-page-guard.service';


import { from } from 'rxjs';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'member', component: MemberModule},
  {path: 'instructor', component: InstructorModule},
  {path: 'admin', component: AdminModule},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
