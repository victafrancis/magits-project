import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() messageToEmit = new EventEmitter<any>(); //emit to parent

  constructor(
    public fb: FormBuilder
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
    this.messageToEmit.emit(member);
  }
}
