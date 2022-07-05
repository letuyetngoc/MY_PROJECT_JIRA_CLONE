import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import rootReducer from '../reducer/RootReducer'
import * as userSaga from './actionSaga/userActionSaga'
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
    ])
}