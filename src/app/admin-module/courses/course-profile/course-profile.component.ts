import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services/user/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';

@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.css']
})
export class CourseProfileComponent implements OnInit {
  course_id: any;
  courseForm: FormGroup;
  users: any=[];
  selected: null;

  constructor(
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private userApi: UserService,
    private matDialog: MatDialog,
    private location: Location
  )
  {
    
    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    // GETS THE COURSE DETAILS
    this.courseApi.GetCourse(this.course_id).subscribe(data => {
      this.courseForm = this.fb.group({
        name: [data.name, [Validators.required]],
        details: [data.details, [Validators.required]],
        max_students:[data.max_students, [Validators.required]]
      })
    })

    // GETS ALL MEMBERS NOT IN THE COURSE
    this.userApi.GetMembers().subscribe( data =>{
      this.users = data;
    })
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
        name: ['', [Validators.required]],
        details: ['', [Validators.required]],
        max_students:['',[Validators.required]]
    });
  }

  updateCourseForm(){
    if(window.confirm('Are you sure you want to update?')){
      this.courseApi.UpdateCourse(this.course_id, this.courseForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin/courses'))
      })
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }

  openEditScheduleModal(){
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.id = "edit-schedule-component";
    dialogConfig.height = "35%";
    dialogConfig.width = "40%";
    dialogConfig.data = {course_id: this.course_id};
    const modalDialog = this.matDialog.open(EditScheduleComponent, dialogConfig);
  }
  
}
