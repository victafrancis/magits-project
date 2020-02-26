import { Component, OnInit , NgZone, ViewChild} from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogModule, MatDialogConfig, MatPaginator } from '@angular/material';
import { User } from 'src/app/_services/user/user';
import { CourseService } from '../../../_services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css']
})
export class EnrollStudentComponent implements OnInit {
  course_id: any;
  Course: any;
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['_id', 'name', 'Action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private courseApi: CourseService,
    private actRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private location: Location
  ) {

    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    // RETRIEVES THE COURSE INFO USING THE ID PASSED
    this.courseApi.GetCourse(this.course_id).subscribe(data => {
      this.Course = data;
    });

    // GETS ALL MEMBERS NOT ENROLLED IN THIS COURSE
    this.courseApi.GetMembersNotEnrolled(this.course_id).subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }

  openModal(element){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "35%";
    dialogConfig.width = "30%";
    dialogConfig.data = {course_id: this.course_id, member_id: element._id};
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  back(){
    this.location.back();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
