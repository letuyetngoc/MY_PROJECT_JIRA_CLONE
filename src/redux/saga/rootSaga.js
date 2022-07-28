import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import rootReducer from '../reducer/RootReducer'
import * as userSaga from './actionSaga/userActionSaga'
import * as projectCategory from './actionSaga/projectCategorySaga'
import * as project from './actionSaga/projectActionSaga'
import * as comment from './actionSaga/commentAction'
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
export const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)

function* rootSaga() {
    yield all([
        userSaga.folowSignIn(),
        userSaga.followSignUp(),
        userSaga.followGetUserAction(),
        userSaga.followDeleteUserAction(),
        userSaga.followEditUserAction(),
        userSaga.followGetUserByProjectIdAction(),
        projectCategory.followProjectCategory(),
        project.followCreateProjectAction(),
        project.followGetAllProjectAction(),
        project.followGetAllStatus(),
        project.followGetAllPriorityAction(),
        project.followGetAllTaskTypesAction(),
        project.followCreateTaskAction(),
        project.followGetProjectDetail(),
        project.followUpdateProjectAction(),
        project.followDeleteProjectAction(),
        project.followGetProjectDetailBoard(),
        project.followAssignUserProjectAction(),
        project.followRemoveUserFromProjectAction(),
        project.followUpdateStatusAction(),
        project.followGetTaskDetailAction(),
        project.followAssignUserTaskAction(),
        project.followUpdateTaskAction(),
        project.followRemoveTaskAction(),
        comment.followInsertCommentAction(),
        comment.followGetAllCommentAction(),
        comment.followDeleteCommentAction(),
        comment.followUpdateCommentAction(),
    ])
}