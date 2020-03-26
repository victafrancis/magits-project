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
  err: boolean = false;

  // REQUIRED FOR ADDING NEW SCHEDULE
  AddScheduleForm: FormGroup;
  isTrue: boolean = false;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  time = ['00:00','01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', 
           '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', 
           '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00', ];
  selectedDay: null;
  selectedStartTime: null;
  selectedEndTime: null;


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
    this.AddScheduleForm = this.fb.group({
      day: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  // adds a course schedule
  addSchedule(){
    var start = this.AddScheduleForm.value.start.split(':')[0];
    var end = this.AddScheduleForm.value.end.split(':')[0];

    if(start < end){
      this.err = false;
      if(this.AddScheduleForm.valid){
        if(window.confirm("Are you sure you want this schedule?")){
          this.scheduleApi.AddSchedule(this.course_id, this.AddScheduleForm.value).subscribe();
          this.closeDialog();
          window.location.reload();
        }
      }
    }else{
      this.err = true;
    }
  }


  // updates a schedule if changes are made in the form
  updateSchedule() {
    if (window.confirm("Are you sure you want to edit this Course's schedule?")){
      for (const schedule of this.course_schedule.value) {
        this.scheduleApi.UpdateSchedule(schedule.id, schedule).subscribe();
      }
      this.closeDialog();
      window.location.reload();
    }
  }

  // delete schedule
  deleteSchedule(schedule_id){
    if(window.confirm('Are you sure you want to remove this schedule?')){
      this.scheduleApi.DeleteSchedule(schedule_id).subscribe();
      window.location.reload();
    }

  }

  // resets the content of the add schedule form
  resetForm(form){
    form.reset();
    this.isTrue = false;
  }

  // closes the modal
  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
