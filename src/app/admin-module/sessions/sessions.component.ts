import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Course } from 'src/app/_services/course/course';
import { CourseService } from 'src/app/_services/course/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})

export class SessionsComponent implements OnInit {
  dataSource: MatTableDataSource<Course>;
  displayedColumns: string[] = ['course', 'instructors'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private courseApi: CourseService, private router: Router) {
    let CourseData = [];
    
    this.courseApi.GetCourses().subscribe(data => {
      for (const i in data) {
        CourseData.push(data[i]);
      }

      // converts the array of instructor id into their actual name
      for (var i = 0; i < CourseData.length; i++) {
        let temp = [];
        this.courseApi.GetCourseInstructors(data[i]._id).subscribe(data => {
          for (const i in data) {
            temp.push(`${data[i].firstname} ${data[i].lastname}`);
          }
        });
        CourseData[i].instructors = temp
      }
      this.dataSource = new MatTableDataSource<Course>(CourseData);
      this.dataSource.paginator = this.paginator;
    });
    
  }

  ngOnInit() {
  }

  viewCourse(element) {
    this.router.navigate(['/admin/course-sessions/', element._id])
  }
}
