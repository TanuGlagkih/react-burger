import {
    GETTING_ORDER_DETAILS,
    GET_ORDER_DETAILS_FAILED,
    GET_ORDER_DETAILS_SUCCESS,
    CLOSE_ORDER_DETAILS
} from "../actions/order-details"

const initialOrderState = {
    orderNumber: null,
    showOrderDetails: false,
    customMessage:''
}

export const orderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        case GETTING_ORDER_DETAILS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                modalIsActive: true,
                showOrderDetails: false,
                customMessage:'Ваш заказ обрабатывается...'
            }
        }
        case GET_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                modalIsActive: true,
                showOrderDetails: false,
                customMessage:'Что-то пошло не так. Пожалуйста, повторите заказ'
            }
        }
        case GET_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                modalIsActive: true,
                showOrderDetails: true,
                customMessage:''
            }
        }
        case CLOSE_ORDER_DETAILS: {
            return {
                orderNumber: null,
                showOrderDetails: false,
            }
        }
        default: {
            return state
        }
    }
}

