import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-announcement-info',
  templateUrl: './announcement-info.component.html',
  styleUrls: ['./announcement-info.component.css']
})
export class AnnouncementInfoComponent implements OnInit {
  announcement: any;
  
  constructor(
    private dialogRef: MatDialogRef<AnnouncementInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any
    
  ) {
    this.announcement = this.receivedData.announcement;
    console.log(this.announcement)
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
