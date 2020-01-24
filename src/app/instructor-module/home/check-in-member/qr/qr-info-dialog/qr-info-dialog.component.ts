import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-qr-info-dialog',
  templateUrl: './qr-info-dialog.component.html',
  styleUrls: ['./qr-info-dialog.component.css']
})
export class QrInfoDialogComponent {

  hasDevices: boolean;
  hasPermission: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any
  ) {
    this.hasDevices = data.hasDevices;
    this.hasPermission = data.hasPermission;
   }

}
