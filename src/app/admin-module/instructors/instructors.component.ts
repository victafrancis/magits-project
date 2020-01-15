import { UserService } from '../../_services/user/user.service';
import { User } from '../../_services/user/user';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})

export class InstructorsComponent implements OnInit {
  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['ID','Firstname', 'Lastname', 'Action'];

  constructor(private userApi: UserService) {
    this.userApi.GetInstructors().subscribe(data => {
      this.UserData = data;
      this.dataSource = new MatTableDataSource<User>(this.UserData);
    });
  }
  ngOnInit() {
  }

  deleteInstructor(element){
    if(window.confirm('Are you sure you want to delete this instructor?')){
      this.userApi.DeleteUser(element._id).subscribe();
      window.location.reload();
    }
  }

}
