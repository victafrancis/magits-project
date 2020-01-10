import { Component, OnInit } from '@angular/core';

// SAMPLE DATA
export interface Instructor{
  name: String;
}
const instructors: Instructor[] = [
  {name: 'Kuroko Tetsuya'},
  {name: 'Midoriya Izuku'},
  {name: 'Manny Preston'}
]
// END OF SAMPLE DATA

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  displayedColumns: string[] = ['InstructorName'];
  dataSource = instructors;

  constructor() { }

  ngOnInit() {
  }

}
