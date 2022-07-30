import type { Middleware, MiddlewareAPI } from 'redux';
import { TwsMessage } from '../../utils/types';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED_PROTECTED,
    WS_CONNECTION_ERROR_PROTECTED,
    WS_CONNECTION_START_PROTECTED,
    WS_CONNECTION_SUCCESS_PROTECTED,
    WS_GET_MESSAGE_PROTECTED,
} from '../constants/wsActionTypes';
import type { AppDispatch, RootState } from '../types';
import { getCookie } from '../utils';

export interface IwsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    payload: Event;
}

export interface IwsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: Event;
}

export interface IwsGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload: TwsMessage;
}

export interface IwsConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSED;
    payload: Event;
}

export interface IwsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}

export interface IwsAuthConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS_PROTECTED;
    payload: Event;
}

export interface IwsAuthConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR_PROTECTED;
    payload: Event;
}

export interface IwsAuthGetMessage {
    readonly type: typeof WS_GET_MESSAGE_PROTECTED;
    payload: TwsMessage;
}

export interface IwsAuthConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSED_PROTECTED;
    payload: Event;
}

export interface IwsAuthConnectionStart {
    readonly type: typeof WS_CONNECTION_START_PROTECTED;
}

export type TSoketMiddleware =
    | IwsConnectionSuccess
    | IwsConnectionError
    | IwsGetMessage
    | IwsConnectionClose
    | IwsConnectionStart
    | IwsAuthConnectionSuccess
    | IwsAuthConnectionError
    | IwsAuthGetMessage
    | IwsAuthConnectionClose
    | IwsAuthConnectionStart

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let socketForAuthUser: WebSocket | null = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START') {
                socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                };
                socket.onerror = event => {
                    console.log('error');
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
                };
                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                };
            }

            if (type === 'WS_CONNECTION_START_PROTECTED') {
                const accessToken = getCookie('accessToken')
                socketForAuthUser = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
            }

            if (socketForAuthUser) {
                socketForAuthUser.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS_PROTECTED', payload: event });
                };
                socketForAuthUser.onerror = event => {
                    console.log('error');
                    dispatch({ type: 'WS_CONNECTION_ERROR_PROTECTED', payload: event });
                };
                socketForAuthUser.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: 'WS_GET_MESSAGE_PROTECTED', payload: parsedData });
                };
                socketForAuthUser.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED_PROTECTED', payload: event });
                };
            }
            next(action);
        };
    }) as Middleware;
};