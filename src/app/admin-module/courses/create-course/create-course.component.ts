import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CourseService } from '../../../_services/course/course.service';
import { Router } from '@angular/router';
import { Schedule } from './schedule';
import { User } from 'src/app/_services/user/user';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})



export class CreateCourseComponent implements OnInit {

  courseForm: FormGroup;
  numDays: any = [1,2,3,4,5,6,7];
  time: any = [1,2,3,4,5,6,7,8,9,10]
  Days: any = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday','Sunday'];
  day_selected: null;
  
  // used for schedule
  totalDays: number=0;
  daysWithDate: Array<Object>;
  arrayLen: number;
  schedule: Array<Schedule>=[]; 

  // used for instructor
  instructors: any=[];
  instructor: null;

  constructor(    
    public fb: FormBuilder,
    private courseApi: CourseService,
    private instructorApi: UserService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      details: ['', [Validators.required]],
      max_students: ['', [Validators.required]],
      subCost:['']
      // numDays: ['', Validators.required]
    })

    this.instructorApi.GetInstructors().subscribe( data =>{
      this.instructors = data;
    })

  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }

  // Creates a course in the database
  submitCourseForm(){
    if(window.confirm('Are you sure you want to add this course?')){
      this.courseApi.AddCourse(this.courseForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('\courses'))
      });
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
  createDays(){
    if(this.totalDays > 0){
      this.schedule = [];
      for(var i = 1;i <= this.totalDays; i++ ){
        this.schedule.push(new Schedule('','',''));
      }
      console.log(this.schedule);
      // console.log(`name here: ${this.schedule[0].day} start: ${this.schedule[0].start} end: ${this.schedule[0].end}`)
    }
  }

  // Sets the values of the Schedule
  setDays(){
    if(this.totalDays > 0){
      for(var i = 1;i <= this.totalDays; i++ ){
        this.schedule[i-1] = new Schedule(this.schedule[i-1].day,this.schedule[i-1].start,this.schedule[i-1].end);

      }
      console.log(this.schedule);
      // console.log(`name here: ${this.schedule[0].day} start: ${this.schedule[0].start} end: ${this.schedule[0].end}`)

    }
  }
}

