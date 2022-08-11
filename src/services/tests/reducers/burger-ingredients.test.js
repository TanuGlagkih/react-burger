import { burgerReducer as reducer } from '../../reducers/burger-ingredients'
import * as types from '../../constants'

describe('burger ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            items: [],
            ingredientsRequest: false,
            ingredientsRequestFailed: false,
        })
    })

    it('should return state with ingredientRequest = true', () => {
        expect(
            reducer(undefined, {
                type: types.BURGER_INGREDIENTS_REQUEST,
            })
        ).toEqual({
            items: [],
            ingredientsRequest: true,
            ingredientsRequestFailed: false,
        })
    })

    it('should add items into array', () => {
        expect(
            reducer(undefined, {
                type: types.BURGER_INGREDIENTS_REQUEST_SUCCESS,
                data: ['data']
            })
        ).toEqual({
            items: ['data'],
            ingredientsRequest: false,
            ingredientsRequestFailed: false,
        })
    })

    it('should make ingredientsRequestFailed = true', () => {
        expect(
            reducer(undefined, {
                type: types.BURGER_INGREDIENTS_REQUEST_FAILED,
            })
        ).toEqual({
            items: [],
            ingredientsRequest: false,
            ingredientsRequestFailed: true,
        })
    })

    it('should increase buns counter', () => {
        expect(
            reducer({
                items: [{ _id: '123', type: 'bun', __v: 0 }],
                ingredientsRequest: false,
                ingredientsRequestFailed: false,
            }, {
                type: types.BUN_INCREASER,
                id: '123'
            })
        ).toEqual({
            items: [{ _id: '123', type: 'bun', __v: 1 }],
            ingredientsRequest: false,
            ingredientsRequestFailed: false,
        })
    })

    it('should increase choosen ingredient counter', () => {
        expect(
            reducer({
                items: [{ _id: '456', type: 'main', __v: 0 }],
                ingredientsRequest: false,
                ingredientsRequestFailed: false,
            }, {
                type: types.OTHER_INGREDIENTS_INCREASER,
                id: '456'
            })
        ).toEqual({
            items: [{ _id: '456', type: 'main', __v: 1 }],
            ingredientsRequest: false,
            ingredientsRequestFailed: false,
        })
    })

    it('should decrease choosen ingredient counter', () => {
        expect(
            reducer({
                items: [{ _id: '789', __v: 1 }],
                ingredientsRequest: false,
                ingredientsRequestFailed: false,
            }, {
                type: types.INGREDIENT_COUNTER_DECREASE,
                id: '789'
            })
        ).toEqual({
            items: [{ _id: '789', __v: 0 }],
            ingredientsRequest: false,
            ingredientsRequestFailed: false,
        })
    })

    it('should clear counters of all items', () => {
        expect(
            reducer({
                items: [{ _id: '789', __v: 1 }, { _id: '123', __v: 1 }, { _id: '456', __v: 1 }],
                ingredientsRequest: false,
                ingredientsRequestFailed: false,
            }, {
                type: types.CLEAR_COUNTER,
            })
        ).toEqual({
            items: [{ _id: '789', __v: 0 }, { _id: '123', __v: 0 }, { _id: '456', __v: 0 }],
            ingredientsRequest: false,
            ingredientsRequestFailed: false,
        })
    })

}) 