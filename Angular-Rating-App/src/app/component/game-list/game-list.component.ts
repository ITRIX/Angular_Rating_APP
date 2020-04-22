import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as gameAction from '../../store/actions/game.actions';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  gameList: Array<any> = [];
  ratingSubscription: Subscription;
  max = 5;
  isStartRating: boolean;
  constructor(private gameService: GameService, private store: Store<{ game: any[] }>) { }

  ngOnInit(): void {
    this.isStartRating = false;
    this.store.dispatch(new gameAction.LoadDataBegin());
    this.store.select('game').subscribe((result: any) => {
      this.gameList = result.data.data;
      this.ratingSubscription = result.data.callback;
    });
  }

  /**
   * startRandomRating
   *
   * @description - It will start rating each item randomly.
   */
  startRandomRating(): void {
    this.isStartRating = !this.isStartRating;
    if (this.isStartRating) {
      this.store.dispatch(new gameAction.ScheduleRating());
    } else {
      this.ratingSubscription.unsubscribe();
    }
  }

  /**
   * updateRating
   *
   * @description - It will update selected item rating.
   */
  updateRating(rating: number, index: number) {
    const payload = {rating, index};
    this.store.dispatch(new gameAction.UpdateRating(payload));
  }

}
