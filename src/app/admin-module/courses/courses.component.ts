import { Component, OnInit } from '@angular/core';

// SAMPLE DATA
export interface Element {
  courseName: string;
  instructorName: string;
}

const ELEMENT_DATA: Element[] = [
  {courseName: 'Karate I', instructorName: 'Kuroko Tetsuya'},
  {courseName: 'Karate II', instructorName: 'Kuroko Tetsuya'},
  {courseName: 'Taekwondo I',  instructorName: 'Manny Preston'},
  {courseName: 'Taekwondo II',  instructorName: 'Manny Preston'},
  {courseName: 'Judo I', instructorName: 'Midoriya Izuku'},
  {courseName: 'Judo II', instructorName: 'Midoriya Izuku'}

];
// END OF SAMPLE DATA

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  displayedColumns: string[] = ['courseName', 'instructorName'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
