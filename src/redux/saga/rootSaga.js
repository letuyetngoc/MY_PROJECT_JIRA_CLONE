import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import rootReducer from '../reducer/RootReducer'
import * as userSaga from './actionSaga/userActionSaga'
import * as projectCategory from './actionSaga/projectCategorySaga'
import * as project from './actionSaga/projectActionSaga'
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
        projectCategory.followProjectCategory(),
        project.followCreateProjectAction(),
        project.followGetAllProjectAction(),
        project.followGetAllStatus(),
        project.followGetAllPriorityAction(),
        project.followGetAllTaskTypesAction(),
        project.followCreateTaskAction(),
    ])
}