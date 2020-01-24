import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  value = 'wwww.google.com'
  myNumberQRVersion = 9;
  isDisabled = true;
  isHidden = true;



  watcher: Subscription;
  columns: number = 4;

//

  constructor(private _authService: AuthService, media: MediaObserver) {
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change) {
        if (change.mqAlias == 'xs') {
          this.columns = 1;
          this.myNumberQRVersion = 4;
        } else if( change.mqAlias == 'sm'){
          this.myNumberQRVersion = 8;
        } else if( change.mqAlias == 'md'){
          this.myNumberQRVersion = 10;
        } else {
          this.columns = 2;
          this.myNumberQRVersion = 12;
        }
      }
    });

   }

   enableButton(){
     this.isDisabled = false;
     this.isHidden = false;
   }

   
   disableButton(){
    this.isDisabled = true;
    this.isHidden = true;
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  //
  ngOnInit() {
  }

}
