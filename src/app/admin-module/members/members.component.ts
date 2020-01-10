import { Component, OnInit } from '@angular/core';

// SAMPLE DATA
export interface Member{
  id: String;
  firstname: String;
  lastname: String;
}
const members: Member[] = [
  {id: "1", firstname: 'Eleanor', lastname: 'Rigby'},
  {id: "2", firstname: 'Aldrin', lastname: 'Jacildo'},
  {id: "3", firstname: 'Francis', lastname: 'Victa'},
  {id: "4", firstname: 'Sir Angel', lastname: 'Naguit'},
  {id: "5", firstname: 'The', lastname: 'Other'}
]
// END OF SAMPLE DATA

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  displayedColumns: string[] = ['MemberID', 'FirstName', 'LastName'];
  dataSource = members;

  constructor() { }

  ngOnInit() {
  }

}
