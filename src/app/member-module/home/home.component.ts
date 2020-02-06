import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';






export interface PeriodicElement {
  course: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {course: 'Taekwondo I'},
  {course: 'Judo II'},
  {course: 'Tekken'},
  {course: 'Street Brawl'},
];



export interface Announcement {
  date: string;
  from: string;
  subject: string;
}

const ANNOUNCEMENT_DATA: Announcement[] = [
  {date: '01/20/20',from: 'Kamado Tanjiro', subject: 'Class cancellation for 01/21/20. Please do not break all the routines we have built up so far.'},
  {date: '01/20/20',from: 'Midoriya Izkuku', subject: 'Please do not forget umbrella.'},
  {date: '01/20/20',from: 'Midoriya Izkuku', subject: 'Class is not cancelled.'},
  {date: '01/20/20',from: 'Midoriya Izkuku', subject: 'We will have fun!'},

];



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



// this is for flex grid, please no touch
  watcher: Subscription;
  columns: number = 4;

  displayedColumns: string[] = ['course'];
  displayedColumns1: string[] = ['date','from','subject'];

  dataSource = ELEMENT_DATA;
  dataSource1 = ANNOUNCEMENT_DATA;

  constructor(private _authService: AuthService, media: MediaObserver) {
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
