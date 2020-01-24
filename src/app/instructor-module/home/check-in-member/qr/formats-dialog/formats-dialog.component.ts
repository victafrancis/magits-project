import { Component, OnInit } from '@angular/core';
import { formatsAvailable, formatNames } from '../barcode-formats';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-formats-dialog',
  templateUrl: './formats-dialog.component.html',
  styleUrls: ['./formats-dialog.component.css']
})
export class FormatsDialogComponent implements OnInit {
  formatsAvailable = formatsAvailable;

  formatsEnabled: BarcodeFormat[];

  readonly formatNames = formatNames;


  constructor() { }

  ngOnInit() {
  }

}
