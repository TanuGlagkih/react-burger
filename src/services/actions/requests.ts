import { baseUrl, checkResponse } from "../API";
import { deleteCookie, getCookie, setCookie } from "../utils";
import {
    GET_USER_DATA,
    GET_USER_DATA_FAILED,
    GET_USER_DATA_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_FAILED,
    LOGOUT_REQUEST_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_REQUEST_FAILED,
    REGISTER_REQUEST_SUCCESS,
    UPDATE_USER_DATA,
    UPDATE_USER_DATA_FAILED,
    UPDATE_USER_DATA_SUCCESS
} from "../constants";
import { AppThunk } from "../types";
import { IFormState, TLoginResponce, TResetResponse, TTokenResponce, TUserResponce } from "../../utils/types";

export const logIn = ({ email, password }: IFormState): AppThunk => (dispatch) => {
    dispatch(loginRequest());
    fetch(`${baseUrl}/auth/login`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(checkResponse<TLoginResponce>)
        .then(res => {
            if (res && res.success) {
                const authRefreshToken = res.refreshToken;
                if (authRefreshToken) {
                    setCookie('refreshToken', authRefreshToken);
                }
                const authAccessToken = res.accessToken.split('Bearer ')[1];
                if (authAccessToken) {
                    setCookie('accessToken', authAccessToken);
                }

                const email = res.user.email;
                const userName = res.user.name;

                dispatch(loginRequestSuccess(email, userName))
            } else {
                dispatch(loginRequestFailed())
            }
        }).catch(err => dispatch(loginRequestFailed()))
}

export const register = ({ email, password, name }: IFormState): AppThunk => (dispatch) => {
    dispatch(registerRequest());

    fetch(`${baseUrl}/auth/register`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name,
        }),
    })
        .then(checkResponse<TLoginResponce>)
        .then(res => {
            if (res && res.success) {
                const email = res.user.email;
                const userName = res.user.name;

                dispatch(registerRequestSuccess(email, userName))

                let authRefreshToken = res.refreshToken;
                if (authRefreshToken) {
                    setCookie('refreshToken', authRefreshToken);
                }
                let authAccessToken = res.accessToken.split('Bearer ')[1];
                if (authAccessToken) {
                    setCookie('accessToken', authAccessToken);
                }
            } else {
                dispatch(registerRequestFailed())
            }
        }).catch(err => dispatch(registerRequestFailed()))
}

export const logOut = (): AppThunk => (dispatch) => {
    dispatch(logoutRequest());
    fetch(`${baseUrl}/auth/logout`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        }),
    })
        .then(checkResponse<TResetResponse>)
        .then((res) => {
            if (res && res.success && res.message == "Successful logout") {
                deleteCookie('refreshToken');
                deleteCookie('accessToken');
                dispatch(logoutRequestSuccess())
            } else {
                dispatch(logoutRequestFailed())
            }
        }).catch(err => dispatch(logoutRequestFailed()))
}

export const getUserData = (): AppThunk => (dispatch) => {
    dispatch(userDataRequest());

    const token = getCookie('refreshToken')
    fetch(`${baseUrl}/auth/user`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
    })
        .then(checkResponse<TUserResponce>)
        .then((res) => {
            if (res && res.success) {
                const email = res.user.email;
                const userName = res.user.name;

                dispatch(userDataRequestSuccess(email, userName))

            } else {
                dispatch(userDataRequestFailed());
            }
        }).catch(err => {
            if (token) {
                dispatch(refreshToken(getUserData()))
            }
            dispatch(userDataRequestFailed());
            console.log(err)
        })
}

export const updateUserData = ({ email, password, name }: IFormState): AppThunk => (dispatch) => {
    dispatch(updateDataRequest());
    const token = getCookie('refreshToken')
    fetch(`${baseUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
    })
        .then(checkResponse<TUserResponce>)
        .then((res) => {
            if (res && res.success) {

                const email = res.user.email;
                const userName = res.user.name;

                dispatch(updateDataRequestSuccess(email, userName))
            } else {
                dispatch(updateDataRequestFailed());
            }
        }).catch(err => {
            if (token) {
                dispatch(refreshToken(updateUserData({ email, password, name })))
            }
            dispatch(updateDataRequestFailed());
            console.log(err)
        })
}

export const refreshToken = (afterRefresh: any): AppThunk => (dispatch) => {
    fetch(`${baseUrl}/auth/token`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        }),
    })
        .then(checkResponse<TTokenResponce>)
        .then((res) => {
            if (res && res.success) {
                let authRefreshToken = res.refreshToken;
                if (authRefreshToken) {
                    setCookie('refreshToken', authRefreshToken);
                }
                let authAccessToken = res.accessToken.split('Bearer ')[1];
                if (authAccessToken) {
                    setCookie('accessToken', authAccessToken);
                }
                dispatch(afterRefresh)
            } else {
                throw new Error
            }
        }).catch(err => {
            console.log(err)
        })
}

const loginRequest = (): ILoginRequest => {
    return {
        type: LOGIN_REQUEST,
    }
}

const loginRequestSuccess = (email: string, userName: string): ILoginRequestSuccess => {
    return {
        type: LOGIN_REQUEST_SUCCESS,
        email: email,
        name: userName
    }
}

const registerRequest = (): IRegisterRequest => {
    return {
        type: REGISTER_REQUEST,
    }
}

const registerRequestSuccess = (email: string, userName: string): IRegisterRequestSuccess => {
    return {
        type: REGISTER_REQUEST_SUCCESS,
        email: email,
        name: userName
    }
}

const logoutRequest = (): ILogoutRequest => {
    return {
        type: LOGOUT_REQUEST,
    }
}

const logoutRequestSuccess = (): ILogoutRequestSuccess => {
    return {
        type: LOGOUT_REQUEST_SUCCESS,
    }
}

const userDataRequest = (): IGetUserData => {
    return {
        type: GET_USER_DATA,
    }
}

const userDataRequestSuccess = (email: string, userName: string): IGetUserDataSuccess => {
    return {
        type: GET_USER_DATA_SUCCESS,
        email: email,
        name: userName
    }
}

const updateDataRequest = (): IUpdateUserData => {
    return {
        type: UPDATE_USER_DATA,
    }
}

const updateDataRequestSuccess = (email: string, userName: string): IUpdateUserDataSuccess => {
    return {
        type: UPDATE_USER_DATA_SUCCESS,
        email: email,
        name: userName
    }
}

const loginRequestFailed = (): ILoginRequestFailed => {
    return {
        type: LOGIN_REQUEST_FAILED,
    }
}

const registerRequestFailed = (): IRegisterRequestFailed => {
    return {
        type: REGISTER_REQUEST_FAILED,
    }
}

const logoutRequestFailed = (): ILogoutRequestFailed => {
    return {
        type: LOGOUT_REQUEST_FAILED,
    }
}

const userDataRequestFailed = (): IUserDataRequestFailed => {
    return {
        type: GET_USER_DATA_FAILED,
    }
}

const updateDataRequestFailed = (): IUpdateDataRequestFailed => {
    return {
        type: UPDATE_USER_DATA_FAILED,
    }
}

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginRequestSuccess {
    readonly type: typeof LOGIN_REQUEST_SUCCESS;
    email: string;
    name: string
}

export interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterRequestSuccess {
    readonly type: typeof REGISTER_REQUEST_SUCCESS;
    email: string;
    name: string
}
export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutRequestSuccess {
    readonly type: typeof LOGOUT_REQUEST_SUCCESS;
}

export interface IGetUserData {
    readonly type: typeof GET_USER_DATA;
}

export interface IGetUserDataSuccess {
    readonly type: typeof GET_USER_DATA_SUCCESS;
    email: string;
    name: string
}

export interface IUpdateUserData {
    readonly type: typeof UPDATE_USER_DATA;
}

export interface IUpdateUserDataSuccess {
    readonly type: typeof UPDATE_USER_DATA_SUCCESS;
    email: string;
    name: string
}

export interface ILoginRequestFailed {
    readonly type: typeof LOGIN_REQUEST_FAILED;
}

export interface IRegisterRequestFailed {
    readonly type: typeof REGISTER_REQUEST_FAILED;
}

export interface ILogoutRequestFailed {
    readonly type: typeof LOGOUT_REQUEST_FAILED;
}

export interface IUserDataRequestFailed {
    readonly type: typeof GET_USER_DATA_FAILED;
}

export interface IUpdateDataRequestFailed {
    readonly type: typeof UPDATE_USER_DATA_FAILED;
}

export type TRequests =
    | ILoginRequestFailed
    | IRegisterRequestFailed
    | ILogoutRequestFailed
    | IUserDataRequestFailed
    | IUpdateDataRequestFailed
    | ILoginRequest
    | ILoginRequestSuccess
    | IRegisterRequest
    | IRegisterRequestSuccess
    | ILogoutRequest
    | ILogoutRequestSuccess
    | IGetUserData
    | IGetUserDataSuccess
    | IUpdateUserData
    | IUpdateUserDataSuccess



