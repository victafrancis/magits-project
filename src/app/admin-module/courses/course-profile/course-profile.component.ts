import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_services/user';

@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.css']
})
export class CourseProfileComponent implements OnInit {
  courseForm: FormGroup;
  users: any=[];

  constructor(
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private userApi: UserService
  ) 
  { 
    var id = this.actRoute.snapshot.paramMap.get('id');

    this.courseApi.GetCourse(id).subscribe(data => {
      this.courseForm = this.fb.group({
        name: [data.name, [Validators.required]],
        details: [data.details, [Validators.required]]
      })
    })

    this.userApi.GetUsers().subscribe( data =>{
      this.users = data;
    })

  }

  ngOnInit() {
  }

  updateMemberForm(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you want to update?')){
      this.courseApi.UpdateCourse(id, this.courseForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('admin/course'))
      })
    }
  }
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.courseForm.controls[controlName].hasError(errorName);
  }
}
