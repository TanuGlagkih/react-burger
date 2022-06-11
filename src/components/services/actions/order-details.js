import { order } from "../API";

export const GETTING_ORDER_DETAILS = 'GETTING_ORDER_DETAILS';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export const orderDetails = (orderData) => {
    return function (dispatch) {
        dispatch({
            type: GETTING_ORDER_DETAILS,
        });
          fetch(order, {
            method: 'post',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                ingredients: orderData,
              }),
                    })
            .then((res) => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
            }).then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_DETAILS_SUCCESS,
                        orderNumber: res.order.number,
                    })
                } else {
                    dispatch({
                        type: GET_ORDER_DETAILS_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: GET_ORDER_DETAILS_FAILED
                })
            })
    }
}