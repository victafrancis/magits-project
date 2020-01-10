import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})



export class CreateCourseComponent implements OnInit {

  courseForm: FormGroup;
  Days: any = ['1', '2', '3'];

  constructor(    
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.submitCourseForm();
  }

  submitCourseForm(){
    this.courseForm = this.fb.group({
      course_name: ['', [Validators.required]],
      course_detail: ['', [Validators.required]],
      number_of_days: ['', Validators.required]
    })
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }
}

