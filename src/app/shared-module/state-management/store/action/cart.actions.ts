import { Action } from '@ngrx/store';
import { ActionTypes } from '../enum/actionTypes';

export class AddToCartActions implements Action {
    type = ActionTypes.Add;

    constructor(public payload: any) {
    }
}
