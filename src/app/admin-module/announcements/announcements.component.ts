import { Component, OnInit } from '@angular/core';

// SAMPLE DATA
export interface Announcement {
  date: String;
  sender: String;
  subject: String;
}
const announcements: Announcement[] = [
  {date: '11/14/2019', sender: 'Manny Preston', subject: 'Taekwondo I: Class Cancellation for Nov. 15, 2019'},
  {date: '11/13/2019', sender: 'Midoriya Izuku', subject: 'Judo: Reminders for Nov. 15, 2019'},
  {date: '11/01/2019', sender: 'Admin', subject: 'New Course Available!!'}
];
// END OF SAMPLE DATA

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
    
  displayedColumns: string[] = ['Date', 'From', 'Subject', 'Action'];
  dataSource = announcements;

  constructor() { }

  ngOnInit() {
  }

}
