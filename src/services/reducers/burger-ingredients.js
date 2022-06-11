import {
    BURGER_INGREDIENTS_REQUEST,
    BURGER_INGREDIENTS_REQUEST_FAILED,
    BURGER_INGREDIENTS_REQUEST_SUCCESS,
    GET_INGREDIENT_DETAILS,
    BUN_INCREASER,
    OTHER_INGREDIENTS_INCREASER,
    INGREDIENT_DETAILS_CLOSING,
    INGREDIENT_COUNTER_DECREASE,
    CLEAR_COUNTER
} from "../actions/burger-ingredients";

const initialIngredientsListState = {
    items: [],

    ingredientsRequest: false,
    ingredientsRequestFailed: false,

    item: {},
    currentItemId: '',
    showDetails: false,
    gettingDetails: false,
    getDetailsFailed: false,
}

export const burgerReducer = (state = initialIngredientsListState, action) => {
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
        case GET_INGREDIENT_DETAILS: {
            return {
                ...state,
                gettingDetails: false,
                showDetails: true,
                item: state.items.find(item => item._id === action.id),
                currentItemId: action.id,
            }
        }
        case INGREDIENT_DETAILS_CLOSING: {
            return {
                ...state,
                item: {},
                currentItemId: '',
                showDetails: false
            }
        }
        case BUN_INCREASER: {
            return {
                ...state,
                items: [...state.items].map((item) =>
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
                items: [...state.items].map((item) =>
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
                items: [...state.items].map((item) => item._id === action.id ? { ...item, __v: --item.__v } : item)
            }
        }
        case CLEAR_COUNTER: {
            return {
                ...state,
                items: [...state.items].map((item) => item._v !== 0 ? { ...item, __v: 0} : item)
            }
        }
        default: {
            return state;
        }
    }
}