import { IOrderDetailsResponce } from "../../utils/types";
import { baseUrl, checkResponse } from "../API";
import {
    GETTING_ORDER_DETAILS,
    GET_ORDER_DETAILS_FAILED,
    GET_ORDER_DETAILS_SUCCESS
} from "../constants";
import { AppThunk } from '../types'
import { getCookie } from "../utils";

export const orderDetails = (orderData: ReadonlyArray<string>): AppThunk => (dispatch) => {
    dispatch(orderDetailsRequest());

  return fetch(`${baseUrl}/orders`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            ingredients: orderData,
        }),
    })
        .then((res) => checkResponse<IOrderDetailsResponce>(res))
        .then((res) => {
            if (res && res.success) {
                const orderNumber = res.order.number;
                dispatch(orderRequestSuccess(orderNumber))
            } else {
                dispatch(orderRequestFailed())
            }
        }).catch(err => dispatch(orderRequestFailed()))
}

const orderDetailsRequest = (): IGetOrderDetails => {
    return {
        type: GETTING_ORDER_DETAILS,
    }
}
const orderRequestSuccess = (orderNumber: number): IGetOrderDetailsSuccess => {
    return {
        type: GET_ORDER_DETAILS_SUCCESS,
        orderNumber: orderNumber
    }
}

const orderRequestFailed = (): IOrderRequestFailed => {
    return {
        type: GET_ORDER_DETAILS_FAILED,
    }
}

export interface IGetOrderDetails {
    readonly type: typeof GETTING_ORDER_DETAILS
}

export interface IGetOrderDetailsSuccess {
    readonly type: typeof GET_ORDER_DETAILS_SUCCESS,
    orderNumber: number
}

export interface IOrderRequestFailed {
    readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

export type TOrderDetailsActions =
    | IGetOrderDetails
    | IGetOrderDetailsSuccess
    | IOrderRequestFailed


