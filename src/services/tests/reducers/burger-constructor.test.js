import { constructorReducer as reducer } from '../../reducers/burger-constructor'
import * as types from '../../constants'

describe('burger constructor reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            buns: null,
            ingredients: [],
        }
        )
    })

    it('should add ingredient to the array of ingredients', () => {
        expect(
            reducer(undefined, {
                type: types.ADD_INGREDIENT_SUCCESS,
                item: { data: 'ingredients' }
            })
        ).toEqual({
            buns: null,
            ingredients: [{ data: 'ingredients' }],
        }
        )
    })

    it('ADD_BUN should return state ', () => {
        expect(reducer(undefined, { type: types.ADD_BUN }))
            .toEqual({ buns: null, ingredients: [] })
    })
    it('ADD_BUN_FAILED should return current state', () => {
        expect(reducer(undefined, { type: types.ADD_BUN_FAILED }))
            .toEqual({ buns: null, ingredients: [] })
    })
    it('ADD_INGREDIENT_FAILED should return current state', () => {
        expect(reducer(undefined, { type: types.ADD_INGREDIENT_FAILED }))
            .toEqual({ buns: null, ingredients: [] })
    })

    it('should add bun to the buns object', () => {
        expect(
            reducer(undefined, {
                type: types.ADD_BUN_SUCCESS,
                item: { bun: 'bun' }
            })
        ).toEqual({
            buns: { bun: 'bun' },
            ingredients: [],
        }
        )
    })

    it('should remove ingredient from array', () => {
        expect(
            reducer(undefined, {
                type: types.REMOVE_INGREDIENT,
                key: 'string'
            })
        ).toEqual({
            buns: null,
            ingredients: [],
        }
        )
    })

    it('should replace ingredient by index', () => {
        expect(
            reducer({ buns: null, ingredients: ['main', 'sauce'] },
                {
                    type: types.REPLASE_INGREDIENTS,
                    hoverIndex: 0,
                    dragIndex: 1,
                })
        ).toEqual({ buns: null, ingredients: ['sauce', 'main'], })
    })

    it('should return empty constructor', () => {
        expect(reducer({ buns: {bun: 'bun'}, ingredients: ['main', 'sauce'] }, { type: types.NEW_ORDER }))
            .toEqual({ buns: null, ingredients: [] })
    })
}) 