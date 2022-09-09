import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { setAddTasks, setDeleteTasks, setTasks, setToggleTasks } from '../../actions/tasks';
import { addTasks, deleteTasks, getAllTasks, toggleTasks } from '../requests/tasks';
import { tasksActionsType } from '../../actions/tasks';

function* handleGetTasks(action) {
    try {
        const response = yield call(getAllTasks, action.payload);
        yield put(setTasks(response));
    } catch (error) {
        console.log(error);
    }
}

function* handleAddTasks(action) {
    try {
        const response = yield call(addTasks, action.payload);
        yield put(setAddTasks(response));
    } catch (error) {
        console.log(error);
    }
}

function* handleDeleteTasks(action) {
    try {
        const response = yield call(deleteTasks, action.payload);
        yield put(setDeleteTasks(response));
    } catch (error) {
        console.log(error);
    }
}

function* handleToggleTasks(action) {
    try {
        const response = yield call(toggleTasks, action.payload);
        yield put(setToggleTasks(response));
    } catch (error) {
        console.log(error);
    }
}

export function* getTasksSaga() {
    yield takeEvery(tasksActionsType.GET_TASKS, handleGetTasks);
}
export function* addTasksSaga() {
    yield takeLatest(tasksActionsType.GET_ADD_TASKS, handleAddTasks);
}
export function* toggleTasksSaga() {
    yield takeLatest(tasksActionsType.GET_TOGGLE_TASKS, handleToggleTasks);
}
export function* deleteTasksSaga() {
    yield takeLatest(tasksActionsType.GET_DELETE_TASKS, handleDeleteTasks);
}