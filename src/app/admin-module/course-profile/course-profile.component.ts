import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { CourseService } from 'src/app/_services/course.service';
import { User } from 'src/app/_services/user';
import { MatTableDataSource, MatChipInputEvent } from '@angular/material';
import { Course } from 'src/app/_services/course';

@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.css']
})
export class CourseProfileComponent implements OnInit {
   
  visible = true;
  selectable = true;
  @ViewChild('resetPlayerForm',{static:false}) myNgForm;
  courseForm: FormGroup;
  public courses = [];
  dataSource: MatTableDataSource<Course>;
  selected = null;
  userObj: Course = null;
  id:any ='temp';
  customer = null;

  ngOnInit() {
    this.updateBookForm();
    this.courseApi.getGames().subscribe(data => {
      this.courses = data;
    });
    
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.courseApi.GetCourse(this.id).subscribe(data => {
      this.userObj = data;
      this.userObj.course = data.course;
      this.courseForm = this.fb.group({     
        status: [data.status],
        customer: ['', [Validators.required]]
      })}
    
    )    
  }

  /* Reactive book form */
  updateBookForm() {
    this.courseForm = this.fb.group({
      status: [''],
      customer: ['', [Validators.required]]
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    if (input) {
      input.value = '';
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  joinGame() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to join the game?')) {
      this.setVal();
      this.courseApi.UpdateCourse(id, this.courseForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/players-list'));        
      });
    }
  }

  setVal() {
     this.courseForm.setValue({status: 'Unavailable', customer: '' });
    }
}
