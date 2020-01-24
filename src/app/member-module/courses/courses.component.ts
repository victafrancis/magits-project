import { Component, OnInit, Inject } from '@angular/core';


export interface Courses {
  courses: string;
  instructor: string;
  status: string;
}

const ELEMENT_DATA: Courses[] = [
  {courses: 'Taekwondo I', instructor: 'Manny Preston', status: 'Enrolled'},
  {courses: 'Judo II' , instructor: 'Midoriya Izuku', status: 'Enrolled'},
  {courses: 'Tekken' , instructor: 'Kuroko Tetsuya', status: 'Not Enrolled'},
  {courses: 'Street Brawl' , instructor: 'Ken Masters', status: 'Enrolled'},
];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['courses', 'instructor', 'status'] ;
  dataSource = ELEMENT_DATA;

  constructor() { }



  ngOnInit() {
  }

}

