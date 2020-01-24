import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  instructorForm: FormGroup;
  
  constructor(
    private actRoute: ActivatedRoute,
    private instructorApi: UserService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private datePipe: DatePipe
  ) 
  { 
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
