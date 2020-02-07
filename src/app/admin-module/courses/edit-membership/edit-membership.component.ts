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

  addSession: boolean = false;
  editSession: boolean = false;
  editSubscription: boolean = false;

  addSubscription: boolean = false;
  subscription_membership: any;
  subscription_membership_form: FormGroup;

  session_membership: any;
  session_membership_form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditMembershipComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any,
    private courseApi: CourseService,
    private membershipApi: MembershipService,
    private fb: FormBuilder
  ) {
    this.course_id = this.receivedData.course_id;
    this.subscription_membership = this.receivedData.subscription_membership;
    this.session_membership = this.receivedData.session_membership;
  }

  ngOnInit() {
    // Initializes the session form if required
    if (this.session_membership != null) {
      this.session_membership_form = this.fb.group({
        cost: [{ value: this.session_membership.cost, disabled: !this.editSession }, Validators.required],
        number_of_sessions: [{ value: this.session_membership.number_of_sessions, disabled: !this.editSession }, Validators.required]
      });
    }

    // Initializes the subscription form if required
    if (this.subscription_membership != null) {
      this.subscription_membership_form = this.fb.group({
        cost: [{ value: this.subscription_membership.cost, disabled: !this.editSubscription }, Validators.required]
      });
    }
  }

  // Adds session memberhip
  createSessionMembership() {
    if (this.session_membership_form.valid) {
      if (window.confirm('Are you sure you want to add this membership type to the course?')) {
        this.membershipApi.AddMembership(this.course_id, this.session_membership_form.value).subscribe();
        this.closeModal();
        window.location.reload();
      }
    }
  }

  // Adds subscription memberhip
  createSubscriptionMembership() {
    if (this.subscription_membership_form.valid) {
      if (window.confirm('Are you sure you want to add this membership type to the course?')) {
        this.membershipApi.AddMembership(this.course_id, this.subscription_membership_form.value).subscribe();
        this.closeModal();
        window.location.reload();
      }
    }
  }

  // Updates the session membership info
  updateSessionMembership() {
    if (this.session_membership_form.valid) {
      if (window.confirm('Are you sure you want to update this membership?')) {
        this.membershipApi.UpdateMembership(this.session_membership._id, this.session_membership_form.value).subscribe();
        this.closeModal();
        window.location.reload();
      }
    }
  }

  // Updates the subscription membership info
  updateSubscriptionMembership() {
    if (this.subscription_membership_form.valid) {
      if (window.confirm('Are you sure you want to update this membership?')) {
        this.membershipApi.UpdateMembership(this.subscription_membership._id, this.subscription_membership_form.value).subscribe();
        this.closeModal();
        window.location.reload();
      }
    }
  }

  // Changes the status of the session form, whether it's editable or not
  changeSessionFormStatus() {
    this.editSession = !this.editSession;
    this.session_membership_form = this.fb.group({
      cost: [{ value: this.session_membership.cost, disabled: !this.editSession }, Validators.required],
      number_of_sessions: [{ value: this.session_membership.number_of_sessions, disabled: !this.editSession }, Validators.required]
    });
  }

  // Changes the status of the subscription form, whether it's editable or not
  changeSubscriptionFormStatus() {
    this.editSubscription = !this.editSubscription;
    this.subscription_membership_form = this.fb.group({
      cost: [{ value: this.subscription_membership.cost, disabled: !this.editSubscription }, Validators.required]
    });
  }

  // removes session membership from the course if subscription membership exists
  removeSessionMembership() {
    if (this.subscription_membership != null) {
      if (window.confirm('Are you sure you want to remove this membership?')) {
        this.membershipApi.DeleteMembership(this.session_membership._id).subscribe();
        this.closeModal();
        window.location.reload();
      }
    }
  }

  // removes subscription membership from the course if session membership exists
  removeSubscriptionMembership() {
    if (this.subscription_membership != null) {
      if (window.confirm('Are you sure you want to remove this membership?')) {
        this.membershipApi.DeleteMembership(this.subscription_membership._id).subscribe();
        this.closeModal();
        window.location.reload();
      }
    }
  }

  // closes modal
  closeModal() {
    this.dialogRef.close();
  }

  // validation for session form
  public handleSession = (controlName: string, errorName: string) => {
    return this.session_membership_form.controls[controlName].hasError(errorName);
  }

  // validation for subscription form
  public handleSubscription = (controlName: string, errorName: string) => {
    return this.subscription_membership_form.controls[controlName].hasError(errorName);
  }

  addSessionMembership() {
    this.addSession = !this.addSession;
    this.session_membership_form = this.fb.group({
      membership_type: ['session'],
      cost: ['', Validators.required],
      number_of_sessions: ['', Validators.required]
    });
  }

  addSubscriptionMembership() {
    this.addSubscription = !this.addSubscription;
    this.subscription_membership_form = this.fb.group({
      membership_type: ['subscription'],
      cost: ['', Validators.required]
    });
  }

}
