import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/burger-constructor'
import * as types from '../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action creators', () => {
    it('should create an action with correct props', () => {
        const item = { key: 'value' };
        const key = 'key'
        const expectedAction = {
            type: types.ADD_INGREDIENT_SUCCESS,
            item,
            key
        }
        expect(actions.addIngredients(item, key)).toEqual(expectedAction)
    })
})

describe('Action creators with middleware', () => {
    it('should create an action with an item', () => {
        const store = mockStore({})
        const item = { key: 'value' };
        const expectedAction = [
            { type: types.ADD_BUN },
            { type: types.ADD_BUN_SUCCESS, item }
        ]
        store.dispatch(actions.addBun(item));
        expect(store.getActions()).toEqual(expectedAction);
    })
})

describe('Action creators', () => {
    it('should create an action with correct drag-and-hover index', () => {
        const dragIndex = 123;
        const hoverIndex = 456
        const expectedAction = {
            type: types.REPLASE_INGREDIENTS,
            dragIndex,
            hoverIndex
        }
        expect(actions.moveCard(dragIndex, hoverIndex)).toEqual(expectedAction)
    })
}) 