import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { MediaChange, MediaObserver  } from '@angular/flex-layout';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../_services/user/user.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PasswordValidation } from './passwordValidator';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  token = this._authService.decode();
  value = this.token.subject;
  myNumberQRVersion = 9;
  isDisabled = true;
  isHidden = true;
//
  watcher: Subscription;
  columns: number = 4;
//
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetUserForm', {static:true}) myNgForm;
  userForm: FormGroup;
//

  constructor(public dialog: MatDialog, private _authService: AuthService, media: MediaObserver, public fb: FormBuilder, private actRoute: ActivatedRoute, private userApi: UserService) {

    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change) {
        if (change.mqAlias == 'xs') {
          this.columns = 1;
          this.myNumberQRVersion = 4;
        } else if( change.mqAlias == 'sm'){
          this.myNumberQRVersion = 8;
        } else if( change.mqAlias == 'md'){
          this.myNumberQRVersion = 9;
        } else {
          this.columns = 2;
          this.myNumberQRVersion = 11;
        }
      }
    });

    var id =  this.value;
    this.userApi.GetUser(id).subscribe(data => {
      //console.log(data.subjects)
      this.userForm = this.fb.group({
        firstname: [data.firstname, [Validators.required]],
        lastname: [data.lastname, [Validators.required]],
        email: [data.email, [Validators.required]],
        birthdate: [data.birthdate, [Validators.required]]
      });      
      this.myDisable();
    })   
   }
   
  

   openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewChangePassword, {
      maxWidth: '450px',
      width: '80%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  ngOnInit() {
    this.updateBookForm();
    this.myDisable();
}

// disable button
 myDisable(){
   this.userForm.get('firstname').disable();
   this.userForm.get('lastname').disable()
   this.userForm.get('email').disable()
   this.userForm.get('birthdate').disable()
   this.isDisabled = true;
   this.isHidden = true;
 }

 myEnable(){
  this.userForm.get('firstname').enable();
  this.userForm.get('lastname').enable()
  this.userForm.get('email').enable();
  this.userForm.get('birthdate').enable();
  this.isDisabled = false;
  this.isHidden = false;
}

 /* Reactive book form */
 updateBookForm() {
  this.userForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email:['', [Validators.required]],
    birthdate:['',[Validators.required]]
  })
}

 /* Get errors */
 public handleError = (controlName: string, errorName: string) => {
  return this.userForm.controls[controlName].hasError(errorName);
}

  /* Update book */
  updateUserForm() {
    console.log(this.userForm.value)
    var id = this.value; 
    if (window.confirm('Are you sure you want to update profile?')) {
      this.userApi.UpdateUser(id, this.userForm.value).subscribe( res => {
        this.myDisable();
      });
    }
  }

 


}

@Component({
  selector: 'dialog-change-password-dialog',
  templateUrl: 'dialog-changePassword.html',
  styleUrls: ['./profile.component.css']
})
export class DialogOverviewChangePassword {
  userPasswordChange : FormGroup;
  token = this._authService.decode();
  value = this.token.subject;
  error = false;


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewChangePassword>, public fb: FormBuilder, private userApi: UserService, private _authService: AuthService){
      this.userPasswordChange = this.fb.group({
        currPassword: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      });     
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUserPassword(){
    var id = this.value; 
    
    
    this.userApi.GetUser(id).subscribe(data => {
    if(data.password == this.userPasswordChange.value.currPassword){
        if (window.confirm('Are you sure you want to change password?')) {
            this.userApi.UpdateUser(id, this.userPasswordChange.value).subscribe( res => {
            this.onNoClick();
          });
        }
      }else{
        //console.log("Wrong password");
        this.error = true;
      }    
    })

  
  }

   /* Get errors */
   public handleError = (controlName: string, errorName: string) => {
    return this.userPasswordChange.controls[controlName].hasError(errorName);
  }  


 updateBookForm() {
  this.userPasswordChange = this.fb.group({
    currPassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  },{
    validator: PasswordValidation.MatchPassword
  })
}
  ngOnInit() {
    this.updateBookForm();
}

}
