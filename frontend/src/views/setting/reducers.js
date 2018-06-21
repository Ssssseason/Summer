import { SET_TARGETNUM_REQ, SET_TARGETNUM_SUCCESS, SET_TARGETNUM_FAILURE, GET_TARGETNUM_REQ, GET_TARGETNUM_SUCCESS, GET_TARGETNUM_FAILURE, SET_WORDBOOK_REQ, SET_WORDBOOK_SUCCESS, SET_WORDBOOK_FAILURE, GET_WORDBOOK_SUCCESS, GET_WORDBOOK_REQ, GET_WORDBOOK_FAILURE } from "./action";

const initialState = {
    currentTargetNum: 15,
    currentWordBook: undefined,
    isFetchingTargetNum: false,
    isFetchingWordBook: false,
    isPosting: false,
    error: undefined,
};

export const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TARGETNUM_REQ:
            return (Object.assign({}, state, {
                isPosting: true,
            }));
        case SET_TARGETNUM_SUCCESS:
            return (Object.assign({}, state, {
                isPosting: false,
            }));
        case SET_TARGETNUM_FAILURE:
            return (Object.assign({}, state, {
                isPosting: false,
                error: action.error,
            }));
        case GET_TARGETNUM_REQ:
            return (Object.assign({}, state, {
                isFetchingTargetNum: true,
            }));
        case GET_TARGETNUM_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingTargetNum: false,
                currentTargetNum: action.currentTargetNum,
            }));
        case GET_TARGETNUM_FAILURE:
            return (Object.assign({}, state, {
                isFetchingTargetNum: false,
                currentTargetNum: undefined,
                error: action.error,
            }));
        case SET_WORDBOOK_REQ:
            return (Object.assign({}, state, {
                isPosting: true,
            }));
        case SET_WORDBOOK_SUCCESS:
            return (Object.assign({}, state, {
                isPosting: false,
            }));
        case SET_WORDBOOK_FAILURE:
            return (Object.assign({}, state, {
                isPosting: false,
            }));
        case GET_WORDBOOK_REQ:
            return (Object.assign({}, state, {
                isFetchingWordBook: true,
            }))
        case GET_WORDBOOK_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingWordBook: false,
                currentWordBook: action.currentWordBook,
            }))
        case GET_WORDBOOK_FAILURE:
            return (Object.assign({}, state, {
                isFetchingWordBook: false,
                currentWordBook: undefined,
                error: action.error,
            }))
        default:
            return state;
    };
}