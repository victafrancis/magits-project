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
  currentSchedIndex=0;
  
  
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
              this.currentSchedIndex = this.schedules.length -1;

              this.schedules[this.currentSchedIndex].courseName = data.courses[i].course.name;
              // console.log(this.currentSchedIndex);

              //testing
            this.sessionApi.GetSessionsByCourse(data.courses[i].course).subscribe(sessionsData =>{
              
                var counter = this.schedules.length;
                console.log("counter:")
                console.log(counter)
                console.log(sessionsData)
                console.log('---------------');
                console.log('from getSessionByCourse schedules:');
                console.log(this.schedules);
                console.log('from getSessionByCourse sessionsData:');
                console.log(sessionsData);
                console.log('from getSessionByCourse currentSchedIndex:');
                console.log(this.currentSchedIndex);
                

                for (var session of sessionsData){
                
                  this.sessionDate = this.datePipe.transform(session.date,'EEEE, MMMM d, y')
                  // console.log(this.sessionDate)
                  // console.log(this.currentDate)
                  if(this.currentDate === this.sessionDate){
                    // console.log("----------------")
                    // console.log(this.currentDate)
                    // console.log(this.sessionDate)
                    // var value = JSON.parse("true");
                    // var value2 = JSON.parse("false");
                    if(session.open == true ){
                      this.schedules[counter].status = 'Open';
                      // console.log("from open:"+this.schedules[this.currentSchedIndex].courseName)
                      // console.log("from open:"+this.schedules[this.currentSchedIndex].status)
                      // console.log("from open:"+session.open)
                    }
                    if(session.open == false){
                      this.schedules[counter].status = 'Closed';
                      // console.log("from closed:"+this.schedules[this.currentSchedIndex].courseName)
                      // console.log("from closed:"+this.schedules[this.currentSchedIndex].status)
                      // console.log("from closed:"+session.open)
                      //boxing not started
                    }
                  }
                  
                }
                
             })
             this.schedules[this.currentSchedIndex].status = 'Not Started';
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
      this.sessionEntry.open = JSON.parse("true");
      this.sessionEntry.date = this.myDate;
      this.sessionEntry.start_time = this.datePipe.transform(this.myDate, 'h:mm a');
      this.sessionEntry.end_time = schedule.end;
      this.sessionEntry.courseName= schedule.courseName;
      console.log(this.sessionEntry.date);

      //todo: set the session open: true to false when the session ends

      // schedule.status = 'On-going';

      // console.log(this.sessionEntry);
      this.sessionApi.AddSession(this.sessionEntry).subscribe( data => this.sessionInfo = data);
      console.log(this.sessionInfo);
      this.openSessionInfoModal(this.sessionEntry);
            // window.location.reload();

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

  //Adds minutes to time
  add_minutes(dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
  }


   //Schedule Table Subscriber
  //  this.userApi.GetInstructorCourseDetails(this.user).subscribe(data => {

  //   for (var i= 0 ; i < data.courses.length ; i++ ){
  //     for( var j = 0; j < data.courses[i].course.schedule.length; j++){

  //       if(data.courses[i].course.schedule[j].day === this.currentDay){

  //         // console.log(data.courses[i].course);
         
  //         this.schedules.push(data.courses[i].course.schedule[j]);
  //         this.currentSchedIndex = this.schedules.length -1;

  //         this.schedules[this.currentSchedIndex].courseName = data.courses[i].course.name;
  //         // console.log(this.currentSchedIndex);

  //         //testing
  //       this.sessionApi.GetSessionsByCourse(data.courses[i].course).subscribe(sessionsData =>{
  //           var counter = this.schedules.length;
  //           console.log("counter:")
  //           console.log(counter)
  //           console.log(sessionsData)
  //           console.log('---------------');
  //           console.log('from getSessionByCourse schedules:');
  //           console.log(this.schedules);
  //           console.log('from getSessionByCourse sessionsData:');
  //           console.log(sessionsData);
  //           console.log('from getSessionByCourse currentSchedIndex:');
  //           console.log(this.currentSchedIndex);
            

  //           for (var session of sessionsData){
            
  //             this.sessionDate = this.datePipe.transform(session.date,'EEEE, MMMM d, y')
  //             // console.log(this.sessionDate)
  //             // console.log(this.currentDate)
  //             if(this.currentDate === this.sessionDate){
  //               // console.log("----------------")
  //               // console.log(this.currentDate)
  //               // console.log(this.sessionDate)
  //               // var value = JSON.parse("true");
  //               // var value2 = JSON.parse("false");
  //               if(session.open == true ){
  //                 this.schedules[counter].status = 'Open';
  //                 // console.log("from open:"+this.schedules[this.currentSchedIndex].courseName)
  //                 // console.log("from open:"+this.schedules[this.currentSchedIndex].status)
  //                 // console.log("from open:"+session.open)
  //               }
  //               if(session.open == false){
  //                 this.schedules[counter].status = 'Closed';
  //                 // console.log("from closed:"+this.schedules[this.currentSchedIndex].courseName)
  //                 // console.log("from closed:"+this.schedules[this.currentSchedIndex].status)
  //                 // console.log("from closed:"+session.open)
  //                 //boxing not started
  //               }
  //             }
              
  //           }
            
  //        })
  //        this.schedules[this.currentSchedIndex].status = 'Not Started';
  //       }
  //     }
  //   }
  //   // console.log(this.schedules)
    
  //   this.scheduleDatasource = new MatTableDataSource<Schedule>(this.schedules)

  // });
}
