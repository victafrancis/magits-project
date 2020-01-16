import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CourseService } from '../../../_services/course/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})



export class CreateCourseComponent implements OnInit {

  courseForm: FormGroup;
  numDays: any = [1,2,3,4,5,6,7];
  Days: any = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday','Sunday'];
  day_selected: null;
  
  totalDays: number=0;
  day: null;
  daysWithDate: Array<Object>;
  arrayLen: number;


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
      subCost:['']
      // numDays: ['', Validators.required]
    })

    // this.scheduleForm= this.fb.group({

    // })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }

  submitCourseForm(){
    if(window.confirm('Are you sure you want to add this course?')){
      this.courseApi.AddCourse(this.courseForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('\courses'))
      });
    }
  }

  lastAction: string;
  data = [
    { label: 'Subscription', checked: false },
    { label: 'Session-based', checked: false },
    ];

  onChange(event, index, item) {
      item.checked = !item.checked;
      this.lastAction = 'index: ' + index + ', label: ' + item.label + ', checked: ' + item.checked;
      console.log(index, event, item);

  }

  // pushDays(){

  //   let dateName: any;

  //   if(this.totalDays > 0){

  //     for(var i =0;i <= this.totalDays; i++ ){
  //       dateName = {'label':'i'};
  //       this.arrayLen =this.daysWithDate.push(dateName);
  //       console.log(this.arrayLen);
  //     }
  //   }
  // }
}

