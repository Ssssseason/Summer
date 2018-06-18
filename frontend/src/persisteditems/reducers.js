import { LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from '../views/login/actions';

const initialState = {
    auth: { 'token': "" },
    // auth: undefined,
    avatar: "https://api.adorable.io/avatars/144/userpic.png",
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