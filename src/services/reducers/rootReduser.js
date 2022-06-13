import { constructorReducer } from "./burger-constructor";
import { burgerReducer } from "./burger-ingredients";
import { orderReducer } from "./order-details";

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    order: orderReducer,
    burger: burgerReducer,
    product: constructorReducer,
})