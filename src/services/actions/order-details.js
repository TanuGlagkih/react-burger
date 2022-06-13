import { baseUrl, checkResponse } from "../API";

export const GETTING_ORDER_DETAILS = 'GETTING_ORDER_DETAILS';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const orderDetails = (orderData) => {
    return function (dispatch) {
        dispatch({
            type: GETTING_ORDER_DETAILS,
        });
        fetch(`${baseUrl}/orders`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                ingredients: orderData,
            }),
        })
            .then(checkResponse)
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
}

const orderRequestFailed = () => {
    return {
        type: GET_ORDER_DETAILS_FAILED,
    }
}
