import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.css']
})
export class AddInstructorComponent implements OnInit {
  instructorForm: FormGroup;
  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.submitInstructorForm();
  }

  submitInstructorForm(){
    this.instructorForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.instructorForm.controls[controlName].hasError(errorName);
  }
}
