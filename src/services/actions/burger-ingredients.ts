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


export const getItems = (): AppThunk => (dispatch) => {
    dispatch({
        type: BURGER_INGREDIENTS_REQUEST,
    });
    fetch(`${baseUrl}/ingredients`)
        .then(checkResponse<TDataResponce>)
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: BURGER_INGREDIENTS_REQUEST_SUCCESS,
                    data: res.data,
                })

            } else {
                dispatch(ingredientRequestFailed())
            }
        }).catch(err => dispatch(ingredientRequestFailed()))
}

const ingredientRequestFailed = (): IIngredientRequestFailed => {
    return {
        type: BURGER_INGREDIENTS_REQUEST_FAILED,
    }
}
export const ingredientCounterIncrease = (itemId: string, itemType: string): AppThunk=> (dispatch)=>{
        itemType === 'bun'
            ?
            dispatch({
                type: BUN_INCREASER,
                id: itemId
            })
            :
            dispatch({
                type: OTHER_INGREDIENTS_INCREASER,
                id: itemId
            })
    }


