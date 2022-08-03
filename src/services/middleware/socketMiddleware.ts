import type { Middleware, MiddlewareAPI } from 'redux';
import { TwsMessage } from '../../utils/types';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_DISCONNECT,
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
    payload?: Event;
}

export interface IwsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    protected: boolean;
}

export interface IwsDisconnect {
    readonly type: typeof WS_DISCONNECT;
}

export type TSoketMiddleware =
    | IwsConnectionSuccess
    | IwsConnectionError
    | IwsGetMessage
    | IwsConnectionClose
    | IwsConnectionStart
    | IwsDisconnect

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let isConnected: boolean;
        let reconnectTimer = 0;
        let url: string | URL;
        const accessToken = getCookie('accessToken');
        let isProtected = false;

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;

            if (type === 'WS_CONNECTION_START') {
                isProtected = action.protected
                url = isProtected ?
                    `wss://norma.nomoreparties.space/orders?token=${accessToken}`
                    :
                    'wss://norma.nomoreparties.space/orders/all'

                socket = new WebSocket(url);
            }

            if (socket) {
                socket.onopen = event => {
                    isConnected = true;
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                };
                socket.onerror = event => {
                    console.log('error');
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() =>
                            dispatch({ type: 'WS_CONNECTION_START', protected: isProtected }),
                            3000);
                    }
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
                };
                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                    isConnected = false;
                    console.log('closed');
                };
                if (type === 'WS_DISCONNECT') {
                    socket.close()
                    socket = null;
                    isConnected = false;
                    reconnectTimer = 0;
                    url = '';
                    isProtected = false
                }
            }
            next(action);
        };
    }) as Middleware;
};