import { call, put, takeLatest, delay } from "redux-saga/effects"
import { projectService } from "../../../service/ProjectService";
import { MESSAGE_APPEAR, MESSAGE_DISAPPEAR } from "../../types/MessageTypes";
import { CREATE_PROJECT } from "../../types/ProjectType";
import { CREATE_PROJECT_API } from "../typesSaga/projectType";

function* createProjectAction(action) {
    const { data, status } = yield call(() => projectService.createProject(action.payload))
    if (status === 200) {
        yield put({ type: MESSAGE_APPEAR, payload: <p>Tạo tài project thành công!</p> })
        yield delay(2000)
        yield put({ type: MESSAGE_DISAPPEAR })
        yield put({ type: CREATE_PROJECT, payload: data.content })
    }
}
export function* followCreateProjectAction() {
    yield takeLatest(CREATE_PROJECT_API, createProjectAction)
}