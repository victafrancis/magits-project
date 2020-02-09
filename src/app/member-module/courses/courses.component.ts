import { Component, OnInit, Inject } from '@angular/core';
import { Course } from '../../_services/course/course';
import { MatTableDataSource } from '@angular/material';
import { CourseService } from '../../_services/course/course.service';
import { UserService } from '../../_services/user/user.service';
import { delay } from 'rxjs/operators';


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
 
  UserData: any = [];
  dataSource: MatTableDataSource<Courses>;
  displayedColumns: string[] = ['name', 'instructors', 'status'] ;

  constructor(private courseApi: CourseService, private userApi: UserService) {
    this.courseApi.GetCourses().pipe(delay(500)).subscribe(data => {
      for(let x in data){
        let DataList: any = {};
        let tempArr: Array<String> = [];
        DataList.instructors = [];
          for(let y in data[x].instructors){
          userApi.GetUser(data[x].instructors[y]).pipe(delay(1500)).subscribe(data1 => {
            if(y == '0'){
              DataList.instructors += data1.firstname + " " + data1.lastname;
            }else{
              DataList.instructors += ", " + data1.firstname + " " + data1.lastname;
            }            
          })
        }

        DataList.name = data[x].name;
        //console.log(DataList.name);
        //console.log(DataList)
        this.UserData.push(DataList);
        this.dataSource = new MatTableDataSource<Courses>(this.UserData);
      }
    });
  }



  ngOnInit() {
  }

}

