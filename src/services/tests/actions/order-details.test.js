import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/order-details'
import * as types from '../../constants'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('check order number responce', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                order: { number: 123 },
                success: true
            }),
            ok: true,
        })
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should be successful', async () => {

        const store = mockStore({});
        const orderNumber = 123;
        const expectedActions = [
            { type: types.GETTING_ORDER_DETAILS },
            { type: types.GET_ORDER_DETAILS_SUCCESS, orderNumber }
        ];

        return store.dispatch(actions.orderDetails(['order data']))
         .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
         })
        
    });

    test('should be failed', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ number: 123 }),
        }));

        const store = mockStore({});
        const expectedActions = [
            { type: types.GETTING_ORDER_DETAILS },
            { type: types.GET_ORDER_DETAILS_FAILED }]

        return store.dispatch(actions.orderDetails(['order data']))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          })
    });
})