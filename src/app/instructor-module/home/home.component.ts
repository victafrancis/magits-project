import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { MatTableDataSource } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/_services/user/user';
import { Identifiers } from '@angular/compiler';
import { UserService } from 'src/app/_services/user/user.service';


export interface Element {
  courseName: string;
  sessionStart: string;
  sessionEnd: string;
  sessionStatus: string;
}

const courses: Element[] = [
  {courseName: 'Karate I', sessionStart: '10:00', sessionEnd: '12:00', sessionStatus: 'done'},
  {courseName: 'Karate II', sessionStart: '1:00', sessionEnd: '2:00', sessionStatus: 'ready'},
  {courseName: 'Taekwondo I',  sessionStart: '3:00', sessionEnd: '5:00', sessionStatus: 'next'}

];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  
  myDate= new Date();
  currentDate: String;
  user: User = null;

  // Session Table
  sessionColumns: string[] = ['courseName', 'sessionStart','sessionStatus','action'];
  coursesDataSource = courses;

  // Announcement Table
  Announcements: any = [];
  displayedColumns: string[] = ['date', 'subject', 'content'];
  announcementDataSource: MatTableDataSource<Announcement>;

  constructor(
    private announcementApi: AnnouncementService,
    private _authService: AuthService,
    private datePipe: DatePipe,
    private userService: UserService
    ) {
      this.currentDate = this.datePipe.transform(this.myDate, 'EEEE, MMMM d, y');
      this.user = this._authService.decode();
      // this.userId = this.userService(this.user.id)
      // console.log(this.user);
      this.announcementApi.GetAnnouncements().subscribe(data => {
      this.Announcements = data;
      this.announcementDataSource = new MatTableDataSource<Announcement>(this.Announcements);
    });
  }

  ngOnInit() {
  }

  startSession(element){
  }

  logout() {
    this._authService.logout();
  }
  deleteAnnouncement(element) {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      this.announcementApi.DeleteAnnouncement(element._id).subscribe();
      window.location.reload();
    }
  }

}
