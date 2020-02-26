import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Location, DatePipe } from '@angular/common';
import { SessionService } from 'src/app/_services/session/session.service';
import { Session } from 'src/app/_services/session/session';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { User } from 'src/app/_services/user/user';

@Component({
  selector: 'app-my-course-prof',
  templateUrl: './my-course-prof.component.html',
  styleUrls: ['./my-course-prof.component.css']
})
export class MyCourseProfComponent implements OnInit {
  // WATCHER
  myNumberQRVersion = 9;
  watcher: Subscription;
  columns: number = 4;

  //MEMBER TABLE
  members: any = [];
  memberDataSource: MatTableDataSource<User>;
  memberDisplayedColumns: string[] = ['name'];
  @ViewChild('memberPaginator', { static: true }) memberPaginator: MatPaginator;


  //SESSION TABLE  
  sessions: any = [];
  sessionDataSource: MatTableDataSource<Session>;
  displayedColumns: string[] = ['date', 'day', 'time', 'attendees', 'feedback'];
  // @ViewChild(MatPaginator, {static: true}) sessionPaginator: MatPaginator;
  @ViewChild('sessionPaginator', { static: true }) sessionPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort

  course_id: any;
  course: any = {};
  instructors = [];
  courseForSession: any = {};

  //LOADING
  isLoading: boolean = true;
  noMembers: boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    private courseApi: CourseService,
    private sessionApi: SessionService,
    private router: Router,
    private location: Location,
    media: MediaObserver,
    private datePipe: DatePipe
  ) {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    // GETS ALL COURSE INSTRUCTORS
    this.courseApi.GetCourseInstructors(this.course_id).subscribe(data => {
      for (const i in data) {
        this.instructors.push(
          { name: data[i].firstname + " " + data[i].lastname, id: data[i]._id });
      }
    });

    // GETS THE COURSE DETAILS
    this.courseApi.GetCourse(this.course_id).subscribe(data => {

      for (const i in data.schedule) {
        // start
        var start_hour = data.schedule[i].start.slice(0, 2);
        var start_min = data.schedule[i].start.slice(3);
        var start = new Date();
        start.setHours(start_hour, start_min, 0);
        data.schedule[i].start = this.datePipe.transform(start, "h:mm a");

        // // end
        var end_hour = data.schedule[i].end.slice(0, 2);
        var end_min = data.schedule[i].end.slice(3);
        var end = new Date();
        end.setHours(end_hour, end_min, 0);
        data.schedule[i].end = this.datePipe.transform(end, "h:mm a");
      }

      this.course = data;
      this.getSessions(this.course);
    });

    //GETS MEMBERS OF THIS COURSE
    this.courseApi.GetMembersEnrolled(this.course_id).subscribe(data => {
      this.members = data;
      this.memberDataSource = new MatTableDataSource<User>(this.members);
      if (this.members.length > 0) {
        this.isLoading = false;
      } else if (this.members.length == 0) {
        this.isLoading = false;
        this.noMembers = true;
      }
      this.memberDataSource.paginator = this.memberPaginator;
    });

    //WATCHER
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change) {
        if (change.mqAlias == 'xs') {
          this.columns = 1;
          this.myNumberQRVersion = 4;
        } else if (change.mqAlias == 'sm') {
          this.myNumberQRVersion = 8;
        } else if (change.mqAlias == 'md') {
          this.myNumberQRVersion = 9;
        } else {
          this.columns = 2;
          this.myNumberQRVersion = 11;
        }
      }
    });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  back() {
    this.location.back();
  }

  getSessions(course: any) {
    // GETS SESSIONS OF THIS COURSE
    this.sessionApi.GetSessionsByCourse(this.course).subscribe(data => {
      for (const i in data) {
        data[i].start_time = this.datePipe.transform(data[i].start_time, "h:mm a");
        data[i].end_time = this.datePipe.transform(data[i].end_time, "h:mm a");
      }

      this.sessions = data;
      this.sessionDataSource = new MatTableDataSource<Session>(this.sessions);
      this.sessionDataSource.sort = this.sort;
      this.sessionDataSource.paginator = this.sessionPaginator;
    });
  }

  viewSession(session: any) {
    this.router.navigate(['/instructor/sess-info/', session._id]);
  }

  //Transform end time from string to datetime
  stringToDate(time: any) {
    // console.log(time);
    var newTime = new Date();
    var end_hour = time.slice(0, 2);
    var end_min = time.slice(3);
    newTime.setHours(end_hour, end_min, 0);
    return newTime;
  }
}
