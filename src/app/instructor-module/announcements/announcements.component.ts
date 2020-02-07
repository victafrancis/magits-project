import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  Announcements: any = [];
  displayedColumns: string[] = ['date', 'subject', 'content', 'action'];
  dataSource: MatTableDataSource<Announcement>;

  constructor(private announcementApi: AnnouncementService) {
    this.announcementApi.GetAnnouncements().subscribe(data => {
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
