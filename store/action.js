export const tasksActionsType = {
    GET_TASKS: "GETTASKS",
    ADD_TASKS: "ADDTASKS",
    DELETE_TASKS: "DELETETASKS",
    TOGGLE_TASKS: "TOGGLETASKS",
};

export const getTasks = (tasks) => {
    return { type: tasksActionsType.GET_TASKS, payload: tasks };
};

export const addTasks = (task) => {
    return { type: tasksActionsType.ADD_TASKS, payload: task };
};

export const deleteTasks = (task) => {
    return { type: tasksActionsType.DELETE_TASKS, payload: task };
};

export const toggleTasks = (task) => {
    return { type: tasksActionsType.TOGGLE_TASKS, payload: task };
};