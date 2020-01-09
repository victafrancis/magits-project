import { Routes } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { RoleGuard } from '../_guards/role-guard.service';
import { HomeComponent } from './home/home.component'; 


export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    data: {role: 'Admin'},
    canActivate: [RoleGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full',data: {role: 'Admin'}, canActivate: [RoleGuard]},
      { path: 'home', component: HomeComponent,data: {role: 'Admin'},canActivate: [RoleGuard]}
    ]
  }
];
