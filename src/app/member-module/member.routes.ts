import { Routes } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { RoleGuard } from '../_guards/role-guard.service';
import { HomeComponent } from './home/home.component'; 
import { CoursesComponent } from './courses/courses.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../_guards/auth-guard.service';


export const memberRoutes: Routes = [
  {
    path: 'member',
    component: LayoutComponent,
    data: {role: 'member'},
    canActivate: [RoleGuard, AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' , data: {role: 'member'}, canActivate: [RoleGuard]},
      { path: 'home', component: HomeComponent, data: {role: 'member'}, canActivate: [RoleGuard]},
      { path: 'courses', component: CoursesComponent, data: {role: 'member'}, canActivate: [RoleGuard]},
      { path: 'sessions', component: SessionsComponent, data: {role: 'member'}, canActivate: [RoleGuard]},
      { path: 'profile', component: ProfileComponent, data: {role: 'member'}, canActivate: [RoleGuard]}
    ]
  }
];
