import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface Sessions {
  course: string;
  date: string;
  schedule: string;
  sendFeedback: string;
}

const ELEMENT_DATA: Sessions[] = [
  {course: 'Taekwondo I', date: '11/08/2019', schedule: '10:00am-12:00pm' , sendFeedback: 'feedback'},
  {course: 'Taekwondo II', date: '11/09/2019', schedule: '10:00am-12:00pm' , sendFeedback: 'feedback'},
  {course: 'Taekwondo III', date: '11/010/2019', schedule: '10:00am-12:00pm' , sendFeedback: 'feedback'},
  {course: 'Taekwondo IV', date: '11/11/2019', schedule: '10:00am-12:00pm' , sendFeedback: 'feedback'},
];



@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {


  displayedColumns: string[] = ['date', 'course', 'schedule', 'sendFeedback'];
  dataSource = ELEMENT_DATA;


  constructor(public dialog: MatDialog) { }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewSessionFeedback, {
      maxWidth: '350px',
      width: '80%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  

  ngOnInit() {
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-sessionFeedback.html',
  styleUrls: ['./sessions.component.css']
})
export class DialogOverviewSessionFeedback {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewSessionFeedback>){}//,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

