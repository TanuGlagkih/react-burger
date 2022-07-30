import { ThunkAction } from "redux-thunk";
import { TConstructorActions } from "../../components/burger-constructor/burger-constructor";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";
import { TOrderDetailsActions } from "../actions/order-details";
import { TRequests } from "../actions/requests";
import { store } from "../store";
import type {} from 'redux-thunk/extend-redux'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { TSoketMiddleware } from "../actions/socketMiddleware";

export type RootState = ReturnType<typeof store.getState>; 

export type TActions = 
| TRequests 
| TOrderDetailsActions
| TBurgerConstructorActions
| TBurgerIngredientsActions
| TConstructorActions
| TSoketMiddleware

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TActions
>

export type AppDispatch<TReturnType = void> = (action: TActions | AppThunk) => TReturnType;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
