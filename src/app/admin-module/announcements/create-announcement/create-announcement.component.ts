import { Component, OnInit, NgZone } from '@angular/core';
import { AnnouncementService } from '../../../_services/announcement.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})

export class CreateAnnouncementComponent implements OnInit {
  AnnouncementForm: FormGroup;
  currentDate = new Date();

  constructor(
    public fb: FormBuilder,
    private announcementApi: AnnouncementService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.AnnouncementForm = this.fb.group({
      date: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      content: ['', Validators.required]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.AnnouncementForm.controls[controlName].hasError(errorName);
  }

  submitAnnouncementForm(){
    if(window.confirm('Are you sure you want to send this announcement?')){
      this.announcementApi.AddAnnouncement(this.AnnouncementForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/admin/announcements'))
      });
    }
  }
}
