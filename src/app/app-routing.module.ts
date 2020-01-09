import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AddPlayerComponent } from './components/add-player/add-player.component';
// import { PlayersListComponent } from './components/players-list/players-list.component';
// import { AdminHomeComponent } from './components/admin-home/admin-home.component';
// import { EditPlayerComponent } from './components/edit-player/edit-player.component';
// import { JoinGameComponent } from './components/join-game/join-game.component';
// import { GamesComponent } from './components/games/games.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { adminRoutes } from './admin/admin.routes';

// const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: 'players-list' },
//   { path: 'edit-player/:id', component: EditPlayerComponent },
//   { path: 'add-player', component: AddPlayerComponent },
//   { path: 'players-list', component: PlayersListComponent },
//   { path: 'admin-home', component: AdminHomeComponent },
//   { path: 'join-game/:id', component: JoinGameComponent },
//   { path: 'games', component: GamesComponent }
// ];

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
