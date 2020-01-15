import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../_services/user/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  memberForm: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private memberApi: UserService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private datePipe: DatePipe
  ) 
  { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.memberApi.GetUser(id).subscribe(data => {
      this.memberForm = this.fb.group({
        firstname: [data.firstname, [Validators.required]],
        lastname: [data.lastname, [Validators.required]],
        birthdate: [this.datePipe.transform(data.birthdate, 'yyyy-MM-dd'), [Validators.required]],
        email: [data.email, [Validators.required]]
      });
    });
  }

  ngOnInit() {
    this.MemberForm();
  }

  MemberForm(){
    this.memberForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  updateMemberForm(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you want to update this member?')){
      this.memberApi.UpdateUser(id, this.memberForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('admin/members'));
      });
    }
  }
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm.controls[controlName].hasError(errorName);
  }
}
