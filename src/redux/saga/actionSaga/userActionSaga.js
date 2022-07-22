import React from 'react'

import { call, put, takeLatest, delay } from "redux-saga/effects"
import { userService } from "../../../service/UserService"
import { GET_ALL_USER, GET_USER_LOGIN } from "../../types/UserTypes"
import { DELETE_USER_API, EDIT_USER_API, GET_USER_API, SIGN_IN_API, SIGN_UP_API } from "../typesSaga/UserTypesSaga"
import { history } from '../../../App'
import { MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from '../../types/MessageTypes'
import { APPEAR_LOADING, HIDE_LOADING } from '../../types/LoadingTypes'
import { HIDE_MODAL } from '../../types/PopupModalTypes'

function* signIn(action) {
    try {
        yield put({ type: APPEAR_LOADING })
        let { status, data } = yield call(() => userService.signin(action.payload))
        yield delay(500)
        yield put({ type: HIDE_LOADING })

        if (status === 200) {
            yield put({
                type: GET_USER_LOGIN,
                payload: data.content
            })
            history.push('/board')
        }
    } catch (error) {
        console.log('error', error)
        yield delay(500)
        yield put({ type: HIDE_LOADING })
        yield put({ type: MESSAGE_APPEAR, payload: <p>Email hoặc mật khẩu không đúng!</p> })
        yield delay(2000)
        yield put({ type: MESSAGE_DISAPPEAR })
    }

}
export function* folowSignIn() {
    yield takeLatest(SIGN_IN_API, signIn)
}

function* signup(action) {
    try {
        yield put({ type: APPEAR_LOADING })
        let { status, data } = yield call(() => userService.signup(action.payload))
        yield delay(500)
        yield put({ type: HIDE_LOADING })

        if (data.statusCode === 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Tạo tài khoản thành công!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
            history.push('/login')
        }
    } catch (error) {
        console.log('error', error)
        yield delay(500)
        yield put({ type: HIDE_LOADING })
        if (error.response.data.statusCode === 400) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>{error.response.data.message}</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
        }
    }
}
export function* followSignUp() {
    yield takeLatest(SIGN_UP_API, signup)
}

function* getUserAction(action) {
    try {
        const { data, status } = yield call(() => userService.getUser(action.payload))
        if (status === 200) {
            yield put({ type: GET_ALL_USER, payload: data.content })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* followGetUserAction() {
    yield takeLatest(GET_USER_API, getUserAction)
}

function* deleteUserAction(action) {
    try {
        const { data, status } = yield call(() => userService.deleteUser(action.payload))
        if (status === 200) {
            yield put({ type: GET_USER_API, payload: '' })
            yield put({ type: MESSAGE_APPEAR, payload: <p>Delete User Sucessfully!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
        }
    } catch (error) {
        console.log('error', error)
    }
}
export function* followDeleteUserAction() {
    yield takeLatest(DELETE_USER_API, deleteUserAction)
}

function* editUserAction(action) {
    try {
        const { status, data } = yield call(() => userService.editUser(action.payload))
        if (status === 200) {
            yield put({ type: HIDE_MODAL })
            yield put({ type: GET_USER_API, payload: '' })
            yield put({ type: MESSAGE_APPEAR, payload: <p>Update Sucessfully!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
        }
    } catch (error) {
        console.log('error', error)
    }
}
export function* followEditUserAction() {
    yield takeLatest(EDIT_USER_API, editUserAction)
}