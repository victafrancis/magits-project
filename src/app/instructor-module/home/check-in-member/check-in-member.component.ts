import { Component} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormatsDialogComponent } from './qr/formats-dialog/formats-dialog.component';
import { QrInfoDialogComponent } from './qr/qr-info-dialog/qr-info-dialog.component';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/_services/session/session.service';
import { SessionInfoComponent } from '../session-info/session-info.component';



@Component({
  selector: 'app-check-in-member',
  templateUrl: './check-in-member.component.html',
  styleUrls: ['./check-in-member.component.css']
})
export class CheckInMemberComponent{
// -------------QR SCANNER-------------------------------------------------------------------------------------
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;


  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
// ^---------------------------------------------------------------------------------------

// WATCHER
  watcher: Subscription;
  columns: number = 4;
  myNumberQRVersion = 9;

//CHECK-IN
  member: any = {};
  result: any = {};

  show: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    media: MediaObserver,
    private sessionAPI: SessionService,
    private matDialog: MatDialog
  ) {
    // WATCHER
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

   }


   ngOnInit() {
   
  }

  /* Get errors */
 

  // QR SCANNER--------------------------------------------------------------------------------------------------------------
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.checkInMember(this.qrResultString);
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }


  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(QrInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
// ----------------------------------------------------------------------------------------------------------

//CHECKS IN MEMBER, returns an object that you can display,
checkInMember(memberID: any){
  this.member.subject = memberID;
  this.sessionAPI.CheckInMember(this.member).subscribe(data=>{
    this.result = data;
    if(this.result.message == undefined){
      this.openSessionInfoModal(this.result);
    }
  })
}

openSessionInfoModal(sess: any){
  const dialogConfig = new MatDialogConfig();

  // dialogConfig.disableClose = true;
  dialogConfig.id = "session-info-component";
  dialogConfig.height = "50%";
  dialogConfig.width = "50%";
  dialogConfig.data = {session_info: sess};
  const modalDialog = this.matDialog.open(SessionInfoComponent, dialogConfig);
}

useScanner(){
this.show = true;
}

hideScanner(){
  this.show = false;
  this.hasPermission = false;
}

// -------------------------
  // qrResultString: string;

  // clearResult(): void {
  //   this.qrResultString = null;
  // }

  // onCodeResult(resultString: string) {
  //   this.qrResultString = resultString;
  // }

  
  // todo: turnOffScanner()
 


}
