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

  //LOADING
  isLoading: boolean = false;
  noMembers: boolean = false; 

  constructor(private userApi: UserService) {
    this.isLoading = true;
    this.userApi.GetMembers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      if(this.UserData.length > 0){
        this.isLoading = false;
      }else if(this.UserData.length == 0){
        this.isLoading = false;
        this.noMembers = true;
      }
    });
  }

  ngOnInit() {
  }

 
}
