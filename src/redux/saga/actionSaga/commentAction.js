import { call, delay, put, takeLatest } from "redux-saga/effects"
import TaskDetail from "../../../page/TaskDetail/TaskDetail"
import { commentService } from "../../../service/CommentService"
import { GET_ALL_COMMENTS } from "../../types/CommentTypeReducer"
import { MESSAGE_ALERT_APPEAR, MESSAGE_ALERT_DISAPPEAR, MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../../types/MessageTypes"
import { DELETE_COMMENT_API, GET_ALL_COMMENTS_API, INSERT_COMMENT_API, UPDATE_COMMENT_API } from "../typesSaga/commentTypes"

function* insertCommentAction(action) {
    try {
        const result = yield call(() => commentService.insertComment(action.payload))
        console.log('result', result)
        yield put({ type: GET_ALL_COMMENTS_API, payload: action.payload.taskId })
    } catch (error) {
        console.log('error', error)
    }
}
export function* followInsertCommentAction() {
    yield takeLatest(INSERT_COMMENT_API, insertCommentAction)
}

function* getAllCommentAction(action) {
    try {
        const result = yield call(() => commentService.getAllComment(action.payload))
        yield put({ type: GET_ALL_COMMENTS, payload: result.data.content })
    } catch (error) {
        console.log('error', error)
    }
}
export function* followGetAllCommentAction() {
    yield takeLatest(GET_ALL_COMMENTS_API, getAllCommentAction)
}

function* deleteCommentAction(action) {
    try {
        const result = yield call(() => commentService.deleteComment(action.payload.id))
        yield put({ type: MESSAGE_APPEAR, payload: <p>Delete successfully!</p> })
        yield delay(1000)
        yield put({ type: MESSAGE_DISAPPEAR })
        yield put({ type: GET_ALL_COMMENTS_API, payload: action.payload.taskId })
    } catch (error) {
        console.log('error', error)
    }
}
export function* followDeleteCommentAction() {
    yield takeLatest(DELETE_COMMENT_API, deleteCommentAction)
}

function* updateCommentAction(action) {
    try {
        const result = yield call(() => commentService.updateComment(action.payload.id, action.payload.contentComment))
        yield put({ type: GET_ALL_COMMENTS_API, payload: action.payload.taskId })
    } catch (error) {
        console.log('error', error)
    }
}
export function* followUpdateCommentAction() {
    yield takeLatest(UPDATE_COMMENT_API, updateCommentAction)
}
