import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GameService } from 'src/app/component/game-list/game.service';
import * as gameAction from '../../store/actions/game.actions';

@Injectable()
export class GameEffects {
  constructor(private actions: Actions, private gameService: GameService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType(gameAction.ActionTypes.LOAD_DATA_BEGIN),
    switchMap(() => {
      return this.gameService.getGamesList().pipe(
        map(data => new gameAction.GetGameList({ data }))
      );
    })
  );

  @Effect()
  scheduleRating = this.actions.pipe(
    ofType(gameAction.ActionTypes.SCEDULE_RATING),
    switchMap(() => {
      return this.gameService.scheduleRating().pipe(
        map(data => new gameAction.GetGameList({ data }))
      );
    })
  );

  @Effect()
  updateRating = this.actions.pipe(
    ofType(gameAction.ActionTypes.UPDATE_RATING),
    switchMap((action: any) => {
      return this.gameService.updateRating(action.payload.rating, action.payload.index).pipe(
        map(data => new gameAction.GetGameList({ data }))
      );
    })
  );

}
