import { call, put, takeLatest, delay } from "redux-saga/effects"
import { projectCategoryService } from "../../../service/ProjectCategoryService"
import { GET_PROJECT_CATEGORY } from "../../types/ProjectCategoryTypes"
import { PROJECT_CATEGORY_API } from "../typesSaga/projectCategoryTypes"

function* projectCategory() {
    try {
        const result = yield call(() => projectCategoryService.projectCategory())
        yield put({ type: GET_PROJECT_CATEGORY, payload: result.data.content })
    } catch (error) {
        console.log('error', error)
    }
}
export function* followProjectCategory() {
    yield takeLatest(PROJECT_CATEGORY_API, projectCategory)
}