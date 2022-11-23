import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_CURRENT_USER_FAIL,
    LOGOUT,
} from '../actions/types';

const initialStates = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: true,
    currentUser: null,
};

export const authReducer = (state = initialStates, action) => {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case LOAD_CURRENT_USER_SUCCESS:
            return {
                ...state,
                isLoading: payload.isLoading,
                currentUser: payload.currentUser,
                isAuthenticated: payload.isAuthenticated,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoading: false,
            };

        case REGISTER_FAIL:
        case LOAD_CURRENT_USER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            console.log('👉 Logout user');
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
};
