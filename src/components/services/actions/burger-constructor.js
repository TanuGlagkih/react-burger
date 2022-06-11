export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENT_FAILED = 'ADD_INGREDIENT_FAILED';
export const ADD_INGREDIENT_SUCCESS = 'ADD_INGREDIENTS_SUCCESS';

export const ADD_BUN = 'ADD_BUN';
export const ADD_BUN_FAILED = 'ADD_BUN_FAILED';
export const ADD_BUN_SUCCESS = 'ADD_BUN_SUCCESS';

export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REPLASE_INGREDIENTS='REPLASE_INGREDIENTS';


export function addIngredients(item,key) {
    return function (dispatch) {
        dispatch({
            type: ADD_INGREDIENT,
        });
        try {
            dispatch({
                type: ADD_INGREDIENT_SUCCESS,
                item,
                key
            })
        }
        catch (err) {
            dispatch({
                type: ADD_INGREDIENT_FAILED
            })
        }
    }
}

export function addBun(item) {
    return function (dispatch) {
        dispatch({
            type: ADD_BUN,
        });
        try {
            dispatch({
                type: ADD_BUN_SUCCESS,
                item
            })
        }
        catch (err) {
            dispatch({
                type: ADD_BUN_FAILED
            })
        }
    }
}

export function moveCard(dragIndex, hoverIndex) {
    return function (dispatch) {
        dispatch({
            type: REPLASE_INGREDIENTS,
            dragIndex,
            hoverIndex
        });
        
    }
}
