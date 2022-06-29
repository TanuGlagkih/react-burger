import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_REQUEST_FAILED,
    LOGOUT_REQUEST_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_REQUEST_FAILED,
    REGISTER_REQUEST_SUCCESS,
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    UPDATE_USER_DATA,
    UPDATE_USER_DATA_FAILED,
    UPDATE_USER_DATA_SUCCESS
} from "../actions/requests";

const initialUserState = {
    email: '',
    name: '',
    requesting: false,
    success: false,
    isAuth: false
}

export const requestsReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                requesting: true,
            }
        }
        case LOGIN_REQUEST_FAILED: {
            return {
                ...state,
                requesting: false,
                success: false,
            }
        }
        case LOGIN_REQUEST_SUCCESS: {
            return {
                ...state,
                requesting: false,
                success: true,
                email: action.email,
                name: action.name,
                isAuth: true
            }
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                requesting: true,
            }
        }
        case REGISTER_REQUEST_FAILED: {
            return {
                ...state,
                requesting: false,
                success: false,
            }
        }
        case REGISTER_REQUEST_SUCCESS: {
            return {
                ...state,
                requesting: false,
                success: true,
                email: action.email,
                name: action.name,
                isAuth: true
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                requesting: true,
            }
        }
        case LOGOUT_REQUEST_FAILED: {
            return {
                ...state,
                requesting: false,
                success: false,
            }
        }
        case LOGOUT_REQUEST_SUCCESS: {
            return {
                ...state,
                requesting: false,
                success: true,
                email: '',
                name: '',
                isAuth: false
            }
        }
        case GET_USER_DATA: {
            return {
                ...state,
                requesting: true,
            }
        }
        case GET_USER_DATA_FAILED: {
            return {
                ...state,
                requesting: false,
                success: false,
            }
        }
        case GET_USER_DATA_SUCCESS: {
            return {
                ...state,
                requesting: false,
                success: true,
                email: action.email,
                name: action.name,
                isAuth: true
            }
        }
        case UPDATE_USER_DATA: {
            return {
                ...state,
                requesting: true,
            }
        }
        case UPDATE_USER_DATA_FAILED: {
            return {
                ...state,
                requesting: false,
                success: false,
            }
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                requesting: false,
                success: true,
                email: action.email,
                name: action.name,
                isAuth: true
            }
        }
        default: {
            return state
        }
    }
}