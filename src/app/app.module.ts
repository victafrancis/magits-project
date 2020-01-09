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
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { GamesComponent } from './components/games/games.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';

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
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
