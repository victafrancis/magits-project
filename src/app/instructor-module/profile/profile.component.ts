import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/_services/user/user';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  instructorForm: FormGroup;
  user: any= null;
  constructor(
    private actRoute: ActivatedRoute,
    private instructorApi: UserService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private datePipe: DatePipe,
    private _authService: AuthService
  ) 
  { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.instructorApi.GetUser(id).subscribe(data => {
      console.log(data);
      this.instructorForm = this.fb.group({
        firstname: [data.firstname, [Validators.required]],
        lastname: [data.lastname, [Validators.required]],
        birthdate: [this.datePipe.transform(data.birthdate, 'yyyy-MM-dd'), [Validators.required]],
        email: [data.email, [Validators.required]],
        courses: [data.courses]
      });
    });
    
  }

  ngOnInit() {
    this.InstructorForm();
  }

  InstructorForm(){
    this.instructorForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      courses:['']
    });
  }

  updateInstructorForm(){
    // var id = this.actRoute.snapshot.paramMap.get('id');
    // if(window.confirm('Are you sure you want to update this member?')){
    //   this.instructorApi.UpdateUser(id, this.instructorForm.value).subscribe(res => {
    //     this.ngZone.run(() => this.router.navigateByUrl('admin/members'));
    //   });
    // }
  }
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.instructorForm.controls[controlName].hasError(errorName);
  }
}
