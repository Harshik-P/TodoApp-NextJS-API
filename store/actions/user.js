export const userActionType = {
    GET_USER: "GET_USER",
    SET_USER: "SET_USER",
}

export const getUserAction = (userData) => {
    return { type: userActionType.GET_USER, payload: userData };
};

export const setUserAction = (userToken) => {
    return { type: userActionType.SET_USER, payload: userToken };
};