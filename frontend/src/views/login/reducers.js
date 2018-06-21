import { SwipeableDrawer } from "@material-ui/core";
import { LOGIN_REQ, LOGIN_SUCCESS, LOGIN_FAILURE, REG_REQ, REG_SUCCESS, REG_FAILURE, SET_HASFINISHED } from "./actions";

const initialState = {
    isLogining: false,
    isRegistering: false,
    hasFinished: false,
    registerMsg: undefined,
    error: undefined,
}


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQ:
            return (Object.assign({}, state, {
                isLogining: true,
            }))
        case LOGIN_SUCCESS:
            return (Object.assign({}, state, {
                isLogining: false,
                error: undefined,
            }))
        case LOGIN_FAILURE:
            return (Object.assign({}, state, {
                isLogining: false,
                hasFinished: true,
                error: action.error,
            }))
        case REG_REQ:
            return (Object.assign({}, state, {
                isRegistering: true,
            }));
        case REG_SUCCESS:
            return (Object.assign({}, state, {
                isRegistering: false,
                // hasFinished: true,
                error: undefined,
            }));
        case REG_FAILURE:
            return (Object.assign({}, state, {
                isRegistering: false,
                hasFinished: true,
                error: action.error,
            }));
        case SET_HASFINISHED:
            return (Object.assign({}, state, {
                hasFinished: action.hasFinished,
            }));
        default:
            return state;
    }
}