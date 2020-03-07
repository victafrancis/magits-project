import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/_services/session/session.service';
import { Session } from '../../../_services/session/session';
import { MatTableDataSource, MatDialog, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';
import { CourseService } from 'src/app/_services/course/course.service';
import { ViewFeedbacksComponent } from '../view-feedbacks/view-feedbacks.component';

@Component({
  selector: 'app-course-sessions',
  templateUrl: './course-sessions.component.html',
  styleUrls: ['./course-sessions.component.css']
})
export class CourseSessionsComponent implements OnInit {
  dataSource: MatTableDataSource<Session>;
  displayedColumns: string[] = ['id', 'date', 'start', 'end', 'attendees'];
  course_id: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private actRoute: ActivatedRoute,
    private location: Location,
    private sessionApi: SessionService,
    private courseApi: CourseService,
    private matDialog: MatDialog
  ) {
    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    this.courseApi.GetCourse(this.course_id).subscribe(course => {
      this.sessionApi.GetSessionsByCourse(course).subscribe(sessions => {
        this.dataSource = new MatTableDataSource<Session>(sessions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    });
  }

  ngOnInit() {
  }

  backPressed() {
    this.location.back();
  }

  openViewFeedbackModal(element) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.id = "view-feedbacks-component";
    dialogConfig.height = "80%";
    dialogConfig.width = "45%";
    dialogConfig.data = { session: element};
    const modalDialog = this.matDialog.open(ViewFeedbacksComponent, dialogConfig);
  }
}
