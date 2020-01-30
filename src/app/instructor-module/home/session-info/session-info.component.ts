import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css']
})
export class SessionInfoComponent implements OnInit {

  constructor(
      // @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any
  ) {
      // this.course_id = recievedData.course_id;

   }

  ngOnInit() {
  }

}
