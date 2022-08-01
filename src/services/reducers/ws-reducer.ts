import { TwsMessage } from '../../utils/types';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED_PROTECTED,
    WS_CONNECTION_ERROR_PROTECTED,
    WS_CONNECTION_SUCCESS_PROTECTED,
    WS_GET_MESSAGE_PROTECTED,
} from '../constants/wsActionTypes';
import { TActions } from '../types';

type TwsState = {
    wsConnected: boolean;
    messages: null | TwsMessage ;

    wsAuthConnected: boolean;
    authMessages: null | TwsMessage ;

    error?: Event;
    authError?: Event;
}

const initialState: TwsState = {
    wsConnected: false,
    messages: null,

    wsAuthConnected: false,
    authMessages: null 
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
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                messages: [action.payload].at(-1)!,
                error: undefined,
            };

        case WS_CONNECTION_SUCCESS_PROTECTED:
            return {
                ...state,
                authError: undefined,
                wsAuthConnected: true
            };

        case WS_CONNECTION_ERROR_PROTECTED:
            return {
                ...state,
                authError: action.payload,
                wsAuthConnected: false
            };

        case WS_CONNECTION_CLOSED_PROTECTED:
            return {
                ...state,
                authError: undefined,
                wsAuthConnected: false
            };

        case WS_GET_MESSAGE_PROTECTED:
            return {
                ...state,
                authMessages: [action.payload].at(-1)!,
                authError: undefined,
            };
        default:
            return state;
    }
};