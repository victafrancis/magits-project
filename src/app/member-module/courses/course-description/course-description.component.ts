import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { Course } from 'src/app/_services/course/course';
import { Schedule } from 'src/app/_services/schedule/schedule';

import { UserService } from '../../../_services/user/user.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { ScheduleService } from 'src/app/_services/schedule/schedule.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AutofillMonitor } from '@angular/cdk/text-field';


@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {
  course_id: any;
  course = new Course();
  subCost: any;
  sessCost: any;
  numberSess: any;
  studCount: any;
  sched : Array<Schedule> = [];
  myIns = [];
  myStatus = "";
  token = this._authService.decode();
  value = this.token.subject;
  isHidden = true;

  constructor( private ngZone: NgZone,
    private router: Router,public dialog: MatDialog, private actRoute: ActivatedRoute,  private courseApi: CourseService, private userApi: UserService, private _authService: AuthService, private schedApi: ScheduleService) {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');
    
 // GETS THE COURSE DETAILS
  this.courseApi.GetCourse(this.course_id).subscribe(data => {
  this.course.details = data.details;
  this.course.instructors = data.instructors;
  let tempArr: Array<String> = [];
    for(let y in data.instructors){
      userApi.GetUser(data.instructors[y]).subscribe(data1 => {
        tempArr.push(data1.firstname + " " + data1.lastname)
        this.myIns = tempArr;
      })
    } 
    this.myStatus = "Not Enrolled";
        userApi.GetUser(this.value).subscribe(data2 => {
            for(let z in data2.courses){
              if(data._id == data2.courses[z].course){
                this.myStatus = "Enrolled";
                this.isHidden = false;
              }
            }
    })
  this.course.schedule = data.schedule[0]._id;
  for(let y in data.schedule){
    schedApi.GetSchedule(data.schedule[y]._id).subscribe(data3 => {
      this.sched.push(data3);
    });
  }
  this.course.name = data.name;
  // not used
  this.course.session_membership = data.session_membership;
  this.sessCost = data.session_membership.cost;
  this.numberSess = data.session_membership.number_of_sessions;
  this.studCount = data.members.length;
  this.course.subscription_membership = data.subscription_membership;
  this.subCost = data.subscription_membership.cost;
  this.course.max_students = data.max_students;
  console.log(data);
  });
  }
  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewEnrollMember, {
      maxWidth: '550px',
      maxHeight:'700px',
      width: '80%',
      data: {course_id: this.course_id, subscription_membership: this.course.subscription_membership, session_membership: this.course.session_membership},
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  removeStudent(){
    
    if(window.confirm('Are you sure you want to unenroll from this course?')){
      this.courseApi.RemoveStudent(this.course_id, {'member_id':this.value}).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/member/courses'))
        })
    }
  }

}


@Component({
  selector: 'dialog-enrollMember-dialog',
  templateUrl: 'dialog-enrollMember.html',
  styleUrls: ['./course-description.component.css']
})
export class DialogOverviewEnrollMember {
  token = this._authService.decode();
  value = this.token.subject;
  error = false;

  courseForm: FormGroup;
  course_id: any;
  member_id: any;
  memberships: any = [];
  subscription_membership: any;
  session_membership: any;
  membership_selected: null;
  course = new Course();
  sched : Array<Schedule> = [];
  myIns = [];
  myStatus = "";
  studCount: any;


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewEnrollMember>, 
    public fb: FormBuilder, private userApi: UserService, 
    private _authService: AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any,
    private courseApi: CourseService,
    private ngZone: NgZone,
    private router: Router,
    private schedApi: ScheduleService){

      this.course_id = this.recievedData.course_id;
      this.member_id = this.recievedData.member_id;
      this.subscription_membership = this.recievedData.subscription_membership;
      this.session_membership = this.recievedData.session_membership;


      this.courseApi.GetCourse(this.course_id).subscribe(data => {
        this.course.details = data.details;
        this.course.instructors = data.instructors;
        let tempArr: Array<String> = [];
          for(let y in data.instructors){
            userApi.GetUser(data.instructors[y]).subscribe(data1 => {
              tempArr.push(data1.firstname + " " + data1.lastname)
              this.myIns = tempArr;
            })
          } 
          this.myStatus = "Not Enrolled";
              userApi.GetUser(this.value).subscribe(data2 => {
                  for(let z in data2.courses){
                    if(data._id == data2.courses[z].course){
                      this.myStatus = "Enrolled";
                    }
                  }
          })
        this.course.schedule = data.schedule[0]._id;
        for(let y in data.schedule){
          schedApi.GetSchedule(data.schedule[y]._id).subscribe(data3 => {
            this.sched.push(data3);
          });
        }
        this.course.name = data.name;
        
        // used: number of student
        this.course.session_membership = data.session_membership;
        this.course.subscription_membership = data.subscription_membership;
        this.course.max_students = data.max_students;
        this.studCount = data.members.length;

        });
        


 
    this.courseApi.GetCourse(this.course_id).subscribe(data => {
        // ADDS THE MEMBERSHIP TYPE TO ARRAY IF OPTION EXISTS
        if (data.session_membership != null) {
          this.memberships.push({ 'key': 'Session', 'type': data.session_membership._id });
        }
        if (data.subscription_membership != null) {
          this.memberships.push({ 'key': 'Subscription', 'type': data.subscription_membership._id });
        }
        // POPULATES DISPLAY FORM
        this.courseForm = this.fb.group({
          courseName: [{value: data.name, disabled: true}],
          user_membership: ['', Validators.required]  
        });
      });

  
    }
  
  

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  enrollMember() {
    if (this.courseForm.valid) {
      if (window.confirm('Are you sure you want to enroll this member to the course?')) {
        if(this.studCount>=this.course.max_students){
          window.alert('Fail: Course is full!')
        }else{
          this.courseApi.EnrolMember(this.course_id, { 'member_id': this.value, 'membership_id': this.membership_selected }).subscribe(res => {
            this.closeDialog();
            this.ngZone.run(() => this.router.navigateByUrl('/member/courses'))
          });
        }
      }
    }
  }

  



   /* Get errors */
   public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }  


 updateBookForm() {
  this.courseForm = this.fb.group({
    courseName: [''],
    user_membership: ['', Validators.required]  
  });
}
  ngOnInit() {
    this.updateBookForm();
}

}
