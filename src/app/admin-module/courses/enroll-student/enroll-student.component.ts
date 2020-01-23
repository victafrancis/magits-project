import { Component, OnInit , NgZone} from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/_services/user/user.service';
import { User } from 'src/app/_services/user/user';
import { Course } from '../../../_services/course/course';
import { CourseService } from '../../../_services/course/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

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
  displayedColumns: string[] = ['_id', 'firstname', 'lastname', 'Action'];

  constructor(
    private userApi: UserService,
    private courseApi: CourseService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private matDialog: MatDialog
  ) {

    this.course_id = this.actRoute.snapshot.paramMap.get('id');

    // RETRIEVES THE COURSE INFO USING THE ID PASSED
    this.courseApi.GetCourse(this.course_id).subscribe(data => {
      this.Course = data;
    });

    // GETS ALL MEMBERS
    this.userApi.GetMembers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
    });
  }

  ngOnInit() {
  }

  openModal(element){
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "45%";
    dialogConfig.width = "55%";
    dialogConfig.data = {course_id: this.course_id, member_id: element._id};
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
}
