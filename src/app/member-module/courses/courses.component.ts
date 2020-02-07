import { Component, OnInit, Inject } from '@angular/core';
import { Course } from '../../_services/course/course';
import { MatTableDataSource } from '@angular/material';
import { CourseService } from '../../_services/course/course.service';
import { UserService } from '../../_services/user/user.service';


export interface Courses {
  name: string;
  instructors: string;
  status: string;
}

const ELEMENT_DATA: Courses[] = [
  {name: 'Taekwondo I', instructors: 'Manny Preston', status: 'Enrolled'},
  {name: 'Judo II' , instructors: 'Midoriya Izuku', status: 'Enrolled'},
  {name: 'Tekken' , instructors: 'Kuroko Tetsuya', status: 'Not Enrolled'},
  {name: 'Street Brawl' , instructors: 'Ken Masters', status: 'Enrolled'},
];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  DataList: any = {};
  UserData: any = [];
  dataSource: MatTableDataSource<Courses>;
  displayedColumns: string[] = ['name', 'instructors', 'status'] ;

  constructor(private courseApi: CourseService, private userApi: UserService) {
    this.courseApi.GetCourses().subscribe(data => {
      //userApi.GetUser(data['instructors']).subscribe(data1 => {
        //this.UserData.push(data1);
      //});
     
      //this.DataList.name = data;
      this.UserData = data;
      //console.log(this.UserData);
      this.dataSource = new MatTableDataSource<Courses>(this.UserData);
    });
  }



  ngOnInit() {
  }

}

