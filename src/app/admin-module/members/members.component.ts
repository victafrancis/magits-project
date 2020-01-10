import { ApiService } from '../../_services/user.service';
import { User } from '../../_services/user';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['_id', 'firstname', 'lastname'];

  constructor(private userApi: ApiService) { 
    this.userApi.GetUsers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
    })
  }

  ngOnInit() {
  }

}
