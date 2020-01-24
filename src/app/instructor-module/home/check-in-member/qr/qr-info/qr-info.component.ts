import { Component, VERSION, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-qr-info',
  templateUrl: './qr-info.component.html',
  styleUrls: ['./qr-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class QrInfoComponent{

  ngVersion = VERSION.full;

  @Input()
  hasDevices: boolean;

  @Input()
  hasPermission: boolean;

  stateToEmoji(state: boolean): string {

    const states = {
      // not checked
      undefined: '❔',
      // failed to check
      null: '⭕',
      // success
      true: '✔',
      // can't touch that
      false: '❌'
    };

    return states['' + state];
  }
}
