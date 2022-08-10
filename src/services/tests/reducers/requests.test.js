import { requestsReducer as reducer } from '../../reducers/requests'
import * as types from '../../constants'

describe('requests reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            email: '',
            name: '',
            requesting: false,
            success: false,
            isAuth: false
        })
    })

    it('should set requesting=true when login start', () => {
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: true,
            success: false,
            isAuth: false
        })
    })

    it('should set success=false when login failed', () => {
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST_FAILED,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: false,
            success: false,
            isAuth: false
        })
    })

    it('should add email and name of user', () => {
        expect(
            reducer(undefined, {
                type: types.LOGIN_REQUEST_SUCCESS,
                email: 'mail',
                name: 'user name'
            })
        ).toEqual({
            requesting: false,
            success: true,
            email: 'mail',
            name: 'user name',
            isAuth: true
        })
    })

    it('should set requesting=true when register start', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: true,
            success: false,
            isAuth: false
        })
    })

    it('should set success=false when register failed', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST_FAILED,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: false,
            success: false,
            isAuth: false
        })
    })

    it('should add email and name of user if register success', () => {
        expect(
            reducer(undefined, {
                type: types.REGISTER_REQUEST_SUCCESS,
                email: 'mail',
                name: 'user name'
            })
        ).toEqual({
            requesting: false,
            success: true,
            email: 'mail',
            name: 'user name',
            isAuth: true
        })
    })

    it('should set requesting=true when logout start', () => {
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: true,
            success: false,
            isAuth: false
        })
    })

    it('should set success=false when logout failed', () => {
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST_FAILED,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: false,
            success: false,
            isAuth: false
        })
    })

    it('should remove email and name of user', () => {
        expect(
            reducer(undefined, {
                type: types.LOGOUT_REQUEST_SUCCESS,
            })
        ).toEqual({
            requesting: false,
            success: true,
            email: '',
            name: '',
            isAuth: false
        })
    })

    it('should set requesting=true when getting user data start', () => {
        expect(
            reducer(undefined, {
                type: types.GET_USER_DATA,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: true,
            success: false,
            isAuth: false
        })
    })

    it('should set success=false when when getting user data failed', () => {
        expect(
            reducer(undefined, {
                type: types.GET_USER_DATA_FAILED,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: false,
            success: false,
            isAuth: false
        })
    })

    it('should set email and name of user if getting user data success', () => {
        expect(
            reducer(undefined, {
                type: types.GET_USER_DATA_SUCCESS,
                email: 'mail',
                name: 'user name',
            })
        ).toEqual({
            requesting: false,
            success: true,
            email: 'mail',
            name: 'user name',
            isAuth: true
        })
    })


    it('should set requesting=true when updating user data start', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_USER_DATA,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: true,
            success: false,
            isAuth: false
        })
    })

    it('should set success=false when when updating user data failed', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_USER_DATA_FAILED,
            })
        ).toEqual({
            email: '',
            name: '',
            requesting: false,
            success: false,
            isAuth: false
        })
    })

    it('should set email and name of user if updating user data success', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_USER_DATA_SUCCESS,
                email: 'mail',
                name: 'user name',
            })
        ).toEqual({
            requesting: false,
            success: true,
            email: 'mail',
            name: 'user name',
            isAuth: true
        })
    })

})