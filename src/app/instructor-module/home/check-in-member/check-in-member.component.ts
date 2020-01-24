import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-in-member',
  templateUrl: './check-in-member.component.html',
  styleUrls: ['./check-in-member.component.css']
})
export class CheckInMemberComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  qrResultString: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  // check-inMember()
  // turnOffScanner()
}
