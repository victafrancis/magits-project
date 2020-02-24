import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {

  MemberForm: FormGroup;
  disabled: boolean = true;
  member_id: any;

  constructor(
    private actRoute: ActivatedRoute,
    private memberApi: UserService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private datePipe: DatePipe,
    private location: Location
  ) 
  { 
    this.member_id = this.actRoute.snapshot.paramMap.get('id');
    this.memberApi.GetUser(this.member_id).subscribe(data => {
      this.MemberForm = this.fb.group({
        firstname: [{value: data.firstname, disabled: this.disabled}, [Validators.required]],
        lastname: [{value: data.lastname, disabled: this.disabled}, [Validators.required]],
        birthdate: [{value: this.datePipe.transform(data.birthdate, 'yyyy-MM-dd'), disabled: this.disabled}, [Validators.required]],
        email: [{value: data.email, disabled: this.disabled}, [Validators.required]]
      });
    });
  }

  ngOnInit() {
    this.MemberForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  // Enables/disables the form
  memberForm(){
    this.disabled = !this.disabled;
    this.MemberForm = this.fb.group({
      firstname: [{value: this.MemberForm.value.firstname, disabled: this.disabled}, [Validators.required]],
      lastname: [{value: this.MemberForm.value.lastname, disabled: this.disabled}, [Validators.required]],
      birthdate: [{value: this.MemberForm.value.birthdate, disabled: this.disabled}, [Validators.required]],
      email: [{value: this.MemberForm.value.email, disabled: this.disabled}, [Validators.required]]
    });
  }

  // Updates the member information
  updateMemberForm(){
    if(this.MemberForm.valid){
      if(window.confirm('Are you sure you want to update this member?')){
        this.memberApi.UpdateUser(this.member_id, this.MemberForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('instructor/members'));
        });
      }
    }
  }
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.MemberForm.controls[controlName].hasError(errorName);
  }

  // Navigates to the previous page
  backPressed(){
    this.location.back();
  }
}
