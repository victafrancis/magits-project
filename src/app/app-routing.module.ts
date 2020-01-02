import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { GamesComponent } from './components/games/games.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'players-list' },
  { path: 'edit-player/:id', component: EditPlayerComponent },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'players-list', component: PlayersListComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'join-game/:id', component: JoinGameComponent },
  { path: 'games', component: GamesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
