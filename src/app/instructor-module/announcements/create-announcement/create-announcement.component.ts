import { Component, OnInit, NgZone } from '@angular/core';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent implements OnInit {

  announcementForm: FormGroup;
  user: any;
  currentDate= new Date();

  constructor(
    private announcementApi: AnnouncementService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private _authService: AuthService
) {
  this.user = this._authService.decode();
  console.log(this.user);
  }

  ngOnInit() {
    this.announcementForm = this.fb.group({
      date: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      content: ['', [Validators.required]],
      user: ''
    })

    // this.totalDays = new FormControl('', [Validators.required])
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.announcementForm.controls[controlName].hasError(errorName);
  }

  // public handleDays = (controlName: string, errorName: string) => {
  //   return this.totalDays.controls[controlName].hasError(errorName);
  // }

  submitAnnouncementForm() {
    if(this.announcementForm.valid){
      if (window.confirm('Are you sure you want to make this announcement?')) {
        console.log(this.announcementForm.value);
        this.announcementApi.AddAnnouncement(this.announcementForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('/instructor/announcements'))
        });
      }
    }

  }
}
