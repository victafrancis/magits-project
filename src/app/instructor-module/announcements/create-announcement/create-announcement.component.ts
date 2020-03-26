import { Component, OnInit, NgZone } from '@angular/core';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { DatePipe, Location } from '@angular/common'

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent implements OnInit {
  announcementForm: FormGroup;
  currentDate = new Date();
  user: any;

  constructor(
    public fb: FormBuilder,
    private announcementApi: AnnouncementService,
    private ngZone: NgZone,
    private router: Router,
    private datePipe: DatePipe,
    private location: Location,
    private _authService: AuthService
  ) {
    this.user = this._authService.decode();
   }

  ngOnInit() {
    this.AnnouncementForm();
  }

  AnnouncementForm(){
    this.announcementForm = this.fb.group({
      subject: ['', [Validators.required]],
      content: ['', Validators.required]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.announcementForm.controls[controlName].hasError(errorName);
  }

  submitAnnouncementForm(){
    if(this.announcementForm.valid){
      if(window.confirm('Are you sure you want to send this announcement?')){
        this.announcementForm.value.user= this.user.subject;
     
        this.announcementApi.AddAnnouncement(this.announcementForm.value).subscribe( res => {
          this.ngZone.run(() => this.router.navigateByUrl('/instructor/announcements'))
        });
      }
    }
  }

  backPressed(){
    this.location.back();
  }
}
