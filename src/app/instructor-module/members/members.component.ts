import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  //LOADING
  isLoading: boolean = false;
  noMembers: boolean = false; 

  constructor(private userApi: UserService) {
    this.isLoading = true;
    this.userApi.GetMembers().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      this.dataSource.paginator = this.paginator;

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
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
 
}
