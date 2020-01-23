import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  course_id: any;
  student_id: any;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any 
  ) {
    this.course_id = this.data.course_id;
    this.student_id = this.data.student_id;
  }

  ngOnInit() {
  }

}
