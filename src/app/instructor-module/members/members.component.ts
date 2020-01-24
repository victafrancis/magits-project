import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/_services/user/user';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['_id', 'firstname', 'lastname', 'Action'];

  constructor(private userApi: UserService) {
    this.userApi.GetMembers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
    });
  }

  ngOnInit() {
  }

  deleteMember(element){
    if(window.confirm('Are you sure you want to delete this member?')){
      this.userApi.DeleteUser(element._id).subscribe();
      window.location.reload();
    }
  }
}
