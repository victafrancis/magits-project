import { UserService } from '../../_services/user/user.service';
import { User } from '../../_services/user/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})

export class InstructorsComponent implements OnInit {
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['ID','Firstname', 'Lastname', 'Action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userApi: UserService, private router: Router) {
    this.userApi.GetInstructors().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit() {
  }

  viewInfo(element){
    this.router.navigate(['/admin/instructor-profile/', element._id])
  }

  deleteInstructor(element){
    if(window.confirm('Are you sure you want to delete this instructor?')){
      this.userApi.DeleteUser(element._id).subscribe();
      window.location.reload();
    }
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
