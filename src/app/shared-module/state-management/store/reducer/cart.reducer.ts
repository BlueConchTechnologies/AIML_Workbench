import { AddToCartActions } from '../action/cart.actions';
import { ActionTypes } from '../enum/actionTypes';

const initialState = '';
export function CartReducer(state = initialState, action: AddToCartActions) {
    switch (action.type) {
        case ActionTypes.Add:
            return action.payload;
        default:
            return state;
    }
}
