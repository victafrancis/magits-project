import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Course } from 'src/app/_services/course';
import { CourseService } from 'src/app/_services/course.service';

// SAMPLE DATA
export interface Element {
  courseName: string;
  instructorName: string;
}

// const ELEMENT_DATA: Element[] = [
//   {courseName: 'Karate I', instructorName: 'Kuroko Tetsuya'},
//   {courseName: 'Karate II', instructorName: 'Kuroko Tetsuya'},
//   {courseName: 'Taekwondo I',  instructorName: 'Manny Preston'},
//   {courseName: 'Taekwondo II',  instructorName: 'Manny Preston'},
//   {courseName: 'Judo I', instructorName: 'Midoriya Izuku'},
//   {courseName: 'Judo II', instructorName: 'Midoriya Izuku'}

// ];
// END OF SAMPLE DATA

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  CourseData: any =[];
  dataSource: MatTableDataSource<Course>;
  course: string;

  @ViewChild(MatPaginator, {static:true}) paginator:MatPaginator;
 
  // displayedColumns: string[] = ['courseName', 'instructorName'];
  displayedColumns: string[] = ['name', 'details'];

  constructor(private _courseApi: CourseService) {
    
      this._courseApi.GetCourses().subscribe(data => {
        this.CourseData = data;
        this.dataSource = new MatTableDataSource<Course>(this.CourseData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      })
      
     }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
