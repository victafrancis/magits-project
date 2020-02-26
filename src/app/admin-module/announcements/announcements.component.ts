import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from '../../_services/announcement/announcement.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { Announcement } from '../../_services/announcement';
import { ViewAnnouncementComponent } from '../announcements/view-announcement/view-announcement.component';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent implements OnInit {
  Announcements: any = [];
  displayedColumns: string[] = ['date', 'subject', 'content', 'action'];
  dataSource: MatTableDataSource<Announcement>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private announcementApi: AnnouncementService,
    private matDialog: MatDialog,
  ) {
    this.announcementApi.GetAnnouncements().subscribe(data => {
      this.Announcements = data;
      this.dataSource = new MatTableDataSource<Announcement>(this.Announcements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  viewAnnouncement(element) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.id = "view-announcement-component";
    dialogConfig.height = "40%";
    dialogConfig.width = "35%";
    dialogConfig.data = { announcement: element };
    const modalDialog = this.matDialog.open(ViewAnnouncementComponent, dialogConfig);
  }
}
