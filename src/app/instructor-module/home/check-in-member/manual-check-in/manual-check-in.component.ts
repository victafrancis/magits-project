import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/_services/session/session.service';

@Component({
  selector: 'app-manual-check-in',
  templateUrl: './manual-check-in.component.html',
  styleUrls: ['./manual-check-in.component.css']
})
export class ManualCheckInComponent implements OnInit {

checkinForm: FormGroup;

//CHECK-IN
  result: any={};

  constructor(
    private sessionApi: SessionService,
    public fb: FormBuilder,
    private sessionAPI: SessionService
  ) { }

  ngOnInit( ) {

    this.checkinForm = this.fb.group({
      subject: ['', [Validators.required]]
    })
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.checkinForm.controls[controlName].hasError(errorName);
  }

  submitCheckInForm(){
    this.checkInMember(this.checkinForm.value)
  }

   //CHECKIN MANUALLY
  checkInMember(member: any){
    this.sessionAPI.CheckInMember(member).subscribe(data=>{
      console.log(data);
      this.result = data;
    })
  }
}
