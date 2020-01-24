import { Component, OnInit, Inject } from '@angular/core';
import { formatsAvailable, formatNames } from '../barcode-formats';
import { BarcodeFormat } from '@zxing/library';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectionListChange } from '@angular/material';

@Component({
  selector: 'app-formats-dialog',
  templateUrl: './formats-dialog.component.html',
  styleUrls: ['./formats-dialog.component.css']
})
export class FormatsDialogComponent{
  formatsAvailable = formatsAvailable;

  formatsEnabled: BarcodeFormat[];

  readonly formatNames = formatNames;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<FormatsDialogComponent>,
  ) {
    this.formatsEnabled = data.formatsEnabled || [];
   }

   close() {
    this._dialogRef.close(this.formatsEnabled);
  }

  isEnabled(format: BarcodeFormat) {
    return this.formatsEnabled.find(x => x === format);
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.formatsEnabled = event.source.selectedOptions.selected.map(selected => selected.value);
  }
}
