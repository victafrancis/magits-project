import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/_services/session/session.service';

@Component({
  selector: 'app-manual-check-in',
  templateUrl: './manual-check-in.component.html',
  styleUrls: ['./manual-check-in.component.css']
})
export class ManualCheckInComponent implements OnInit {

//checkin form
checkinForm: FormGroup;

  constructor(
    private sessionApi: SessionService,
    public fb: FormBuilder
  ) { }

  ngOnInit( ) {

    this.checkinForm = this.fb.group({
      user: ['', [Validators.required]]
    })
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.checkinForm.controls[controlName].hasError(errorName);
  }

  submitCheckInForm(){

  }
}
