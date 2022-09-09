// import { configureStore, applyMiddleware, combineReducers } from 'redux'
import { tasksReducer } from './reducers/tasks'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { watcherSaga } from './saga/rootSaga';
import { userReducer } from './reducers/user';
import { applyMiddleware } from 'redux';


const combinedReducer = combineReducers({
    allTasks: tasksReducer,
    userDet: userReducer,
})


const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            allTasks: {
                tasks: [...new Set([...action.payload.allTasks.tasks, ...state.allTasks.tasks])]
            },
            userDet: {
                // user: [...new Set([...action.payload.userDet.user, ...state.userDet.user])]
                user: action.payload.user,
            }
        }
        return nextState
    }
    else {
        return combinedReducer(state, action);
    }
}

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = () => {
    const store_creation = configureStore({
        reducer: masterReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }).concat(...middleware),
    });
    sagaMiddleware.run(watcherSaga);
    return store_creation;
}


export const wrapper = createWrapper(store, { debug: true })