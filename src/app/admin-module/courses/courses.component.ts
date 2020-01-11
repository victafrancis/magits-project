import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Course } from 'src/app/_services/course';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  CourseData: any = [];
  dataSource: MatTableDataSource<Course>;
  displayedColumns: string[] = ['name', 'details', 'members','action'];

  constructor(private userApi: CourseService) { 
    this.userApi.GetCourses().subscribe(data => {
      this.CourseData = data;
      this.dataSource = new MatTableDataSource<Course>(this.CourseData);
    })
  }

  ngOnInit() {
  }

}
