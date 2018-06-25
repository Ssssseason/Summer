import { GET_UD_REQ, GET_UD_SUCCESS, GET_UD_FAILURE, SET_UD_EDITING, POST_UD_REQ, POST_UD_SUCCESS, POST_UD_FAILURE, PUT_UD_FAILURE, PUT_UD_SUCCESS, PUT_UD_REQ, DEL_UD_REQ, DEL_UD_SUCCESS, DEL_UD_FAILURE, SET_UD_HASFINISHED } from "./actions";

const initialState = {
    isFetching: false,
    words: undefined,
    error: undefined,
    isEditing: false,
    isPosting: false,
    isPutting: false,
    isDeling: false,
    hasFinished: false,
    dialogContent: undefined,
}

export const userdefinedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UD_EDITING:
            return (Object.assign({}, state, {
                isEditing: action.isEditing,
            }));
        case GET_UD_REQ:
            return (Object.assign({}, state, {
                isFetching: true,
            }));
        case GET_UD_SUCCESS:
            return (Object.assign({}, state, {
                isFetching: false,
                words: action.words,
            }));
        case GET_UD_FAILURE:
            return (Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                words: undefined,
            }));
        case POST_UD_REQ:
            return (Object.assign({}, state, {
                isPosting: true,
            }));
        case POST_UD_SUCCESS:
            return (Object.assign({}, state, {
                isPosting: false,
                hasFinished: true,
                dialogContent: "创建成功",
            }));
        case POST_UD_FAILURE:
            return (Object.assign({}, state, {
                isPosting: false,
                error: action.error,
                hasFinished: true,
                dialogContent: "创建失败",
            }));
        case PUT_UD_REQ:
            return (Object.assign({}, state, {
                isPutting: true,
            }));
        case PUT_UD_SUCCESS:
            return (Object.assign({}, state, {
                isPutting: false,
                hasFinished: true,
                dialogContent: "编辑成功",
            }));
        case PUT_UD_FAILURE:
            return (Object.assign({}, state, {
                isPutting: false,
                error: action.error,
                hasFinished: true,
                dialogContent: "编辑失败",
            }));
        case DEL_UD_REQ:
            return (Object.assign({}, state, {
                isDeling: true,
            }));
        case DEL_UD_SUCCESS:
            return (Object.assign({}, state, {
                hasFinished: true,
                dialogContent: "删除成功",
                isDeling: false,
            }));
        case DEL_UD_FAILURE:
            return (Object.assign({}, state, {
                isDeling: false,
                error: action.error,
                hasFinished: true,
                dialogContent: "删除失败",
            }));
        case SET_UD_HASFINISHED:
            return (Object.assign({}, state, {
                hasFinished: action.hasFinished,
                dialogContent: undefined,
            }));
        default: return state;
    };
}