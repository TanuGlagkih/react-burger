import { orderReducer as reducer } from '../../reducers/order-details'
import * as types from '../../constants'

describe('order details reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            orderNumber: null,
            modalIsActive: false,
            showOrderDetails: false,
            customMessage: '',
        })
    })

    it('should set custom message-preloader', () => {
        expect(
            reducer(undefined, {
                type: types.GETTING_ORDER_DETAILS,
            })
        ).toEqual({
            orderNumber: null,
            modalIsActive: true,
            showOrderDetails: false,
            customMessage: 'Ваш заказ обрабатывается...'
        })
    })

    it('should set custom message that order failed', () => {
        expect(
            reducer(undefined, {
                type: types.GET_ORDER_DETAILS_FAILED,
            })
        ).toEqual({
            orderNumber: null,
            modalIsActive: true,
            showOrderDetails: false,
            customMessage: 'Что-то пошло не так. Пожалуйста, повторите заказ'
        })
    })

    it('should add order number', () => {
        expect(
            reducer(undefined, {
                type: types.GET_ORDER_DETAILS_SUCCESS,
                orderNumber: 123
            })
        ).toEqual({
            orderNumber: 123,
            modalIsActive: true,
            showOrderDetails: true,
            customMessage: ''
        })
    })
})