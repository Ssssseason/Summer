import { SwipeableDrawer } from "@material-ui/core";
import { LOGIN_REQ, LOGIN_SUCCESS, LOGIN_FAILURE, REG_REQ, REG_SUCCESS, REG_FAILURE } from "./actions";

const initialState = {
    isLogining: false,
    isRegistering: false,
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
            }))
        case LOGIN_FAILURE:
            return (Object.assign({}, state, {
                isLogining: false,
            }))
        case REG_REQ:
            return (Object.assign({}, state, {
                isRegistering: true,
            }));
        case REG_SUCCESS:
            return (Object.assign({}, state, {
                isRegistering: false,
            }));
        case REG_FAILURE:
            return (Object.assign({}, state, {
                isRegistering: false,
                error: action.error,
            }))
        default:
            return state;
    }
}