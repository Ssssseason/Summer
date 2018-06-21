import { SET_SETTING_STATE, WORDBOOK_REQ, WORDBOOK_SUCCESS, WORDBOOK_FAILURE } from "./actions";

const initialState = {
    wordbooks: undefined,
    isFetching: undefined,
    isEditing: undefined,
    error: undefined,
}

export const wordbookcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SETTING_STATE:
            return (Object.assign({}, state, {
                isEditing: action.isEditing,
            }))
        case WORDBOOK_REQ:
            return (Object.assign({}, state, {
                isFetching: true,
            }));
        case WORDBOOK_SUCCESS:
            return (Object.assign({}, state, {
                isFetching: false,
                wordbooks: action.wordbooks,
            }));
        case WORDBOOK_FAILURE:
            return (Object.assign({}, state, {
                isFetching: false,
                wordbooks: undefined,
                error: action.error,
            }));
        default:
            return state;
    };
}