import React from 'react'

import { call, put, takeLatest, delay } from "redux-saga/effects"
import { userService } from "../../../service/UserService"
import { GET_USER_LOGIN, MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../../types/UserTypes"
import { SIGN_IN_API, SIGN_UP_API } from "../typesSaga/UserTypesSaga"
import { history } from '../../../App'

function* signIn(action) {
    try {
        let { status, data } = yield call(() => userService.signin(action.payload))
        if (status === 200) {
            yield put({
                type: GET_USER_LOGIN,
                payload: data.content
            })
            history.push('/home')
        }
    } catch (error) {
        console.log('error', error)
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
        let { status, data } = yield call(() => userService.signup(action.payload))
        if (data.statusCode === 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Tạo tài khoản thành công!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
            history.push('/login')
        }
    } catch (error) {
        console.log('error', error)
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
