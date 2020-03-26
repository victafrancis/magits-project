import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CourseService } from 'src/app/_services/course/course.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/_services/user/user.service';
import { User } from 'src/app/_services/user/user';

@Component({
  selector: 'app-confirm-enroll',
  templateUrl: './confirm-enroll.component.html',
  styleUrls: ['./confirm-enroll.component.css']
})
export class ConfirmEnrollComponent implements OnInit {
  courseForm: FormGroup;
  memberData: any;
  course_id: any;
  member_id: any;
  memberships: any = [];
  membership_selected: any;
  age: any;
  maxAge: any;
  minAge: any;
  slots_open: any;
  parental_consent:any;

  constructor(
    // DATA PASSED TO MODAL COMPONENT
    private dialogRef: MatDialogRef<ConfirmEnrollComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any,
    private courseApi: CourseService,
    private memberApi: UserService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.course_id = this.receivedData.course_id;
    this.member_id = this.receivedData.member_id;

    this.getUserDetails(this.member_id);

    this.courseApi.GetCourse(this.course_id).subscribe(data => {

      // ADDS THE MEMBERSHIP TYPE TO ARRAY IF OPTION EXISTS
      if (data.session_membership != null) {
        this.memberships.push({ 'key': 'Session', 'type': data.session_membership._id,
         'number_of_sessions': data.session_membership.number_of_sessions, 'cost': data.session_membership.cost});
      }
      if (data.subscription_membership != null) {
        this.memberships.push({ 'key': 'Subscription', 'type': data.subscription_membership._id, 'cost': data.subscription_membership.cost});
      }

      this.maxAge = data.max_age;
      this.minAge = data.min_age;
      this.slots_open = data.max_students - data.members.length;
      this.parental_consent = data.parental_consent;

      // POPULATES DISPLAY FORM
      this.courseForm = this.fb.group({
        name: [{ value: data.name, disabled: true }],
        details: [{ value: data.details, disabled: true }],
        max_students: [{ value: data.max_students, disabled: true }],
        user_membership: ['', Validators.required]
      });
    });

    
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name: [''],
      details: [''],
      max_students: [''],
      user_membership: ['', Validators.required]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }

  enrollMember() {
    if (this.courseForm.valid) {
      
      if (window.confirm('Are you sure you want to enroll this member to the course?')) {

        if(this.age > this.maxAge || this.age < this.minAge){
          window.alert('Fail: Your age does not fit the requirement!');
        }else{
          this.courseApi.EnrolMember(this.course_id, { 'member_id': this.member_id, 'membership_id': this.membership_selected.type}).subscribe(res => {
            this.closeDialog();
            this.ngZone.run(() => this.router.navigateByUrl('/instructor/course-list'))
          });
      }
      }
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  getUserDetails(member: any){

    this.memberApi.GetUser(member).subscribe(data =>{
      this.memberData = data.birthdate;

    //birthdate
    var timeDiff = Math.abs(Date.now() - new Date(data.birthdate).getTime());
    this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    });

  }


}
