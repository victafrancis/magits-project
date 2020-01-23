import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Course } from 'src/app/_services/course/course';
import { CourseService } from 'src/app/_services/course/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
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

  deleteCourse(element){
    if(window.confirm('Are you sure you want to delete this course?')){
      this.userApi.DeleteCourse(element._id).subscribe();
      window.location.reload();
    }
  }


}
