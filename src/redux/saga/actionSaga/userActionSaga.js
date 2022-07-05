import { call, put, takeLatest, delay } from "redux-saga/effects"
import { userService } from "../../../service/UserService"
import { GET_USER_LOGIN, MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../../types/UserTypes"
import { SIGN_IN_API } from "../typesSaga/UserTypesSaga"
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
        yield put({ type: MESSAGE_APPEAR })
        yield delay(2000)
        yield put({ type: MESSAGE_DISAPPEAR })
    }

}
export function* folowSignIn() {
    yield takeLatest(SIGN_IN_API, signIn)
}