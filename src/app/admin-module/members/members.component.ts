import { UserService } from '../../_services/user/user.service';
import { User } from '../../_services/user/user';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['_id', 'firstname', 'lastname', 'Action'];

  constructor(private userApi: UserService, private router: Router, private location: Location) {
    this.userApi.GetMembers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
    });
  }

  ngOnInit() {
  }

  viewInfo(element){
    this.router.navigate(['/admin/member-profile/', element._id])
  }

  // Navigates to the previous page
  backPressed(){
    this.location.back();
  }

  deleteMember(element){
    if(window.confirm('Are you sure you want to delete this member?')){
      this.userApi.DeleteUser(element._id).subscribe();
      window.location.reload();
    }
  }
}
