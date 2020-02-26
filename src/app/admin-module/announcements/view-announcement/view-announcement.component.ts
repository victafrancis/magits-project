import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css']
})
export class ViewAnnouncementComponent implements OnInit {
  announcement: any;

  constructor(
    private dialogRef: MatDialogRef<ViewAnnouncementComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any
  ) {
    this.announcement = this.receivedData.announcement;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
