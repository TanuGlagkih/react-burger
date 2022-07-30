import { IIngredients } from "../../utils/types";
import {
    ADD_INGREDIENT_SUCCESS,
    ADD_INGREDIENT_FAILED,
    ADD_BUN,
    ADD_BUN_SUCCESS,
    ADD_BUN_FAILED,
    REMOVE_INGREDIENT,
    REPLASE_INGREDIENTS,
    NEW_ORDER,
} from "../constants";
import { TActions } from "../types";

export type TInitialBurgerState = {
    buns: null | IIngredients,
    ingredients: Array<IIngredients>,
}

const initialBurgerState: TInitialBurgerState = {
    buns: null,
    ingredients: [],
}

export const constructorReducer = (state = initialBurgerState, action: TActions): TInitialBurgerState => {
    switch (action.type) {
        case ADD_INGREDIENT_SUCCESS: {
            return {
                ...state,
                ingredients: state.ingredients.concat(action.item),
            }
        }
        case ADD_INGREDIENT_FAILED: {
            return { ...state }
        }
        case ADD_BUN: {
            return { ...state }
        }
        case ADD_BUN_SUCCESS: {
            return {
                ...state,
                buns: { ...action.item },
            }
        }
        case ADD_BUN_FAILED: {
            return { ...state }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item => item.key !== action.key)
            }
        }
        case REPLASE_INGREDIENTS: {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.hoverIndex, 0, ingredients.splice(action.dragIndex, 1)[0]);

            return {
                ...state,
                ingredients: ingredients
            }
        }
        case NEW_ORDER: {
            return {
                buns: null,
                ingredients: [],
            }
        }
        default: {
            return state
        }
    }
}