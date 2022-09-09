import { userActionType } from '../actions/user'


const userInitialState = {
    user: undefined,
};


export const userReducer = (state = userInitialState, { type, payload }) => {
    switch (type) {
        case userActionType.SET_USER: {
            return { ...state, user: payload };
        }
        default:
            return state;
    }
}
