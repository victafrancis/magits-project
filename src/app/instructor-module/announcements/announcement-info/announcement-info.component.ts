import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from 'src/app/_services/announcement/announcement.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-announcement-info',
  templateUrl: './announcement-info.component.html',
  styleUrls: ['./announcement-info.component.css']
})
export class AnnouncementInfoComponent implements OnInit {

  announcement_id: any;
  announcement: any={};
  constructor(
    private actRoute: ActivatedRoute,
    private announcementApi: AnnouncementService,
    private location: Location
  ) {
    this.announcement_id = this.actRoute.snapshot.paramMap.get('id');
    this.announcementApi.GetAnnouncement(this.announcement_id).subscribe( announcemenData =>{
      this.announcement =announcemenData;
    })
   }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }
}
