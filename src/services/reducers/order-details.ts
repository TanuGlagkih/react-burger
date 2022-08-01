import {
    GETTING_ORDER_DETAILS,
    GET_ORDER_DETAILS_FAILED,
    GET_ORDER_DETAILS_SUCCESS,
} from "../constants";
import { TActions } from "../types";

export type TInitialOrderState = {
    orderNumber: number | null,
    modalIsActive: boolean,
    showOrderDetails: boolean,
    customMessage: string,
}

const initialOrderState = {
    orderNumber: null,
    modalIsActive: false,
    showOrderDetails: false,
    customMessage: '',
}

export const orderReducer = (state = initialOrderState, action: TActions): TInitialOrderState => {
    switch (action.type) {
        case GETTING_ORDER_DETAILS: {
            return {
                ...state,
                modalIsActive: true,
                showOrderDetails: false,
                customMessage: 'Ваш заказ обрабатывается...'
            }
        }
        case GET_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                modalIsActive: true,
                showOrderDetails: false,
                customMessage: 'Что-то пошло не так. Пожалуйста, повторите заказ'
            }
        }
        case GET_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                modalIsActive: true,
                showOrderDetails: true,
                customMessage: ''
            }
        }
        default: {
            return state
        }
    }
}

