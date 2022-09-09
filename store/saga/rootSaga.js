import { all, fork } from "redux-saga/effects";
import * as tasksSagas from '../saga/handlers/tasks'
import * as userSagas from '../saga/handlers/user'



export function* watcherSaga() {
    yield all(
        [...Object.values(userSagas), ...Object.values(tasksSagas)].map(fork)
    )
}