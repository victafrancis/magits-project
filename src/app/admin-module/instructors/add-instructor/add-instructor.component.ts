import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../../../_services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.css']
})
export class AddInstructorComponent implements OnInit {
  instructorForm: FormGroup;
  enabled: boolean = false;

  constructor(
    public fb: FormBuilder,
    private userApi: UserService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.instructorForm.controls[controlName].hasError(errorName);
  }

  submitInstructorForm(){
    if(this.instructorForm.valid){
      if(window.confirm('Are you sure you want to add this instructor?')){
        this.userApi.AddUser(this.instructorForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/admin/instructors'))
        });
      }
    }
  }

  initializeForm(){
    this.enabled = !this.enabled;
    this.instructorForm = this.fb.group({
      firstname: [{value: '', disabled: this.enabled}, [Validators.required]],
      lastname: [{value: '', disabled: this.enabled}, [Validators.required]],
      birthdate: [{value: '', disabled: this.enabled}, [Validators.required]],
      email: [{value: '', disabled: this.enabled}, [Validators.required]],
      password: ['password'],
      role: ['instructor']
    });  
  }
}
