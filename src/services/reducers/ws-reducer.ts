import { TwsMessage } from '../../utils/types';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
} from '../constants/wsActionTypes';
import { TActions } from '../types';

type TwsState = {
    wsConnected: boolean;
    messages: null | TwsMessage;

    error?: Event;
    authError?: Event;
}

const initialState: TwsState = {
    wsConnected: false,
    messages: null,
};

export const wsReducer = (state = initialState, action: TActions): TwsState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                messages: null,
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                messages: [action.payload].at(-1)!,
                error: undefined,
            };
        default:
            return state;
    }
};