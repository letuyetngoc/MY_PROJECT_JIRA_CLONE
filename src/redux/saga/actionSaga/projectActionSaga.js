import { call, put, takeLatest, delay } from "redux-saga/effects"
import ProjectEdit from "../../../page/ProjecManagement/ProjectEdit";
import TaskDetail from "../../../page/TaskDetail/TaskDetail";
import { projectService } from "../../../service/ProjectService";
import { APPEAR_SMALL_LOADING, HIDE_SMALL_LOADING } from "../../types/LoadingTypes";
import { MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../../types/MessageTypes";
import { APPEAR_MODAL, HIDE_MODAL } from "../../types/PopupModalTypes";
import { CREATE_PROJECT, GET_ALL_PRIORITY, GET_ALL_PROJECT, GET_ALL_PROJECT_INITIAL, GET_ALL_STATUS, GET_ALL_TASK_TYPES, GET_PROJECT_DETAIL } from "../../types/ProjectType";
import { ASSIGN_USER_PROJECT_API, ASSIGN_USER_TASK_API, CREATE_PROJECT_API, CREATE_TASK_API, DELETE_PROJECT_API, GET_ALL_PRIORITY_API, GET_ALL_PROJECT_API, GET_ALL_STATUS_API, GET_ALL_TASK_TYPES_API, GET_PROJECT_DETAIL_API, GET_PROJECT_DETAIL_BOARD_API, GET_TASK_DETAIL_API, REMOVE_TASK_API, REMOVE_USER_FROM_TASK_API, REMOVE_USER_PROJECT_API, UPDATE_PROJECT_API, UPDATE_STATUS_API, UPDATE_TASK_API } from "../typesSaga/projectType";

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
        yield put({ type: APPEAR_SMALL_LOADING })
        const { data, status } = yield call(() => projectService.getAllProject())
        yield put({ type: HIDE_SMALL_LOADING })
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

function* getProjectDetailBoard(action) {
    try {
        const result = yield call(() => projectService.getProjectDetail(action.payload))
        yield put({ type: GET_PROJECT_DETAIL, payload: result.data.content })
    } catch (error) {
        console.log('error', error)
    }

}
export function* followGetProjectDetailBoard() {
    yield takeLatest(GET_PROJECT_DETAIL_BOARD_API, getProjectDetailBoard)
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
            yield delay(2000)
            yield put({ type: GET_ALL_PROJECT_API })
            yield put({ type: MESSAGE_DISAPPEAR })
        }
    } catch (error) {
        console.log('error', error)
    }
}
export function* followDeleteProjectAction() {
    yield takeLatest(DELETE_PROJECT_API, deleteProjectAction)
}

function* assignUserProjectAction(action) {
    try {
        const { data, status } = yield call(() => projectService.assignUserProject(action.payload))
        if (status === 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Add user sucessfully!</p> })
            yield delay(1000)
            yield put({ type: MESSAGE_DISAPPEAR })
            yield put({ type: GET_ALL_PROJECT_API })
        }
    } catch (error) {
        console.log('error', error)
        yield put({ type: MESSAGE_APPEAR, payload: <p>User is unthorization!</p> })
        yield delay(1000)
        yield put({ type: MESSAGE_DISAPPEAR })
    }
}
export function* followAssignUserProjectAction() {
    yield takeLatest(ASSIGN_USER_PROJECT_API, assignUserProjectAction)
}

function* removeUserFromProjectAction(action) {
    try {
        const result = yield call(() => projectService.removeUserFromProject(action.payload))
        yield put({ type: MESSAGE_APPEAR, payload: <p>Remove user from project successfully!</p> })
        yield delay(1000)
        yield put({ type: MESSAGE_DISAPPEAR })
        yield put({ type: GET_ALL_PROJECT_API })

    } catch (error) {
        console.log('error', error)
        yield put({ type: MESSAGE_APPEAR, payload: <p>User is unthorization!</p> })
        yield delay(1000)
        yield put({ type: MESSAGE_DISAPPEAR })
    }
}
export function* followRemoveUserFromProjectAction() {
    yield takeLatest(REMOVE_USER_PROJECT_API, removeUserFromProjectAction)
}

function* updateStatusAction(action) {
    try {
        const result = yield call(() => projectService.updateStatus(action.payload))
        console.log('result', result)
        yield put({ type: MESSAGE_APPEAR, payload: <p>Update task successfully!</p> })
        yield delay(1000)
        yield put({ type: MESSAGE_DISAPPEAR })
    } catch (error) {
        console.log('error', error)
        // yield put({ type: MESSAGE_APPEAR, payload: <p>User is unthorization!</p> })
        // yield delay(1000)
        // yield put({ type: MESSAGE_DISAPPEAR })
    }
}
export function* followUpdateStatusAction() {
    yield takeLatest(UPDATE_STATUS_API, updateStatusAction)
}

function* getTaskDetailAction(action) {
    try {
        const result = yield call(() => projectService.getTaskDetail(action.payload))
        yield put({ type: APPEAR_MODAL, payload: <TaskDetail taskDetail={result.data.content} /> })
    } catch (error) {
        console.log('error', error)
    }
}
export function* followGetTaskDetailAction() {
    yield takeLatest(GET_TASK_DETAIL_API, getTaskDetailAction)
}

function* assignUserTaskAction(action) {
    console.log('action', action.payload.taskId)
    try {
        const { data, status } = yield call(() => projectService.assignUserTask(action.payload))
        console.log('data', data)
        if (status === 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Add user to task successfully!</p> })
            yield delay(1000)
            yield put({ type: MESSAGE_DISAPPEAR })
            yield put({ type: GET_TASK_DETAIL_API, payload: action.payload.taskId })
        }
    } catch (error) {
        console.log('error', error)
        yield put({ type: MESSAGE_APPEAR, payload: <p>User is unthorization!</p> })
        yield delay(1000)
        yield put({ type: MESSAGE_DISAPPEAR })
    }
}
export function* followAssignUserTaskAction() {
    yield takeLatest(ASSIGN_USER_TASK_API, assignUserTaskAction)
}

function* removeUserFromTaskAction(action) {
    try {
        const result = yield call(() => projectService.removeUserFromTask(action.payload))
        console.log('result', result)
    } catch (error) {
        console.log('error', error)
    }
}
export function* followRemoveUserFromTaskAction() {
    yield takeLatest(REMOVE_USER_FROM_TASK_API, removeUserFromTaskAction)
}

function* updateTaskAction(action) {
    try {
        const { data, status } = yield call(() => projectService.updateTask(action.payload))
        if (status == 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Update task successfully!</p> })
            yield delay(2000)
            yield put({ type: MESSAGE_DISAPPEAR })
            yield put({ type: HIDE_MODAL })
            yield put({ type: GET_PROJECT_DETAIL_BOARD_API, payload: action.payload.projectId })
        }

    } catch (error) {
        console.log('error', error)
    }
}
export function* followUpdateTaskAction() {
    yield takeLatest(UPDATE_TASK_API, updateTaskAction)
}

function* removeTaskAction(action) {
    try {
        const { data, status } = yield call(() => projectService.removeTask(action.payload.taskId))
        // console.log('result', result)
        if (status == 200) {
            yield put({ type: MESSAGE_APPEAR, payload: <p>Delete task successfully!</p> })
            yield delay(1000)
            yield put({ type: MESSAGE_DISAPPEAR })
            yield put({ type: HIDE_MODAL })
            yield put({ type: GET_PROJECT_DETAIL_BOARD_API, payload: action.payload.projectId })
        }
    } catch (error) {
        console.log('error', error)
    }
}
export function* followRemoveTaskAction() {
    yield takeLatest(REMOVE_TASK_API, removeTaskAction)
}