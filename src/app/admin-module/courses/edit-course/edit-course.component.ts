import { Component, OnInit, NgZone, Optional, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services/user/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  course_id: any;
  courseForm: FormGroup;
  users: any = [];
  selected: null;
  check: boolean;

  constructor(
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<EditCourseComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any
  ) {
    this.course_id = recievedData.course_id;

    // GETS THE COURSE DETAILS
    this.courseApi.GetCourse(this.course_id).subscribe(data => {
      this.check = data.parental_consent;
      this.courseForm = this.fb.group({
        name: [data.name, [Validators.required]],
        details: [data.details, [Validators.required]],
        max_students: [data.max_students, [Validators.required]],
        min_age: [data.min_age],
        max_age: [data.max_age],
        parental_consent: [this.check]
      });
    });

  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      details: ['', [Validators.required]],
      max_students: ['', [Validators.required]],
      min_age: [''],
      max_age: [''],
      parental_consent: ['']
    });
  }
  updateCourseForm() {
    if(this.courseForm.valid){
      console.log(this.courseForm.value);
      if (window.confirm('Are you sure you want to update?')) {
        this.courseApi.UpdateCourse(this.course_id, this.courseForm.value).subscribe(res => {
          this.closeDialog();
          window.location.reload();
        })
      }
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
