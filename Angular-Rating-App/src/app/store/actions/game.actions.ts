
import { Action } from '@ngrx/store';

export enum ActionTypes {
    LOAD_DATA_BEGIN = '[Game List] Load data begin',
    GET_GAME_LIST = '[Game List] get list',
    SCEDULE_RATING = '[Game List] schedule rating',
    UPDATE_RATING = '[GAME LIST] update rating'
}

export class LoadDataBegin implements Action {
    readonly type = ActionTypes.LOAD_DATA_BEGIN;
}

export class GetGameList implements Action {
    readonly type = ActionTypes.GET_GAME_LIST;
    constructor(public payload: { data: any }) {}
}

export class ScheduleRating implements Action {
    readonly type = ActionTypes.SCEDULE_RATING;
}

export class UpdateRating implements Action {
    readonly type = ActionTypes.UPDATE_RATING;
    constructor(public payload: { rating: number, index: number }) {}
}

export type Actions = LoadDataBegin | GetGameList | ScheduleRating;
