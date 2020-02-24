import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { FeedbackService } from 'src/app/_services/feedback/feedback.service';

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
    private feedbackApi: FeedbackService
  ) 
  {
    console.log(this.receivedData);
    this.feedbackApi.GetFeedback(this.receivedData._id).subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close({event: 'close'});
  }

}
