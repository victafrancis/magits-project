import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from '../shared2/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../_services/auth.service';
import { decode } from 'punycode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('resetPlayerForm',{static:false}) myNgForm;
  loginForm: FormGroup;
  visible = true;
  selectable = true;
 


  constructor(
    private _authService: AuthService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userAPI: ApiService) { }

  ngOnInit() {
    this.submitBookForm();
  }

  
  /* Reactive book form */
  submitBookForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],    
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitLoginForm() {
    if (this.loginForm.valid) {
      this.userAPI.LoginUser(this.loginForm.value).subscribe(res => {
        localStorage.setItem('token', res.token);
        let token = this._authService.decode();

        if (token.role == "member") {
        this.ngZone.run(() => this.router.navigateByUrl('/member'));
        }else if(token.role == "instructor") {
        this.ngZone.run(() => this.router.navigateByUrl('/instructor'));
        }else if(token.role == "admin"){
        this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        }

      });
    }
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
