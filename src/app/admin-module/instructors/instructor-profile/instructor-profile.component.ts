import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { UserService } from '../../../_services/user/user.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  InstructorForm: FormGroup;
  instructor_id: any;
  disabled: boolean = true;

  constructor(
    private actRoute: ActivatedRoute,
    private instructorApi: UserService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private datePipe: DatePipe
  ) {
    this.instructor_id = this.actRoute.snapshot.paramMap.get('id');
    this.instructorApi.GetUser(this.instructor_id).subscribe(data => {
      this.InstructorForm = this.fb.group({
        firstname: [{value: data.firstname, disabled: this.disabled}, [Validators.required]],
        lastname: [{value: data.lastname, disabled: this.disabled}, [Validators.required]],
        birthdate: [{value: this.datePipe.transform(data.birthdate, 'yyyy-MM-dd'), disabled: this.disabled}, [Validators.required]],
        email: [{value: data.email, disabled: this.disabled}, [Validators.required]]
      });
    });
  }

  // Initializes the form
  ngOnInit() {
    this.InstructorForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  // reinitializes the instructor form
  instructorForm(){
    this.disabled = !this.disabled;
    this.InstructorForm = this.fb.group({
      firstname: [{value: this.InstructorForm.value.firstname, disabled: this.disabled}, [Validators.required]],
      lastname: [{value: this.InstructorForm.value.lastname, disabled: this.disabled}, [Validators.required]],
      birthdate: [{value: this.InstructorForm.value.birthdate, disabled: this.disabled}, [Validators.required]],
      email: [{value: this.InstructorForm.value.email, disabled: this.disabled}, [Validators.required]]
    });
  }
  
  // Updates the instructor info
  updateInstructorForm(){
    if(this.InstructorForm.valid){
      if(window.confirm('Are you sure you want to update this instructor?')){
        this.instructorApi.UpdateUser(this.instructor_id, this.InstructorForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('admin/instructors'));
        });
      }
    }
  }
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.InstructorForm.controls[controlName].hasError(errorName);
  }
}
