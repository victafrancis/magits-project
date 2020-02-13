import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/_services/user/user';
// import { AuthService } from 'src/app/_services/auth/auth.service';

import { AuthService } from 'src/app/_services/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Course } from 'src/app/_services/course/course';
import { CourseService } from 'src/app/_services/course/course.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
//watcher
  myNumberQRVersion = 9;
  watcher: Subscription;
  columns: number = 4;

//InstructorForm
  instructorForm: FormGroup;
  user: any= null;
  courses: any=[];

  constructor(
    private actRoute: ActivatedRoute,
    private instructorApi: UserService,
    private courseApi: CourseService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private datePipe: DatePipe,
    private _authService: AuthService,
    media: MediaObserver
  ) 
  { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.instructorApi.GetUser(id).subscribe(data => {
      this.getCourses(data.courses);
      this.instructorForm = this.fb.group({
        firstname: [data.firstname, [Validators.required]],
        lastname: [data.lastname, [Validators.required]],
        birthdate: [this.datePipe.transform(data.birthdate, 'yyyy-MM-dd'), [Validators.required]],
        email: [data.email, [Validators.required]],
        courses: [data.courses] 
      });
    });

    
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change) {
        if (change.mqAlias == 'xs') {
          this.columns = 1;
          this.myNumberQRVersion = 4;
        } else if( change.mqAlias == 'sm'){
          this.myNumberQRVersion = 8;
        } else if( change.mqAlias == 'md'){
          this.myNumberQRVersion = 9;
        } else {
          this.columns = 2;
          this.myNumberQRVersion = 11;
        }
      }
    });
  }

  ngOnInit() {
    this.InstructorForm();
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
  InstructorForm(){
    this.instructorForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      courses:['']
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
  
  getCourses(Courses: any){
    for(var el of Courses){
      this.courseApi.GetCourse(el.course).subscribe(data=>{
      this.courses.push(data);
      });
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.instructorForm.controls[controlName].hasError(errorName);
  }
}
