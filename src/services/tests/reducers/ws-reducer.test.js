import { wsReducer as reducer } from '../../reducers/ws-reducer'
import * as types from '../../constants/wsActionTypes'

describe('web socket reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            wsConnected: false,
            messages: null,
            error: undefined,
        })
    })

    it('should add true if websocket connected', () => {
        expect(
            reducer(undefined, {
                type: types.WS_CONNECTION_SUCCESS,
            })
        ).toEqual({
            error: undefined,
            wsConnected: true,
            messages: null,
        })
    })

    it('should add an error if websocket connection failed', () => {
        const event = new Event('error')
        expect(
            reducer(undefined, {
                type: types.WS_CONNECTION_ERROR,
                payload: event,
            })
        ).toEqual({
            wsConnected: false,
            messages: null,
            error: event,
        })
    })

    it('should add false when websocket connection closed', () => {
        expect(
            reducer(undefined, {
                type: types.WS_CONNECTION_CLOSED,
            })
        ).toEqual({
            wsConnected: false,
            messages: null,
            error: undefined,
        })
    })

    it('should add last message in array of messages', () => {
        expect(
            reducer({
                wsConnected: true,
                messages: null,
                error: undefined,
            }, {
                type: types.WS_GET_MESSAGE,
                payload: { one: 'one' }
            })
        ).toEqual({
            wsConnected: true,
            messages: { one: 'one' },
            error: undefined,
        })
    })
})