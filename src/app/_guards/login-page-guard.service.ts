import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoginPageGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    
    if (this._authService.isAuthenticated()) {
      const user = this._authService.decode();
      let url = user.role.toString();
      if (url == 'member') {
        this._router.navigate(["/member"]);
      } else if(url == 'instructor'){
        this._router.navigate(["/instructor"]);
      } else if (url == 'admin'){
        this._router.navigate(["/admin"]);
      }
      // you can save redirect url so after authing we can move them back to the page they requested
      return false;
    }
    
    return true;

  }

}
