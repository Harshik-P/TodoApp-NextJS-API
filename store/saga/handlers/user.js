import { call, put, takeLatest } from 'redux-saga/effects';
import { setUserAction } from '../../actions/user';
import { getUser } from '../requests/user';
import { userActionType } from '../../actions/user';

function* handleGetUser(action) {
    try {
        const response = yield call(getUser, action.payload);
        const token = response.token;
        yield put(setUserAction(token));
    } catch (error) {
        console.log(error);
    }
}

export function* userSaga() {
    yield takeLatest(userActionType.GET_USER, handleGetUser);
}