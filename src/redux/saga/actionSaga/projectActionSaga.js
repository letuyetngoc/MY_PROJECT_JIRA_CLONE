import { type } from "@testing-library/user-event/dist/type";
import { call, put, takeLatest, delay, select } from "redux-saga/effects"
import ProjectEdit from "../../../page/ProjecManagement/ProjectEdit";
import { projectService } from "../../../service/ProjectService";
import { MESSAGE_ALERT_APPEAR, MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../../types/MessageTypes";
import { APPEAR_MODAL, HIDE_MODAL } from "../../types/PopupModalTypes";
import { CREATE_PROJECT, GET_ALL_PRIORITY, GET_ALL_PROJECT, GET_ALL_PROJECT_INITIAL, GET_ALL_STATUS, GET_ALL_TASK_TYPES, GET_PROJECT_DETAIL } from "../../types/ProjectType";
import { CREATE_PROJECT_API, CREATE_TASK_API, DELETE_PROJECT_API, GET_ALL_PRIORITY_API, GET_ALL_PROJECT_API, GET_ALL_STATUS_API, GET_ALL_TASK_TYPES_API, GET_PROJECT_DETAIL_API, UPDATE_PROJECT_API } from "../typesSaga/projectType";

function* createProjectAction(action) {
    try {
        const { data, status } = yield call(() => projectService.createProject(action.payload))
        if (status === 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Tạo project thành công!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
            yield put({ type: CREATE_PROJECT, payload: data.content })
            yield put({ type: GET_ALL_PROJECT_API })
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
            yield put({ type: GET_ALL_PROJECT_INITIAL, payload: data.content })
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

function* getProjectDetail(action) {
    try {
        const result = yield call(() => projectService.getProjectDetail(action.payload))
        yield put({ type: GET_PROJECT_DETAIL, payload: result.data.content })
        yield put({ type: APPEAR_MODAL, payload: <ProjectEdit /> })
    } catch (error) {
        console.log('error', error)
    }
}
export function* followGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL_API, getProjectDetail)
}
function* updateProjectAction(action) {
    try {
        const { status } = yield call(() => projectService.updateProject(action.payload.id, action.payload))
        if (status === 200) {
            yield put({ type: GET_ALL_PROJECT_API })
            yield put({ type: HIDE_MODAL })
            yield put({ type: MESSAGE_APPEAR, payload: <p>Cập nhật thành công!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
        }
    } catch (error) {
        console.log('error', error)
    }
}
export function* followUpdateProjectAction() {
    yield takeLatest(UPDATE_PROJECT_API, updateProjectAction)
}

function* deleteProjectAction(action) {
    try {
        const { status, data } = yield call(() => projectService.deleteProject(action.payload))
        if (status === 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Delete Project Sucessfully</p> })
            yield put({ type: GET_ALL_PROJECT_API })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
        }
    } catch (error) {
        console.log('error', error)
    }
}
export function* followDeleteProjectAction() {
    yield takeLatest(DELETE_PROJECT_API, deleteProjectAction)
}