import { GET_EXAM_REQ, GET_EXAM_SUCCESS, GET_EXAM_FAILURE, POST_EXAM_REQ, POST_EXAM_SUCCESS, POST_EXAM_FAILURE, SET_EXAM_STATE, SET_SHOW_QUERES, SET_EXAM_FINISHED } from "./actions";
import { GET_WORDBOOK_FAILURE } from "../setting/action";

const initialState = {
    isFetching: false,
    error: undefined,
    questions: undefined,
    isPosting: false,
    isExaming: false,
    showQueRes: false,
    hasFinished: false,
    dialogContent: undefined,
}

export const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXAM_REQ:
            return (Object.assign({}, state, {
                isFetching: true,
            }));
        case GET_EXAM_SUCCESS:
            return (Object.assign({}, state, {
                isFetching: false,
                questions: action.questions,
            }));
        case GET_EXAM_FAILURE:
            return (Object.assign({}, state, {
                isFetching: false,
                questions: undefined,
                error: action.error,
                hasFinished: true,
                dialogContent: "获取考试单词失败",
            }));
        case POST_EXAM_REQ:
            return (Object.assign({}, state, {
                isPosting: true,
            }));
        case POST_EXAM_SUCCESS:
            return (Object.assign({}, state, {
                isPosting: false,
            }));
        case POST_EXAM_FAILURE:
            return (Object.assign({}, state, {
                isPosting: false,
                hasFinished: true,
                dialogContent: "发送考试结果失败",
            }));
        case SET_EXAM_STATE:
            return (Object.assign({}, state, {
                isExaming: action.isExaming,
            }));
        case SET_SHOW_QUERES:
            return (Object.assign({}, state, {
                showQueRes: action.showQueRes,
            }));
        case SET_EXAM_FINISHED:
            return (Object.assign({}, state, {
                hasFinished: action.hasFinished,
            }));
        case GET_WORDBOOK_FAILURE:
            return (Object.assign({}, state, {
                hasFinished: true,
                dialogContent: "获取当前单词书进度失败",
            }));

        default: return state;
    };
}