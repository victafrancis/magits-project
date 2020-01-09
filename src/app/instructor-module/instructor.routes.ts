import { Routes } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { RoleGuard } from '../_guards/role-guard.service';
import { HomeComponent } from './home/home.component'; 


export const instructorRoutes: Routes = [
  {
    path: 'instructor',
    component: LayoutComponent,
    data: {role: 'Instructor'},
    canActivate: [RoleGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full',data: {role: 'Instructor'}, canActivate: [RoleGuard]},
      { path: 'home', component: HomeComponent,data: {role: 'Instructor'},canActivate: [RoleGuard]}
    ]
  }
];
