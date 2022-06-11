import { url } from "../API";

export const BURGER_INGREDIENTS_REQUEST = 'BURGER_INGREDIENTS_REQUEST';
export const BURGER_INGREDIENTS_REQUEST_SUCCESS = 'BURGER_INGREDIENTS_REQUEST_SUCCESS';
export const BURGER_INGREDIENTS_REQUEST_FAILED = 'BURGER_INGREDIENTS_REQUEST_FAILED';

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const GET_INGREDIENT_DETAILS_FAILED = 'GET_INGREDIENT_DETAILS_FAILED';
export const GET_INGREDIENT_DETAILS_SUCCESS = 'GET_INGREDIENT_DETAILS_SUCCESS';
export const INGREDIENT_DETAILS_CLOSING = 'INGREDIENT_DETAILS_CLOSING';

export const BUN_INCREASER = 'BUN_INCREASER';
export const  OTHER_INGREDIENTS_INCREASER = ' OTHER_INGREDIENTS_INCREASER';
export const INGREDIENT_COUNTER_DECREASE = 'INGREDIENT_COUNTER_DECREASE';

export function getItems() {
    return function (dispatch) {
        dispatch({
            type: BURGER_INGREDIENTS_REQUEST,
        });
        fetch(url)
            .then((res) => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
            }).then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: BURGER_INGREDIENTS_REQUEST_SUCCESS,
                        data: res.data,
                    })
                } else {
                    dispatch({
                        type: BURGER_INGREDIENTS_REQUEST_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: BURGER_INGREDIENTS_REQUEST_FAILED
                })
            })
    }
}

export function getDetails(itemId) {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENT_DETAILS,
        });
        try {
            dispatch({
                type: GET_INGREDIENT_DETAILS_SUCCESS,
                id: itemId
            })
        }
        catch (err) {
            dispatch({
                type: GET_INGREDIENT_DETAILS_FAILED
            })
        }
    }
}

export function ingredientCounterIncrease(itemId, itemType) {
    return function (dispatch) {
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
} 