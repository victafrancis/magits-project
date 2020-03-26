import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { CourseService } from '../../../_services/course/course.service';
import { Router } from '@angular/router';
import { Schedule } from '../../../_services/schedule';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})

export class CreateCourseComponent implements OnInit {
  courseForm: FormGroup;
  numDays: any = [1, 2, 3, 4, 5, 6, 7];
  time = ['00:00','01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
          '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
          '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00',];
  Days: any = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // day_selected: null;
  minimum_age: number = 7;
  maximum_age: number = 80;
  check: boolean = false;

  //final
  finalData: any = {};

  // used for schedule
  totalDays: any = 0;
  daysWithDate: Array<Object>;
  arrayLen: number;
  schedule: Array<Schedule> = [];

  // membership types
  sesCost: null;
  numSessions: null;
  subCost: null;

  constructor(
    public fb: FormBuilder,
    private courseApi: CourseService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      details: ['', [Validators.required]],
      max_students: ['', [Validators.required]],
      min_age: [this.minimum_age],
      max_age: [this.maximum_age],
      parental_consent: [this.check]
    })

    this.totalDays = new FormControl('', [Validators.required])
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }

  public handleDays = (controlName: string, errorName: string) => {
    return this.totalDays.controls[controlName].hasError(errorName);
  }

  // Creates a course in the database
  submitCourseForm() {
    if(this.courseForm.valid){
      if (window.confirm('Are you sure you want to add this course?')) {

        this.finalData.course = this.courseForm.value;
        this.finalData.schedule = this.schedule;
        
        if (this.subCost != undefined || this.subCost != undefined) {
          this.finalData.subscription = { cost: this.subCost }
        }
        if (this.sesCost != undefined && this.numSessions != undefined) {
          this.finalData.session = { cost: this.sesCost, number_of_sessions: this.numSessions };
        }
  
        this.courseApi.AddCourse(this.finalData).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/admin/courses'))
        });
      }
    }

  }

  // test
  lastAction: string;

  // Checkbox data for the membership type
  data = [
    { label: 'Subscription', checked: false },
    { label: 'Session-based', checked: false },
  ];

  // Detects the changes for the membership type
  onChange(event, index, item) {
    item.checked = !item.checked;
    this.lastAction = 'index: ' + index + ', label: ' + item.label + ', checked: ' + item.checked;
    console.log(index, event, item);

  }

  // Creates the array for the schedule
  createDays() {
    if (this.totalDays > 0) {
      this.schedule = [];
      for (var i = 1; i <= this.totalDays; i++) {
        this.schedule.push(new Schedule('', '', ''));
      }
    }
  }

  // Sets the values of the Schedule
  setDays() {
    if (this.totalDays > 0) {
      for (var i = 1; i <= this.totalDays; i++) {
        this.schedule[i - 1] = new Schedule(this.schedule[i - 1].day, this.schedule[i - 1].start, this.schedule[i - 1].end);
      }
    }
  }
}

