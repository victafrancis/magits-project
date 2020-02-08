import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  Announcements: any = [];
  displayedColumns: string[] = ['date', 'user', 'content', 'action'];
  dataSource: MatTableDataSource<Announcement>;
  user: any;

  constructor(
    private announcementApi: AnnouncementService,
    private _authService: AuthService
    ) {
    this.announcementApi.GetAnnouncements().subscribe(data => {
      this.user = this._authService.decode();
      this.Announcements = data;
      this.dataSource = new MatTableDataSource<Announcement>(this.Announcements);
      console.log(this.Announcements);
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
