import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { User } from 'src/app/_services/user/user';
import { CourseService } from '../../../_services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  course_id: any;
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

    this.courseApi.GetMembersEnrolled(this.course_id).subscribe(data => {
      let users = [];
      this.UserData = data;
      for (const i in this.UserData) {
        users.push(this.UserData[i].member);
      }
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }

  removeStudent(member_id){
    if(window.confirm('Are you sure you want to remove this student from the course?')){
      this.courseApi.RemoveStudent(this.course_id, {member_id}).subscribe(res => {
        window.location.reload();
      })
    }
  }

  cancel() {
    this.location.back();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
