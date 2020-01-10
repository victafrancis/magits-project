import { Component, OnInit } from '@angular/core';

// SAMPLE DATA
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
// END OF SAMPLE DATA

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  displayedColumns: string[] = ['courseName', 'instructorName'];
  dataSource = courses;

  constructor() { }

  ngOnInit() {
  }

}
