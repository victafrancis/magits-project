import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';

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

  displayedColumns: string[] = ['courseName', 'instructorName'];
  dataSource = courses;


  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  //call to logout 
  logout() {
    this._authService.logout();
  }

}
