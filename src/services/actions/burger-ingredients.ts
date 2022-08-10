import { IIngredients, TDataResponce } from "../../utils/types";
import { baseUrl, checkResponse } from "../API";
import {
    BUN_INCREASER,
    BURGER_INGREDIENTS_REQUEST,
    BURGER_INGREDIENTS_REQUEST_FAILED,
    BURGER_INGREDIENTS_REQUEST_SUCCESS,
    OTHER_INGREDIENTS_INCREASER
} from "../constants";
import { AppThunk } from "../types";


export const getItems = (): AppThunk => (dispatch) => {
    dispatch(ingredientRequest());
    return fetch(`${baseUrl}/ingredients`)
        .then((res) => checkResponse<TDataResponce>(res))
        .then((res) => {
            if (res && res.success) {
                const data = res.data;
                dispatch(ingredientRequestSuccess(data))
            } else {
                dispatch(ingredientRequestFailed())
            }
        }).catch(err => dispatch(ingredientRequestFailed()))
}

export const ingredientCounterIncrease = (itemId: string, itemType: string): AppThunk => (dispatch) => {
    itemType === 'bun'
        ?
        dispatch(increaseBun(itemId))
        :
        dispatch(increaseIngredient(itemId))
}

export interface IIngredientsRequest {
    readonly type: typeof BURGER_INGREDIENTS_REQUEST
}

export interface IIngredientsRequestSuccess {
    readonly type: typeof BURGER_INGREDIENTS_REQUEST_SUCCESS,
    data: Array<IIngredients>
}

export interface IIngredientRequestFailed {
    readonly type: typeof BURGER_INGREDIENTS_REQUEST_FAILED
}

export interface IBunIncreaser {
    readonly type: typeof BUN_INCREASER,
    id: string
}

export interface IIngredientsIncreaser {
    readonly type: typeof OTHER_INGREDIENTS_INCREASER,
    id: string
}

export type TBurgerIngredientsActions =
    | IIngredientsRequest
    | IIngredientsRequestSuccess
    | IIngredientRequestFailed
    | IBunIncreaser
    | IIngredientsIncreaser

export function ingredientRequest(): IIngredientsRequest {
    return {
        type: BURGER_INGREDIENTS_REQUEST,
    }
}

export function ingredientRequestSuccess(data: Array<IIngredients>): IIngredientsRequestSuccess {
    return {
        type: BURGER_INGREDIENTS_REQUEST_SUCCESS,
        data: data,
    }
}

export function ingredientRequestFailed(): IIngredientRequestFailed {
    return {
        type: BURGER_INGREDIENTS_REQUEST_FAILED,
    }
}

export function increaseBun(itemId: string): IBunIncreaser {
    return {
        type: BUN_INCREASER,
        id: itemId
    }
}

export function increaseIngredient(itemId: string): IIngredientsIncreaser {
    return {
        type: OTHER_INGREDIENTS_INCREASER,
        id: itemId
    }
}



