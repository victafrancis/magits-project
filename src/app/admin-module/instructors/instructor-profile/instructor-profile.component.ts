import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  instructorForm: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private instructorApi: UserService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private datePipe: DatePipe
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.instructorApi.GetUser(id).subscribe(data => {
      this.instructorForm = this.fb.group({
        firstname: [data.firstname, [Validators.required]],
        lastname: [data.lastname, [Validators.required]],
        birthdate: [this.datePipe.transform(data.birthdate, 'yyyy-MM-dd'), [Validators.required]],
        email: [data.email, [Validators.required]]
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
      email: ['', [Validators.required]]
    });
  }
  
  updateInstructorForm(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you want to update this instructor?')){
      this.instructorApi.UpdateUser(id, this.instructorForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('admin/members'));
      });
    }
  }
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.instructorForm.controls[controlName].hasError(errorName);
  }
}
