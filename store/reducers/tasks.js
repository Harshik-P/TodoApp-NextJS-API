import { tasksActionsType } from '../actions/tasks'


const taskInitialState = {
    tasks: [{}],
};


export const tasksReducer = (state = taskInitialState, { type, payload }) => {
    switch (type) {
        case tasksActionsType.SET_ADD_TASKS: {
            return { ...state, tasks: [...state.tasks, payload] };
        }
        case tasksActionsType.SET_DELETE_TASKS: {
            const data = state.tasks.filter((each) => each._id !== payload._id);
            return { ...state, tasks: data };
        }
        case tasksActionsType.SET_TOGGLE_TASKS: {
            const data = state.tasks.map(item => item._id === payload._id ? { ...item, completed: !item.completed } : item);
            return { ...state, tasks: data };
        }
        case tasksActionsType.SET_TASKS: {
            return { ...state, tasks: payload };
        }
        default:
            return state;
    }
}
