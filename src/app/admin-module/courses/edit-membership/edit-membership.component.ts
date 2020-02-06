import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Course } from '../../../_services/course/course';
import { MembershipService } from '../../../_services/membership/membership.service';

@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.css']
})
export class EditMembershipComponent implements OnInit {
  course_id: any;

  editSession: boolean = false;
  editSubscription: boolean = false;

  subscription_membership: any;
  subscription_membership_form: FormGroup;

  session_membership: any;
  session_membership_form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditMembershipComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any,
    private courseApi: CourseService,
    private MembershipService: MembershipService,
    private fb: FormBuilder
  ) {
    this.course_id = this.receivedData.course_id;
    this.subscription_membership = this.receivedData.subscription_membership;
    this.session_membership = this.receivedData.session_membership;

    console.log(this.receivedData);
  }

  ngOnInit() {
    if (this.session_membership != null) {
      this.session_membership_form = this.fb.group({
        cost: [{value: this.session_membership.cost, disabled: !this.editSession}, Validators.required],
        number_of_sessions: [{value: this.session_membership.number_of_sessions, disabled: !this.editSession}, Validators.required]
      });
    }

    if (this.subscription_membership != null) {
      this.subscription_membership_form = this.fb.group({
        cost: [{value: this.subscription_membership.cost, disabled: !this.editSubscription}, Validators.required]
      });
    }

  }

  updateSessionMembership(){

  }

  updateSubscriptionMembership(){
    
  }

  changeSessionFormStatus(){
    this.editSession = !this.editSession;
    this.session_membership_form = this.fb.group({
      cost: [{value: this.session_membership.cost, disabled: !this.editSession}, Validators.required],
      number_of_sessions: [{value: this.session_membership.number_of_sessions, disabled: !this.editSession}, Validators.required]
    });
  }

  changeSubscriptionFormStatus(){
    this.editSubscription = !this.editSubscription;
    this.subscription_membership_form = this.fb.group({
      cost: [{value: this.subscription_membership.cost, disabled: !this.editSubscription}, Validators.required]
    });
  }


  closeModal(){
    this.dialogRef.close();
  }
  
  public handleSession = (controlName: string, errorName: string) => {
    return this.session_membership_form.controls[controlName].hasError(errorName);
  }

  public handleSubscription = (controlName: string, errorName: string) => {
    return this.subscription_membership_form.controls[controlName].hasError(errorName);
  }

  
}
