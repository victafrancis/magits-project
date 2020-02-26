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
displayedColumnsMembership: string[] = ['name', 'membership_type','session_remaining'];

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
          this.myNumberQRVersion = 7;
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
  let Datalist: any = {};
    // this.userApi.GetUser(this.value).subscribe(data => {
    //     for(let x in data.courses){
    //       courseApi.GetCourse(data.courses[x].course).subscribe(data1 => {
    //       Datalist.name = data1.name;
    //       this.UserData.push(Datalist);
    //       this.dataSourceMembership = new MatTableDataSource<Course>(this.UserData);
    //       });
    //     }
    // });

    
    this.userApi.GetMemberCourseDetails({'subject': this.value}).subscribe(data => {
      //Datalist.name = data.course.name;
      //console.log(data[0]);
      for(let x in data){
        console.log(data[x]);
        Datalist.name = data[x].course.name;
        Datalist.mType = data[x].membership.membership_type;
        Datalist.sess = data[x].sessions_remaining;
        if(Datalist.sess == undefined){
          Datalist.sess = 'monthly';
        }
        //console.log(data[x].course.name);
        this.UserData.push(Datalist);
        this.dataSourceMembership = new MatTableDataSource<Course>(this.UserData);

      }
    })

    

    this.announcementApi.GetAnnouncements().subscribe(data => {
      this.UserDataAnnouncement = data;
      this.dataSourceAnnouncement = new MatTableDataSource<Announcement>(this.UserDataAnnouncement);
      //console.log(this.UserDataAnnouncement);
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
