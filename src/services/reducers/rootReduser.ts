import { constructorReducer } from "./burger-constructor";
import { burgerReducer } from "./burger-ingredients";
import { orderReducer } from "./order-details";
import { requestsReducer } from "./requests";

import { combineReducers } from 'redux';
import { wsReducer } from "./ws-reducer";

export const rootReducer = combineReducers({
    order: orderReducer,
    burger: burgerReducer,
    product: constructorReducer,
    requests: requestsReducer,
    allSocket: wsReducer,
})