import { SET_NAVBARVAL } from "./actions";
import { LOGIN_SUCCESS, LOGOUT } from "../login/actions";

const initialState = {
    test: true,
    navBarVal: false,
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAVBARVAL:
            return (Object.assign({}, state, {
                navBarVal: action.navBarVal,
            }));
        case LOGOUT:
            return initialState;
        case LOGIN_SUCCESS:
            return (Object.assign({}, state, {
                navBarVal: 0,
            }))
        default: return state;
    }

}