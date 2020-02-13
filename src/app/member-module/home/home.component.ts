import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { map, filter, mergeMap } from "rxjs/operators";
import { MediaChange, MediaObserver  } from '@angular/flex-layout';
import { UserService } from '../../_services/user/user.service';
import { User } from '../../_services/user/user';
import { CourseService } from '../../_services/course/course.service';
import { Course } from '../../_services/course/course';
import { MatTableDataSource } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
//QR Code
token = this._authService.decode();
value = this.token.subject;
myNumberQRVersion = 9;

//data
UserData: any = [];
dataSourceMembership: MatTableDataSource<Course>;
displayedColumnsMembership: string[] = ['name'];

UserDataAnnouncement: any = [];
dataSourceAnnouncement: MatTableDataSource<Announcement>;
displayedColumnsAnnouncement: string[] = ['date','from','subject'];

// this is for flex grid, please no touch
  watcher: Subscription;
  columns: number = 4;

  constructor( public datePipe: DatePipe, private _authService: AuthService, media: MediaObserver, private userApi: UserService, private courseApi: CourseService, private announcementApi: AnnouncementService) {
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change) {
        if (change.mqAlias == 'xs') {
          this.columns = 1;
          this.myNumberQRVersion = 4;
        } else if( change.mqAlias == 'sm'){
          this.myNumberQRVersion = 8;
        } else if( change.mqAlias == 'md'){
          this.myNumberQRVersion = 9;
        } else {
          this.columns = 2;
          this.myNumberQRVersion = 11;
        }
      }
    });
  
    this.userApi.GetUser(this.value).subscribe(data => {
      
      if(data.courses.length > 1){
        for(let x in data.courses){
          courseApi.GetCourse(data.courses[x].course).subscribe(data1 => {
          this.UserData.push(data1.name);
          this.dataSourceMembership = new MatTableDataSource<Course>(this.UserData);
          });
        }
      }else{
         courseApi.GetCourse(data.courses[0].course).subscribe(data1 => {
          this.dataSourceMembership = new MatTableDataSource<Course>(this.UserData);
        })
      }
    });

    this.announcementApi.GetAnnouncements().subscribe(data => {
      this.UserDataAnnouncement = data;
      this.dataSourceAnnouncement = new MatTableDataSource<Announcement>(this.UserDataAnnouncement);
    });

   }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
  //// this is for flex grid, please no touch



  ngOnInit() {
  }



  // call to logout event
  logout() {
    this._authService.logout();
  }
}
