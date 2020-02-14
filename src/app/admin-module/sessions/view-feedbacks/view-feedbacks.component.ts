import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Feedback } from 'src/app/_services/feedback/feedback';
import { SessionService } from 'src/app/_services/session/session.service';

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})

export class ViewFeedbacksComponent implements OnInit {
  feedbacks: any;

  constructor(
    private dialogRef: MatDialogRef<ViewFeedbacksComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any,
    private sessionApi: SessionService,
  ) 
  {
    this.feedbacks = this.receivedData.session.feedback;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close({event: 'close'});
  }

}
