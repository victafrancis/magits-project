import { Component, OnInit, Optional, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Feedback } from 'src/app/_services/feedback/feedback';
import { SessionService } from 'src/app/_services/session/session.service';
import { UserService } from 'src/app/_services/user/user.service';
import { User } from 'src/app/_services/user/user';

@Component({
  selector: 'app-view-feedbacks',
  templateUrl: './view-feedbacks.component.html',
  styleUrls: ['./view-feedbacks.component.css']
})

export class ViewFeedbacksComponent implements OnInit {
  feedbacks: any;
  attendees: any;

  dataSourceFeedbacks: MatTableDataSource<Feedback>;
  dataSourceAttendees: MatTableDataSource<User>;

  displayedColumns: string[] = ['date', 'sender','content'];
  displayedColumnsAttendees: string[] = ['name', 'time'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialogRef: MatDialogRef<ViewFeedbacksComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private receivedData: any,
    private sessionApi: SessionService,
    private userApi: UserService
  ) 
  {
    this.sessionApi.ViewSessionFeedback({'session_id': this.receivedData.session._id}).subscribe(data => {
      for (const i in data) {
        this.userApi.GetUser(data[i].member).subscribe(member => {
          data[i].member = member.firstname + " " + member.lastname;
        })
      } 
      this.feedbacks = data;
      this.dataSourceFeedbacks = new MatTableDataSource<Feedback>(this.feedbacks);
      this.dataSourceFeedbacks.paginator = this.paginator;
      this.dataSourceFeedbacks.sort = this.sort;
    });


    this.sessionApi.ViewSessionAttendance(this.receivedData.session._id).subscribe(data => {
      this.attendees = data;
      this.dataSourceAttendees = new MatTableDataSource<any>(this.attendees);
      this.dataSourceAttendees.paginator = this.paginator;
      this.dataSourceAttendees.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close({event: 'close'});
  }

}
