import * as  GameAction from '../../store/actions/game.actions';
import { range, of } from 'rxjs';
import { flatMap, delay, repeat } from 'rxjs/operators';
import { Games } from '../../models/game.model';
export const initalState = {
    data: []
};


export function reducer(state = initalState, action: GameAction.Actions) {
    switch (action.type) {
        case GameAction.ActionTypes.GET_GAME_LIST: {
            return {
                ...state,
                data: action.payload.data
            };
        }
        default: {
            return state;
        }
    }
}

