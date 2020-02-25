import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { Announcement } from 'src/app/_services/announcement';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/_services/user/user.service';
import { Course } from 'src/app/_services/course/course';
import { Schedule } from 'src/app/_services/schedule/schedule';
import { SessionInfoComponent } from './session-info/session-info.component';
import { SessionService } from 'src/app/_services/session/session.service';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  myDate= new Date();
  currentDate: String;
  currentDay: String='';
  currentTime: String='';
  time:any = null;
  user: any = {};
  sessionDate: String='';
  
  //Session Entry
  sessionEntry: any={};
  sessionInfo: any={};
  

  // Schedule Table
  scheduleColumns: string[] = ['courseName', 'start','status','action'];
  scheduleDatasource:MatTableDataSource<Schedule>;
  courses: Array<Course>= [];
  schedules: Array<Schedule>=[];
  readyStartButton: Array<any>=[]
  currentCourse: String='';
  sessions: any=[];

  // Announcement Table
  Announcements: any = [];
  displayedColumns: string[] = ['date', 'user', 'subject'];
  announcementDataSource: MatTableDataSource<Announcement>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort

  //LOADING
  isLoading: boolean = false;
  noSchedules: boolean = false;
  isLoadingAnnouncements: boolean = true;
  noAnnouncements: boolean = false;  

  constructor(
    private announcementApi: AnnouncementService,
    private _authService: AuthService,
    private datePipe: DatePipe,
    private userApi: UserService,
    private matDialog: MatDialog,
    private sessionApi: SessionService
    ) {
      this.isLoading = true;
      this.currentDate = this.datePipe.transform(this.myDate, 'EEEE, MMMM d, y');
      this.currentDay = this.datePipe.transform(this.myDate,'EEEE');
      this.currentTime = this.datePipe.transform(this.myDate,'H:mm:ss a');

      // FOR CLOCK
      setInterval(() => {
      this.time = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()}, 1);
      this.user = this._authService.decode();
      
      //Schedule Table Subscriber
      this.userApi.GetInstructorCourseDetails(this.user).subscribe(data => {
        for (var i= 0 ; i < data.courses.length ; i++ ){
          for( var j = 0; j < data.courses[i].course.schedule.length; j++){

            if(data.courses[i].course.schedule[j].day === this.currentDay){

              this.schedules.push(data.courses[i].course.schedule[j]);
              var totalSched = this.schedules.length -1;
              this.schedules[totalSched].courseName = data.courses[i].course.name;
              this.schedules[totalSched].status = 'Not Started';
              
              //Check each session status in session collections
              this.getSessions(data.courses[i].course);
            }
          }
        }
        // console.log(this.schedules[i])
        this.scheduleDatasource = new MatTableDataSource<Schedule>(this.schedules)
        if(this.schedules.length > 0){
          this.isLoading = false;
        }else if(this.schedules.length == 0){
          this.isLoading = false;
          this.noSchedules = true;
        }
      });
      //Announcements Table Subscriber
      this.announcementApi.GetAnnouncements().subscribe(data => {
        this.Announcements = data;
        this.announcementDataSource = new MatTableDataSource<Announcement>(this.Announcements);
        if(this.Announcements.length > 0){
          this.isLoadingAnnouncements = false;
        }else if(this.Announcements.length == 0){
          this.isLoadingAnnouncements = false;
          this.noAnnouncements = true;
        }
        this.announcementDataSource.paginator = this.paginator;
        this.announcementDataSource.sort = this.sort;
    });
  }


  ngOnInit() {
    
  }

  startSession(schedule){
    if (window.confirm('Are you sure you want to start this session?')) {
      //Add a session entry to be added when confirmed
      this.sessionEntry.course = schedule.course;
      this.sessionEntry.open = JSON.parse("true");
      this.sessionEntry.date = this.myDate;
      this.sessionEntry.start_time = this.datePipe.transform(this.myDate, 'h:mm a');
      this.sessionEntry.end_time = schedule.end;
      this.sessionEntry.courseName= schedule.courseName;
      console.log(this.sessionEntry.date);

      //todo: set the session open: true to false when the session ends

      // console.log(this.sessionEntry);
      this.sessionApi.AddSession(this.sessionEntry).subscribe( data => this.sessionInfo = data);
      console.log(this.sessionInfo);
      // this.openSessionInfoModal(this.sessionEntry);
      window.location.reload();

    }
  }

  logout() {
    this._authService.logout();
  }

  //opening a Session Modal
  openSessionInfoModal(sess: any){
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.id = "session-info-component";
    dialogConfig.height = "50%";
    dialogConfig.width = "50%";
    dialogConfig.data = {session_info: sess};
    const modalDialog = this.matDialog.open(SessionInfoComponent, dialogConfig);
  }

  //Adds minutes to time
  add_minutes(dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
  }

  getSessions(course: any){
    // console.log("From GetSessions")
    // console.log(course)
    var totalSched = this.schedules.length-1;
    // console.log(totalSched)
    this.sessionApi.GetSessionsByCourse(course).subscribe(sessionsData =>{
      for (var session of sessionsData){
      
        this.sessionDate = this.datePipe.transform(session.date,'EEEE, MMMM d, y')
        
        if(this.currentDate === this.sessionDate){
          if(session.open === true){
            this.schedules[totalSched].status = 'Open';
          }
          if(session.open === false){
            this.schedules[totalSched].status = 'Closed';
          
          }
          
        }
      }

     
   })
  }
  
}
