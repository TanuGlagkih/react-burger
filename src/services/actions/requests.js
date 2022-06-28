import { baseUrl, checkResponse } from "../API";
import { deleteCookie, getCookie, setCookie } from "../utils";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';

export const GET_USER_DATA = 'GET_USER_DATA'
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED'

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA'
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS'
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED'

export const logIn = ({ email, password }) => {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        });
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
            .then(checkResponse)
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
                    dispatch({
                        type: LOGIN_REQUEST_SUCCESS,
                        email: res.user.email,
                        name: res.user.name,
                    })
                } else {
                    dispatch(loginRequestFailed())
                  
                }
            }).catch(err => dispatch(loginRequestFailed()))
    }
}

export const register = ({ email, password, name }) => {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST,
        });
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
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_REQUEST_SUCCESS,
                        email: res.user.email,
                        name: res.user.name,
                    })
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
}

export const logOut = () => {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        fetch(`${baseUrl}/auth/logout`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            }),
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success && res.message == "Successful logout") {
                    deleteCookie('refreshToken');
                    deleteCookie('accessToken');
                    dispatch({
                        type: LOGOUT_REQUEST_SUCCESS,
                    })
                } else {
                    dispatch(logoutRequestFailed())
                }
            }).catch(err => dispatch(logoutRequestFailed()))
    }
}

export const getUserData = () => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_DATA,
        });
        const token = getCookie('refreshToken')
        fetch(`${baseUrl}/auth/user`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_DATA_SUCCESS,
                        email: res.user.email,
                        name: res.user.name,
                    })
                } else {
                    dispatch(userDataRequestFailed());
                }
            }).catch(err => {
                if (token) {
                    console.log(10);
                    dispatch(refreshToken(getUserData()))
                }
                dispatch(userDataRequestFailed());
                console.log(err)
            })
    }
}

export const updateUserData = ({ email, password, name }) => {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_DATA,

        });
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
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_DATA_SUCCESS,
                        email: res.user.email,
                        name: res.user.name,
                    })
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
}

export const refreshToken = (afterRefresh) => {
    return function (dispatch) {
        fetch(`${baseUrl}/auth/token`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: getCookie('refreshToken')
            }),
        })
            .then(checkResponse)
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
}

const loginRequestFailed = () =>{
    return {
        type: LOGIN_REQUEST_FAILED,
    }
}

const registerRequestFailed = () => {
    return {
        type: REGISTER_REQUEST_FAILED,
    }
}

const logoutRequestFailed = () => {
    return {
        type: LOGOUT_REQUEST_FAILED,
    }
}

const userDataRequestFailed = () => {
    return {
        type: GET_USER_DATA_FAILED,
    }
}

const updateDataRequestFailed = () => {
    return {
        type: UPDATE_USER_DATA_FAILED,
    }
}
