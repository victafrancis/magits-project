import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Course } from 'src/app/_services/course/course';
import { CourseService } from 'src/app/_services/course/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  user: any;
  CourseData: any;
  dataSource: MatTableDataSource<Course>;
  displayedColumns: string[] = ['name', 'details', 'members','action'];

  constructor(private courseApi: CourseService) { 
    this.courseApi.GetCourses().subscribe(data => {
      this.CourseData = data;
      this.dataSource = new MatTableDataSource<Course>(this.CourseData);
    })
  }

  ngOnInit() {
  }

  deleteCourse(element){
    if(window.confirm('Are you sure you want to delete this course?')){
      this.courseApi.DeleteCourse(element._id).subscribe();
      window.location.reload();
    }
  }
}
