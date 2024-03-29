import { IIngredients } from "../../utils/types";
import {
    BURGER_INGREDIENTS_REQUEST,
    BURGER_INGREDIENTS_REQUEST_FAILED,
    BURGER_INGREDIENTS_REQUEST_SUCCESS,
    BUN_INCREASER,
    OTHER_INGREDIENTS_INCREASER,
    INGREDIENT_COUNTER_DECREASE,
    CLEAR_COUNTER
} from "../constants";
import { TActions } from "../types";

export type TInitialIngredientsListState = {
    items: Array<IIngredients>,
    ingredientsRequest: boolean,
    ingredientsRequestFailed: boolean,
}

const initialIngredientsListState: TInitialIngredientsListState = {
    items: [],
    ingredientsRequest: false,
    ingredientsRequestFailed: false,
}

export const burgerReducer = (state = initialIngredientsListState, action: TActions): TInitialIngredientsListState => {
    switch (action.type) {
        case BURGER_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsRequestFailed: false
            }
        }
        case BURGER_INGREDIENTS_REQUEST_SUCCESS: {
            return {
                ...state,
                items: action.data,
                ingredientsRequest: false,
            }
        }
        case BURGER_INGREDIENTS_REQUEST_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsRequestFailed: true
            }
        }
        case BUN_INCREASER: {
            return {
                ...state,
                items: [...state.items].map((item: IIngredients) =>
                 item.type === 'bun'
                        ?
                        item._id === action.id ?
                            { ...item, __v: 1 }
                            :
                            { ...item, __v: 0 }
                        :
                        item
                )
            }
        }
        case OTHER_INGREDIENTS_INCREASER: {
            return {
                ...state,
                items: [...state.items].map((item: IIngredients) =>
                    (item.type === 'sauce' || item.type === 'main') && item._id === action.id
                        ?
                        { ...item, __v: ++item.__v }
                        :
                        item
                )
            }
        }
        case INGREDIENT_COUNTER_DECREASE: {
            return {
                ...state,
                items: [...state.items].map((item: IIngredients) => item._id === action.id ? { ...item, __v: --item.__v } : item)
            }
        }
        case CLEAR_COUNTER: {
            return {
                ...state,
                items: [...state.items].map((item: IIngredients) => item.__v !== 0 ? { ...item, __v: 0} : item)
            }
        }
        default: {
            return state;
        }
    }
}