import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/_services/session/session.service';
import { Session } from '../../../_services/session/session';
import { MatTableDataSource } from '@angular/material';
import { CourseService } from 'src/app/_services/course/course.service';

@Component({
  selector: 'app-course-sessions',
  templateUrl: './course-sessions.component.html',
  styleUrls: ['./course-sessions.component.css']
})
export class CourseSessionsComponent implements OnInit {
  dataSource: MatTableDataSource<Session>;
  displayedColumns: string[] = ['id', 'date', 'start', 'end', 'attendees'];
  course_id: any;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private datePipe: DatePipe,
    private location: Location,
    private sessionApi: SessionService,
    private courseApi: CourseService
  ) 
  {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    this.courseApi.GetCourse(this.course_id).subscribe(course => {
      this.sessionApi.GetSessionsByCourse(course).subscribe(sessions => {
        this.dataSource = new MatTableDataSource<Session>(sessions);
      })
    });
  }

  ngOnInit() {
  }

  backPressed(){
    this.location.back();
  }
}
