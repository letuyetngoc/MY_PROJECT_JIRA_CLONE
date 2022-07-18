import { call, put, takeLatest, delay } from "redux-saga/effects"
import { projectService } from "../../../service/ProjectService";
import { MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../../types/MessageTypes";
import { CREATE_PROJECT, GET_ALL_PRIORITY, GET_ALL_PROJECT, GET_ALL_STATUS, GET_ALL_TASK_TYPES } from "../../types/ProjectType";
import { CREATE_PROJECT_API, CREATE_TASK_API, GET_ALL_PRIORITY_API, GET_ALL_PROJECT_API, GET_ALL_STATUS_API, GET_ALL_TASK_TYPES_API } from "../typesSaga/projectType";

function* createProjectAction(action) {
    try {
        const { data, status } = yield call(() => projectService.createProject(action.payload))
        if (status === 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Tạo project thành công!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
            yield put({ type: CREATE_PROJECT, payload: data.content })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* followCreateProjectAction() {
    yield takeLatest(CREATE_PROJECT_API, createProjectAction)
}

function* getAllProjectAction() {
    try {
        const { data, status } = yield call(() => projectService.getAllProject())
        if (status === 200) {
            yield put({ type: GET_ALL_PROJECT, payload: data.content })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* followGetAllProjectAction() {
    yield takeLatest(GET_ALL_PROJECT_API, getAllProjectAction)
}

function* getAllStatusAction() {
    try {
        const { data, status } = yield call(() => projectService.getAllStatus())
        if (status === 200) {
            yield put({ type: GET_ALL_STATUS, payload: data.content })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* followGetAllStatus() {
    yield takeLatest(GET_ALL_STATUS_API, getAllStatusAction)
}

function* getAllPriorityAction() {
    try {
        const { data, status } = yield call(() => projectService.getAllPriority())
        if (status === 200) {
            yield put({ type: GET_ALL_PRIORITY, payload: data.content })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* followGetAllPriorityAction() {
    yield takeLatest(GET_ALL_PRIORITY_API, getAllPriorityAction)
}

function* getAllTaskTypesAction() {
    try {
        const { data, status } = yield call(() => projectService.getAllTaskTypes())
        if (status === 200) {
            yield put({ type: GET_ALL_TASK_TYPES, payload: data.content })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* followGetAllTaskTypesAction() {
    yield takeLatest(GET_ALL_TASK_TYPES_API, getAllTaskTypesAction)
}

function* createTaskAction(action) {
    try {
        const { data, status } = yield call(() => projectService.createTask(action.payload))
        if (status === 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Create task successfully!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
        }
    } catch (error) {
        console.log(error.response)
        yield put({ type: MESSAGE_APPEAR, payload: <p>{error.response.data.content}</p> })
        yield delay(2000)
        yield put({ type: MESSAGE_DISAPPEAR })
    }
}
export function* followCreateTaskAction() {
    yield takeLatest(CREATE_TASK_API, createTaskAction)
}
