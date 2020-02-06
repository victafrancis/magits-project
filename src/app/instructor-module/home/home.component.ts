import { Component, OnInit } from '@angular/core';
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
import { Session } from 'src/app/_services/session/session';

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
  displayedColumns: string[] = ['date', 'subject', 'content'];
  announcementDataSource: MatTableDataSource<Announcement>;

  constructor(
    private announcementApi: AnnouncementService,
    private _authService: AuthService,
    private datePipe: DatePipe,
    private userApi: UserService,
    private matDialog: MatDialog,
    private sessionApi: SessionService
    ) {
      this.currentDate = this.datePipe.transform(this.myDate, 'EEEE, MMMM d, y');
      this.currentDay = this.datePipe.transform(this.myDate,'EEEE');
      this.currentTime = this.datePipe.transform(this.myDate,'H:mm:ss a');
      setInterval(() => {
        this.time = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()}, 1);
      this.user = this._authService.decode();
      // subject = user._id in jwt
      // console.log(this.add_minutes(this.myDate,5))
      
      
      //Schedule Table Subscriber
      this.userApi.GetInstructorCourseDetails(this.user).subscribe(data => {

        for (var i= 0 ; i < data.courses.length ; i++ ){
          for( var j = 0; j < data.courses[i].course.schedule.length; j++){

            if(data.courses[i].course.schedule[j].day === this.currentDay){

              // console.log(data.courses[i].course);
             
              this.schedules.push(data.courses[i].course.schedule[j]);
              var totalSched = this.schedules.length - 1;
              this.schedules[totalSched].courseName = data.courses[i].course.name;
              this.schedules[totalSched].status = 'Not Started';

              //testing
              this.sessionApi.GetSessionsByCourse(data.courses[i].course).subscribe(sessionsData =>{

                for (var session of sessionsData){
                  
                  this.sessionDate = this.datePipe.transform(session.date,'EEEE, MMMM d, y')
              
                  if(this.currentDate == this.sessionDate){
                    if(session.open == true){
                      this.schedules[totalSched].status = 'Open'
                    }else{
                      this.schedules[totalSched].status = 'Closed'
                    }
                  }
                  
                }
                
             })

              // todo: start session shows if currentTime > start
              this.readyStartButton.push()
            }
          }
        }
        // console.log(this.schedules)
        this.scheduleDatasource = new MatTableDataSource<Schedule>(this.schedules)

      });

      //Announcements Table Subscriber
      this.announcementApi.GetAnnouncements().subscribe(data => {
        this.Announcements = data;
        this.announcementDataSource = new MatTableDataSource<Announcement>(this.Announcements);
    });
  }


  ngOnInit() {
   
    
  }

  startSession(schedule){
    if (window.confirm('Are you sure you want to start this session?')) {
      
      //Add a session entry to be added when confirmed
      this.sessionEntry.course = schedule.course;
      this.sessionEntry.open = true;
      this.sessionEntry.date = this.datePipe.transform(this.myDate, 'M/d/yy');
      this.sessionEntry.start_time = this.datePipe.transform(this.myDate, 'h:mm a');
      this.sessionEntry.end_time = schedule.end;
      this.sessionEntry.courseName= schedule.courseName;

      //todo: set the session open to true so that when the api reads again, 
        //it will set opened sessions to on-going 

      //todo: set the session open: true to false when the session ends

      // schedule.status = 'On-going';

      // console.log(this.sessionEntry);
      this.sessionApi.AddSession(this.sessionEntry).subscribe( data => this.sessionInfo = data);
      console.log(this.sessionInfo);
      // window.location.reload();
      this.openSessionInfoModal(this.sessionEntry);
    }
  }

  logout() {
    this._authService.logout();
  }


  deleteAnnouncement(element) {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      this.announcementApi.DeleteAnnouncement(element._id).subscribe();
      window.location.reload();
    }
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

  //Lets Start Session Appear
  add_minutes(dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
  }
}
