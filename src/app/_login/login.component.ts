import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this._authService.login();
  }

  loginAdmin() {
    this._authService.loginAdmin();
  }

  loginInstructor() {
    this._authService.loginInstructor();
  }
}
