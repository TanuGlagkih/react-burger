import { IOrderDetailsResponce } from "../../utils/types";
import { baseUrl, checkResponse } from "../API";
import {
    GETTING_ORDER_DETAILS,
    GET_ORDER_DETAILS_FAILED,
    GET_ORDER_DETAILS_SUCCESS
} from "../constants";
import { AppThunk } from '../types'
import { getCookie } from "../utils";

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
 
export const orderDetails = (orderData: ReadonlyArray<string>): AppThunk => (dispatch) => {
        dispatch({
            type: GETTING_ORDER_DETAILS,
        });
        fetch(`${baseUrl}/orders`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({
                ingredients: orderData,
            }),
        })
            .then(checkResponse<IOrderDetailsResponce>)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_DETAILS_SUCCESS,
                        orderNumber: res.order.number,
                    })
                } else {
                    orderRequestFailed()
                }
            }).catch(err => orderRequestFailed())
    }

const orderRequestFailed = (): IOrderRequestFailed => {
    return {
        type: GET_ORDER_DETAILS_FAILED,
    }
}
