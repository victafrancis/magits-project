import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { UserService } from '../_services/user/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PasswordValidation } from './passwordValidator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('resetPlayerForm',{static:false}) myNgForm;
  memberRegForm: FormGroup;
  visible = true;
  selectable = true;
  selected = null;
  error = false;
  myValidator = false;
  //Roles: any = ['member'];
  

  constructor( 
    public fb: FormBuilder,
    private router: Router,
    private overlay: Overlay,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private userAPI: UserService) { }

  ngOnInit() {
    this.submitBookForm();
  }


  /* Reactive book form */
  submitBookForm() {
    this.memberRegForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: ['member', [Validators.required]]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberRegForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitMemberRegForm() {
    if (this.memberRegForm.valid) {
      this.userAPI.AddUser(this.memberRegForm.value).subscribe(res => {
        if(res){
          this.ngZone.run(() => this.router.navigateByUrl('/success'));
        }
        console.log('Success!');
      }, (err) => {
        console.log('Email Exists!');
        this.error = true;
      });
    }
  }

 
  openDialog(): void {

    const dialogRef = this.dialog.open(DialogTermsofUse, {
      maxWidth: '750px',
      maxHeight: '700px',
      width: '80%',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog1(): void {

    const dialogRef = this.dialog.open(DialogPrivacy, {
      maxWidth: '750px',
      maxHeight: '700px',
      width: '80%',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

}


@Component({
  selector: 'dialog-terms-of-use',
  templateUrl: 'dialog-terms-of-use.html',
  styleUrls: ['./register.component.css']
})

export class DialogTermsofUse{
  constructor( public dialogRef: MatDialogRef<DialogTermsofUse>){}


  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'dialog-privacy',
  templateUrl: 'dialog-privacy.html',
  styleUrls: ['./register.component.css']
})
export class DialogPrivacy{
  constructor( public dialogRef: MatDialogRef<DialogPrivacy>){}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
