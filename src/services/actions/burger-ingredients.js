import { baseUrl, checkResponse } from "../API";

export const BURGER_INGREDIENTS_REQUEST = 'BURGER_INGREDIENTS_REQUEST';
export const BURGER_INGREDIENTS_REQUEST_SUCCESS = 'BURGER_INGREDIENTS_REQUEST_SUCCESS';
export const BURGER_INGREDIENTS_REQUEST_FAILED = 'BURGER_INGREDIENTS_REQUEST_FAILED';

export const BUN_INCREASER = 'BUN_INCREASER';
export const OTHER_INGREDIENTS_INCREASER = ' OTHER_INGREDIENTS_INCREASER';
export const INGREDIENT_COUNTER_DECREASE = 'INGREDIENT_COUNTER_DECREASE';
export const CLEAR_COUNTER = 'CLEAR_COUNTER';

export function getItems() {
    return function (dispatch) {
        dispatch({
            type: BURGER_INGREDIENTS_REQUEST,
        });
        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: BURGER_INGREDIENTS_REQUEST_SUCCESS,
                        data: res.data,
                    })

                } else {
                    ingredientRequestFailed()
                }
            }).catch(err => ingredientRequestFailed())
    }
}

const ingredientRequestFailed = () => {
    return {
        type: BURGER_INGREDIENTS_REQUEST_FAILED,
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

