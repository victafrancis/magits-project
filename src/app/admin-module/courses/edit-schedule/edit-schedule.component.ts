import { Component, OnInit, Optional, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CourseService } from '../../../_services/course/course.service';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ScheduleService } from '../../../_services/schedule/schedule.service';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})

export class EditScheduleComponent implements OnInit {
  form: FormGroup;
  course_schedule = new FormArray([]);
  course_id: any;
  num: Number;

  constructor(
    // DATA PASSED TO MODAL COMPONENT
    private dialogRef: MatDialogRef<EditScheduleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private recievedData: any,
    private courseApi: CourseService,
    private fb: FormBuilder,
    private scheduleApi: ScheduleService
  ) {
    this.course_id = recievedData.course_id;
    this.courseApi.GetCourse(this.course_id).subscribe(data => {
      for (const schedule of data.schedule) {
        this.form = this.fb.group({
          id: [schedule._id],
          day: [schedule.day, [Validators.required]],
          start: [schedule.start, [Validators.required]],
          end: [schedule.end, [Validators.required]]
        });
        this.course_schedule.push(this.form);
      }
    });
  }

  ngOnInit() {
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  // UPDATES ALL SCHEDULE DETAILS IF NECESSARY
  updateSchedule() {
    if (window.confirm("Are you sure you want to edit this Course's schedule?")){
      for (const schedule of this.course_schedule.value) {
        this.scheduleApi.UpdateSchedule(schedule.id, schedule).subscribe();
      }
      this.closeDialog();
      window.location.reload();
    }
  }

  deleteSchedule(schedule_id){
    if(window.confirm('Are you sure you want to remove this schedule?')){
      this.scheduleApi.DeleteSchedule(schedule_id).subscribe();
      window.location.reload();
    }

  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
