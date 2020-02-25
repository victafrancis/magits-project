import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserService } from 'src/app/_services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  Announcements: any = [];
  displayedColumns: string[] = ['date', 'user', 'subject', 'action'];
  dataSource: MatTableDataSource<Announcement>;
  user: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort

  //LOADING
  isLoading: boolean = false;
  noAnnouncements: boolean = false;

  constructor(
    private announcementApi: AnnouncementService,
    private _authService: AuthService,
    private userApi: UserService,
    private router: Router
    ) {
    this.isLoading = true;
    this.announcementApi.GetAnnouncements().subscribe(data => {
      this.user = this._authService.decode();
     
      this.Announcements = data;
      if(this.Announcements.length > 0){
      }
      this.dataSource = new MatTableDataSource<Announcement>(this.Announcements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(this.Announcements[0].user.firstname)
      if(this.Announcements.length > 0){
        this.isLoading = false;
      }else if(this.Announcements.length == 0){
        this.isLoading = false;
        this.noAnnouncements = true;
      }
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

  viewAnnouncement(announcement: any){
    this.router.navigate(['/instructor/announcement-info/', announcement._id]);
  }

}
