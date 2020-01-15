import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';

/* Angular 8 http service */
import { HttpClientModule } from '@angular/common/http';

/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './_login/login.component';
import { PageNotFoundComponent } from './_page-not-found/page-not-found.component';
import { AdminModule } from './admin-module/admin-module.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { InstructorModule } from './instructor-module/instructor-module.module';
import { MemberModule } from './member-module/member-module.module';
import { RegisterComponent } from './register/register.component';

//LoginGuard
import { LoginPageGuard } from './_guards/login-page-guard.service';
import { MessageComponent } from './message/message.component'; 


@NgModule({
  declarations: [
    AppComponent,//
    LoginComponent,//
    PageNotFoundComponent, 
    RegisterComponent, MessageComponent//

  ],
  imports: [
    BrowserModule,//
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AdminModule,//
    InstructorModule,//
    MemberModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [LoginPageGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
