import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../../../_services/user/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  memberForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private userApi: UserService,
    private ngZone: NgZone,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.memberForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['password'],
      role: ['member']
    });  
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm.controls[controlName].hasError(errorName);
  }

  submitMemberForm(){
    if(this.memberForm.valid){
      if(window.confirm('Are you sure you want to add this member?')){
        this.userApi.AddUser(this.memberForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/admin/members'))
        });
      }
    }
  }

  // Navigates to previous page
  cancel(){
    this.location.back();
  }
}
