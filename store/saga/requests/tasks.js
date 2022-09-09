export const getAllTasks = async (userJWT) => {
    const data = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJWT}`,
        },
    });
    const jsonData = await data.json();
    return jsonData;
}


export const addTasks = async ({ userJWT, todoItem }) => {
    const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJWT}`,
        },
        body: JSON.stringify({ description: todoItem, completed: false }),
    });
    const jsonData = await res.json();
    console.log("adding tasks", jsonData)
    return jsonData;
}

export const deleteTasks = async ({ userJWT, id }) => {
    const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJWT}`,
        },
    });
    const jsonData = await res.json();
    return jsonData;
}


export const toggleTasks = async ({ userJWT, id, completed }) => {
    const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/tasks/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJWT}`,
        },
        body: JSON.stringify({ completed: !completed }),
    });
    const jsonData = await res.json();
    return jsonData;
}