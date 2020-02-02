import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css']
})
export class SessionInfoComponent implements OnInit {

  session_info: any;

  constructor(
      @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any,
      private dialogRef: MatDialogRef<SessionInfoComponent>,
  ) {
      this.session_info = recievedData.session_info;
      console.log("from SessionInfo: "+ this.session_info);
   }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
