import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatTableDataSource } from '@angular/material';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services/user/user.service';
import { User } from '../../../_services/user/user';

@Component({
  selector: 'app-assign-instructor',
  templateUrl: './assign-instructor.component.html',
  styleUrls: ['./assign-instructor.component.css']
})
export class AssignInstructorComponent implements OnInit {
  course_id: any;
  AssignInstructorForm: FormGroup;
  instructors: any;
  course_instructors: any;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'action'];
  assign:boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AssignInstructorComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any,
    private courseApi: CourseService,
    private userApi: UserService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {

    this.course_id = this.receivedData.course_id;

    // Gets all the instructors
    this.userApi.GetInstructorsNotInCourse(this.course_id).subscribe(data => {
      this.instructors = data;
    });

    this.courseApi.GetCourseInstructors(this.course_id).subscribe(data => {
      this.course_instructors = data;
      this.dataSource = new MatTableDataSource<User>(this.course_instructors);
    })
  }

  ngOnInit() {
    this.AssignInstructorForm = this.fb.group({
      instructor: ['', Validators.required]
    })
  }

  assignInstructor() {
    if(this.AssignInstructorForm.valid){
      if (window.confirm('Are you sure you want to assign this instructor to this course?')) {
        this.courseApi.AssignInstructor(this.course_id, { 'instructor_id': this.AssignInstructorForm.value.instructor }).subscribe();
        this.closeDialog();
        window.location.reload();
      }
    }
  }

  // Remove Instructor
  removeInstructor(element) {
    if(window.confirm('Are you sure you want to remove this instructor from this course?')){
      this.courseApi.RemoveInstructor(this.course_id, {'instructor_id': element._id}).subscribe();
      this.closeDialog();
      window.location.reload();
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.AssignInstructorForm.controls[controlName].hasError(errorName);
  }

  // closes the modal
  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
