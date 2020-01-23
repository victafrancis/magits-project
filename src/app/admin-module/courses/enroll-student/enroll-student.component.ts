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
    dialogConfig.height = "30%";
    dialogConfig.width = "40%";
    dialogConfig.data = {course_id: this.course_id, student_id: element._id};
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


  // ENROLLS A MEMBER TO A COURSE
  enrollStudent(element) {

    // element.courses.push(this.course_id)

    // if (window.confirm('Are you sure you want to add this member to the course?')) {
    //   // UPDATES MEMBER INFO
    //   this.userApi.UpdateUser(element._id, element).subscribe();

    //   // ADDS THE USER ID TO THE COURSE'S MEMBERS ARRAY
    //   this.Course.members.push(element._id);
    //   this.courseApi.UpdateCourse(this.course_id, this.Course).subscribe(res => {
    //     this.ngZone.run(() => this.router.navigateByUrl('/admin/courses'))
    //   });
    // }
  }
}
