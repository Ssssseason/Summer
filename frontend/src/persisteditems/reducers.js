import { LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from '../views/login/actions';
import { ROOT_URL } from '../config/config';

const initialState = {
    auth: undefined,
    // auth: undefined,
    avatar: undefined,
}

export const persistedItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return (Object.assign({}, state, {
                auth: undefined,
                avatar: undefined,
            }));
        case LOGIN_SUCCESS:
            return (Object.assign({}, state, {
                auth: action.auth,
                avatar: action.avatar,
            }))
        case LOGIN_FAILURE:
            return (Object.assign({}, state, {
                auth: undefined,
                avatar: undefined,
            }))
        default:
            return state;
    };
}