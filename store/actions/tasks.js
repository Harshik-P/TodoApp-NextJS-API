export const tasksActionsType = {
    GET_TASKS: "GET_TASKS",
    SET_TASKS: "SET_TASKS",
    GET_ADD_TASKS: "GET_ADD_TASKS",
    SET_ADD_TASKS: "SET_ADD_TASKS",
    GET_DELETE_TASKS: "GET_DELETE_TASKS",
    SET_DELETE_TASKS: "SET_DELETE_TASKS",
    GET_TOGGLE_TASKS: "GET_TOGGLE_TASKS",
    SET_TOGGLE_TASKS: "SET_TOGGLE_TASKS",
};

export const getTasks = (tasks) => {
    return { type: tasksActionsType.GET_TASKS, payload: tasks };
};

export const setTasks = (tasks) => {
    return { type: tasksActionsType.SET_TASKS, payload: tasks };
};

export const getAddTasks = (task) => {
    return { type: tasksActionsType.GET_ADD_TASKS, payload: task };
};

export const setAddTasks = (task) => {
    return { type: tasksActionsType.SET_ADD_TASKS, payload: task };
};

export const getDeleteTasks = (task) => {
    return { type: tasksActionsType.GET_DELETE_TASKS, payload: task };
};

export const setDeleteTasks = (task) => {
    return { type: tasksActionsType.SET_DELETE_TASKS, payload: task };
};

export const getToggleTasks = (task) => {
    return { type: tasksActionsType.GET_TOGGLE_TASKS, payload: task };
};

export const setToggleTasks = (task) => {
    return { type: tasksActionsType.SET_TOGGLE_TASKS, payload: task };
};