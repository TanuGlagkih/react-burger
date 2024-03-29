import { IIngredients } from "../../utils/types";
import {
    ADD_BUN,
    ADD_BUN_FAILED,
    ADD_BUN_SUCCESS,
    ADD_INGREDIENT_FAILED,
    ADD_INGREDIENT_SUCCESS,
    REPLASE_INGREDIENTS
} from "../constants";
import { AppThunk } from "../types";

export function addIngredients(item: IIngredients, key: string):
    IAddIngredientsSuccess
    | IAddIngredientsFailed {
    try {
        return {
            type: ADD_INGREDIENT_SUCCESS,
            item,
            key
        }
    }
    catch (err) {
        return {
            type: ADD_INGREDIENT_FAILED
        }
    }
}

export const addBun = (item: IIngredients): AppThunk => (dispatch) => {
    dispatch(addingBun());
    try {
        dispatch(addBunSuccess(item))
    }
    catch (err) {
        dispatch(addBunFailed())
    }
}

export function moveCard(dragIndex: number, hoverIndex: number): IMoveCard {
    return {
        type: REPLASE_INGREDIENTS,
        dragIndex,
        hoverIndex
    };
}

export function addingBun(): IAddBun {
    return {
        type: ADD_BUN
    }
}

export function addBunSuccess(item: IIngredients): IAddBunSuccess {
    return {
        type: ADD_BUN_SUCCESS,
        item: item
    }
}

export function addBunFailed(): IAddBunFailed {
    return {
        type: ADD_BUN_FAILED
    }
}

export interface IAddIngredientsSuccess {
    readonly type: typeof ADD_INGREDIENT_SUCCESS,
    item: IIngredients,
    key: string
}
export interface IAddIngredientsFailed {
    readonly type: typeof ADD_INGREDIENT_FAILED,
}

export interface IMoveCard {
    readonly type: typeof REPLASE_INGREDIENTS,
    dragIndex: number,
    hoverIndex: number
}

export interface IAddBun {
    readonly type: typeof ADD_BUN
}

export interface IAddBunSuccess {
    readonly type: typeof ADD_BUN_SUCCESS,
    item: IIngredients
}

export interface IAddBunFailed {
    readonly type: typeof ADD_BUN_FAILED
}

export type TBurgerConstructorActions =
    | IAddIngredientsSuccess
    | IAddIngredientsFailed
    | IMoveCard
    | IAddBun
    | IAddBunSuccess
    | IAddBunFailed

