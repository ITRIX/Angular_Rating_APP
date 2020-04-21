import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './component/game-list/game-list.component';


const routes: Routes = [
  { path: 'games', component: GameListComponent },
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
