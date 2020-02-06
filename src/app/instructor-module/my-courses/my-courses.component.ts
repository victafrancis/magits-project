import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserService } from 'src/app/_services/user/user.service';
import { MatTableDataSource } from '@angular/material';
import { Course } from 'src/app/_services/course/course';
import { Schedule } from 'src/app/_services/schedule/schedule';

export interface Element {
  courseName: string;
  instructorName: string;
}

const courses: Element[] = [
  {courseName: 'Karate I', instructorName: 'Kuroko Tetsuya'},
  {courseName: 'Karate II', instructorName: 'Kuroko Tetsuya'},
  {courseName: 'Taekwondo I',  instructorName: 'Manny Preston'},
  {courseName: 'Taekwondo II',  instructorName: 'Manny Preston'},
  {courseName: 'Judo I', instructorName: 'Midoriya Izuku'},
  {courseName: 'Judo II', instructorName: 'Midoriya Izuku'}

];

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  displayedColumns: string[] = ['courseName','days','time'];
  dataSource = courses;
  courseDataSource: MatTableDataSource<Schedule>;
  courses: any=[];
  user: any={};

  constructor(
    private _authService: AuthService,
    private userApi: UserService
    ) {
      this.user = this._authService.decode();
      this.userApi.GetInstructorCourseDetails(this.user).subscribe(data => {

        for (var i= 0 ; i < data.courses.length ; i++ ){
          for( var j = 0; j < data.courses[i].course.schedule.length; j++){
          
              this.courses.push(data.courses[i].course.schedule[j]);
              var totalSched = this.courses.length - 1;
              this.courses[totalSched].courseName = data.courses[i].course.name;
            
          }
          
        }
        console.log(this.courses[0])
        this.courseDataSource = new MatTableDataSource<Schedule>(this.courses);

      });
    }
  
  ngOnInit() {
  }

  //call to logout 
  logout() {
    this._authService.logout();
  }

}
