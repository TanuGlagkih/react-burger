import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/burger-ingredients'
import * as types from '../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('check BURGER_INGREDIENTS_REQUEST', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        {
          data: ['any data'],
          success: true
        }
      ),
      ok: true
    })
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should be successful', async () => {

    const store = mockStore({})
    const expectedActions = [
      { type: types.BURGER_INGREDIENTS_REQUEST },
      {
        type: types.BURGER_INGREDIENTS_REQUEST_SUCCESS,
        data: ['any data']
      }]

    return store.dispatch(actions.getItems())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  })

  test('should be failed', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ data: ['any data'] }),
    }));

    const store = mockStore({});
    const expectedActions = [
      { type: types.BURGER_INGREDIENTS_REQUEST },
      { type: types.BURGER_INGREDIENTS_REQUEST_FAILED }]

    return store.dispatch(actions.getItems())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  });
})

describe('async actions', () => {

  it('creates BUN_INCREASER', () => {
    const store = mockStore({})
    const itemId = 'id';
    const itemType = 'bun'
    const expectedActions = [{
      type: types.BUN_INCREASER,
      id: itemId
    }]

    store.dispatch(actions.ingredientCounterIncrease(itemId, itemType))
    expect(store.getActions()).toEqual(expectedActions);
  })

  it('creates INGR_INCREASER', () => {
    const store = mockStore({})
    const itemId = 'id';
    const itemType = 'sauce'
    const expectedActions = [{
      type: types.OTHER_INGREDIENTS_INCREASER,
      id: itemId
    }]
    store.dispatch(actions.ingredientCounterIncrease(itemId, itemType));
    expect(store.getActions()).toEqual(expectedActions);
  })
})

