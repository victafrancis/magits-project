import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';

/* Angular 8 http service */
import { HttpClientModule } from '@angular/common/http';

/* Angular 8 CRUD services */
import { ApiService } from './shared2/api.service';


/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPlayerComponent } from './_components/add-player/add-player.component';
import { PlayersListComponent } from './_components/players-list/players-list.component';
import { EditPlayerComponent } from './_components/edit-player/edit-player.component';
import { AdminHomeComponent } from './_components/admin-home/admin-home.component';
import { GamesComponent } from './_components/games/games.component';
import { JoinGameComponent } from './_components/join-game/join-game.component';
import { LoginComponent } from './_login/login.component';
import { PageNotFoundComponent } from './_page-not-found/page-not-found.component';
import { AdminModule } from './admin-module/admin-module.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { InstructorModule } from './instructor-module/instructor-module.module';
import { MemberModule } from './member-module/member-module.module';

@NgModule({
  declarations: [
    AppComponent,//
    AddPlayerComponent,
    PlayersListComponent,
    EditPlayerComponent,
    AdminHomeComponent,
    GamesComponent,
    JoinGameComponent,
    LoginComponent,//
    PageNotFoundComponent//
    
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
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
