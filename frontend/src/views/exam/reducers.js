import { GET_EXAM_REQ, GET_EXAM_SUCCESS, GET_EXAM_FAILURE, POST_EXAM_REQ, POST_EXAM_SUCCESS, POST_EXAM_FAILURE, SET_EXAM_STATE, SET_SHOW_QUERES } from "./actions";

const initialState = {
    isFetching: false,
    error: undefined,
    questions: undefined,
    isPosting: false,
    isExaming: false,
    showQueRes: false,
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
            }));
        case SET_EXAM_STATE:
            return (Object.assign({}, state, {
                isExaming: action.isExaming,
            }));
        case SET_SHOW_QUERES:
            return (Object.assign({}, state, {
                showQueRes: action.showQueRes,
            }));
        default: return state;
    };
}