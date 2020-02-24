import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Feedback } from 'src/app/_services/feedback/feedback';
import { SessionService } from 'src/app/_services/session/session.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})

export class ViewFeedbacksComponent implements OnInit {
  feedbacks: any;
  dataSource: MatTableDataSource<Feedback>;
  displayedColumns: string[] = ['date', 'sender','content'];

  constructor(
    private dialogRef: MatDialogRef<ViewFeedbacksComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any,
    private sessionApi: SessionService,
    private userApi: UserService
  ) 
  {
    this.sessionApi.ViewSessionFeedback({'session_id': this.receivedData.session._id}).subscribe(data => {
      this.feedbacks = data;
      
      for(var i in this.feedbacks){
        let temp = [];
        this.userApi.GetUser(this.feedbacks[i].member).subscribe(data => {
          this.feedbacks[i].member = (`${data.firstname} ${data.lastname}`);
        });
      }
      this.dataSource = new MatTableDataSource<Feedback>(this.feedbacks);
    })
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close({event: 'close'});
  }

}
