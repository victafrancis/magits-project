import { Course } from 'src/app/_services/course/course';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from 'src/app/_services/user/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/_services/session/session.service';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  // Announcements: any = [];
  // displayedColumns: string[] = ['date', 'user', 'content', 'action'];
  // dataSource: MatTableDataSource<Announcement>;
  // user: any;

  // constructor(
  //   private actRoute: ActivatedRoute,
  //   private announcementApi: AnnouncementService,
  //   private sessionApi: SessionService,
  //   private _authService: AuthService,
  //   private userApi: UserService,
  //   private ngZone: NgZone,
  //   private router: Router,
  //   ) {
  //   var course = this.actRoute.snapshot.paramMap.get('id');
  //     console.log(course);
  //   this.sessionApi.GetSessionsByCourse(course).subscribe(data => {

  //     this.user = this._authService.decode();
  //     this.Announcements = data;
  //     // console.log(this.Announcements.length);
  //     if(this.Announcements.length > 0){
  //       // this.getSenderName(data)
  //     }
  //     this.dataSource = new MatTableDataSource<Announcement>(this.Announcements);
  //   });
  // }

  // ngOnInit() {
  // }

  // deleteAnnouncement(element) {
  //   if (window.confirm('Are you sure you want to delete this announcement?')) {
  //     this.announcementApi.DeleteAnnouncement(element._id).subscribe();
  //     window.location.reload();
  //   }
  // }

  course_id: any;
  course = new Course();
  instructors = [];

  constructor(
    private actRoute: ActivatedRoute,
    private sessionApi:SessionService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private userApi: UserService,
    private matDialog: MatDialog,
    private location: Location
  )
  {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    // GETS ALL SESSIONS OF THIS COURSE
    this.sessionApi.GetSessionsByCourse(this.course_id).subscribe(data => {
      console.log(data)
    });


  }

  ngOnInit() {
  }

  showSessions(course: any){
    console.log(course);
  }
}
