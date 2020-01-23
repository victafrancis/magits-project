import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { MatTableDataSource } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';


export interface Element {
  courseName: string;
  instructorName: string;
  sessionStatus: string;
}

const courses: Element[] = [
  {courseName: 'Karate I', instructorName: 'Kuroko Tetsuya', sessionStatus: 'done'},
  {courseName: 'Karate II', instructorName: 'Kuroko Tetsuya', sessionStatus: 'ready'},
  {courseName: 'Taekwondo I',  instructorName: 'Manny Preston', sessionStatus: 'next'}

];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  logout() {
    this._authService.logout();
  }

  // Session Table
  sessionColumns: string[] = ['courseName', 'instructorName','sessionStatus','action'];
  coursesDataSource = courses;

  startSession(element){

  }

  // Announcement Table
  Announcements: any = [];
  displayedColumns: string[] = ['date', 'subject', 'content'];
  announcementDataSource: MatTableDataSource<Announcement>;

  constructor(
    private announcementApi: AnnouncementService,
    private _authService: AuthService
    ) {
    this.announcementApi.GetAnnouncements().subscribe(data => {
      this.Announcements = data;
      this.announcementDataSource = new MatTableDataSource<Announcement>(this.Announcements);
    });
  }

  ngOnInit() {
  }

  deleteAnnouncement(element) {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      this.announcementApi.DeleteAnnouncement(element._id).subscribe();
      window.location.reload();
    }
  }

}
