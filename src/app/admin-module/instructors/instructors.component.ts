import { UserService } from '../../_services/user/user.service';
import { User } from '../../_services/user/user';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})

export class InstructorsComponent implements OnInit {
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['ID','Firstname', 'Lastname', 'Action'];

  constructor(private userApi: UserService, private router: Router, private location: Location) {
    this.userApi.GetInstructors().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
    });
  }
  ngOnInit() {
  }

  viewInfo(element){
    this.router.navigate(['/admin/instructor-profile/', element._id])
  }

  // Navigates to the previous page
  backPressed(){
    this.location.back();
  }

  deleteInstructor(element){
    if(window.confirm('Are you sure you want to delete this instructor?')){
      this.userApi.DeleteUser(element._id).subscribe();
      window.location.reload();
    }
  }

}
