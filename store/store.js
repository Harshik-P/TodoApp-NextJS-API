// import { configureStore, applyMiddleware, combineReducers } from 'redux'
import { tasksReducer } from './reducer'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { combineReducers, configureStore, } from '@reduxjs/toolkit';



const combinedReducer = combineReducers({
    allTasks: tasksReducer
})


const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            allTasks: {
                tasks: [...new Set([...action.payload.allTasks.tasks, ...state.allTasks.tasks])]
            }
        }
        return nextState
    }
    else {
        return combinedReducer(state, action);
    }
}

const store = () => {
    return configureStore({
        reducer: masterReducer,
    }
    );
}

export const wrapper = createWrapper(store, { debug: true })