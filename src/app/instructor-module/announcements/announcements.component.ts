import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserService } from 'src/app/_services/user/user.service';

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

  //LOADING
  isLoading: boolean = false;
  noAnnouncements: boolean = false;

  constructor(
    private announcementApi: AnnouncementService,
    private _authService: AuthService,
    private userApi: UserService
    ) {
    this.isLoading = true;
    this.announcementApi.GetAnnouncements().subscribe(data => {
      this.user = this._authService.decode();
      
      this.Announcements = data;
      if(this.Announcements.length > 0){
        // this.getSenderName(data)
      }
      this.dataSource = new MatTableDataSource<Announcement>(this.Announcements);
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

  //Stores the name of the User
  // getSenderName(users: any){
  // // console.log(user);
  //   var totalAnnouncements = this.Announcements.length;

  //   for(var element = 0; element < totalAnnouncements; element++){
  //       if(users[element].user == undefined){
  //         this.Announcements[element].user = "admin";
  //       }else{
  //       //   this.userApi.GetUser(users[element]).subscribe(userData =>{
  //       //     // if(userData.role == 'instructor'){
  //       //     //   console.log(userData.firstname);
  //       //     //   this.Announcements[element].user = userData.firstname;
  //       //     // }
  //       // });
  //       }
  //   }
  // }
}
