import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SessionService } from 'src/app/_services/session/session.service';
import { Session } from 'inspector';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/_services/user/user';


@Component({
  selector: 'app-sess-info',
  templateUrl: './sess-info.component.html',
  styleUrls: ['./sess-info.component.css']
})
export class SessInfoComponent implements OnInit {
  // 
  myNumberQRVersion = 9;
  watcher: Subscription;
  columns: number = 4;

//SessionInfo
  session_id: any;
  session: any;
  sessionForm: FormGroup;

//AttendeesTable
  members: any=[];
  displayedColumns: string[] = ['name','time'];
  attendeeDataSource: MatTableDataSource<User>;

   constructor(
     public dialog: MatDialog, 
     private _authService: AuthService,
     media: MediaObserver, 
     public fb: FormBuilder, 
     private actRoute: ActivatedRoute, 
     private sessionApi: SessionService
     ) {

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

    this.session_id = this.actRoute.snapshot.paramMap.get('id');
    
    // GET SESSION INFORMATION
    this.sessionApi.GetSession(this.session_id).subscribe(data => {
        this.session = data;
        if(data.members){
          this.getMembersTable(data.members)
        }
        // console.log(this.session)
    });
   }
   

   public handleError = (controlName: string, errorName: string) => {
    return this.sessionForm.controls[controlName].hasError(errorName);
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  ngOnInit() {
  
  }

  //GetMembersInfo
  getMembersTable(membersfromSession:any=[]){
    this.members = membersfromSession;
  }

}
