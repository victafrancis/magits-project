import { Course } from 'src/app/_services/course/course';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services/user/user.service';
import { MatDialogConfig, MatDialog, MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/_services/session/session.service';
import { Session } from 'src/app/_services/session/session';

@Component({
  selector: 'app-my-course-prof',
  templateUrl: './my-course-prof.component.html',
  styleUrls: ['./my-course-prof.component.css']
})
export class MyCourseProfComponent implements OnInit {
  course_id: any;
  course = new Course();
  instructors = [];
  sessions: any = [];
  courseForSession: any ={};
  sessionDataSource: MatTableDataSource<Session>;
  displayedColumns: string[] = ['date', 'time'];
  show: Boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
    private sessionApi: SessionService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private userApi: UserService,
    private matDialog: MatDialog,
    private location: Location
  )
  {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    // GETS ALL COURSE INSTRUCTORS
    this.courseApi.GetCourseInstructors(this.course_id).subscribe(data => {
      for (const i in data) {
        this.instructors.push(
          {name: data[i].firstname + " " + data[i].lastname, id: data[i]._id});
      }
    });

    // GETS THE COURSE DETAILS
    this.courseApi.GetCourse(this.course_id).subscribe(data => {
      this.course._id = data._id;
      this.course.details = data.details;
      this.course.instructors = data.instructors;
      this.course.max_students = data.max_students;
      this.course.name = data.name;
      this.course.schedule = data.schedule;
      this.getSessions(this.course);
    });
    
  }

  ngOnInit() {
  }

  showSessions(){
    this.show = true;
  }

  closeSessions(){
    this.show = false;
  }

  openSessionTable(sessionsDataSource: any){
  }

  getSessions(course: any){
    // GETS SESSIONS OF THIS COURSE
    this.sessionApi.GetSessionsByCourse(this.course).subscribe(data =>{
    this.sessions = data;
    this.sessionDataSource = new MatTableDataSource<Session>(this.sessions);
    });
  }

  viewSession(session: any){
    // console.log(session);
    this.router.navigate(['/instructor/sess-info/', session._id]);
  }
}
