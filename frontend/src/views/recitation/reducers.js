import { SET_ISRECITING, CHECK_REQ, CHECK_SUCCESS, CHECK_FAILURE, RECWORD_SUCCESS, RECWORD_FALIURE, RECPLANNUM_REQ, RECPLANNUM_SUCCESS, RECPLANNUM_FAILURE, RECWORD_REQ } from "./actions";
import { LOGOUT } from "../login/actions";
import { SET_REC_FINISHED } from "../main/actions";

const initialState = {
    targetNum: undefined,
    incNum: undefined,
    doneNum: undefined,
    words: undefined,
    isFetchingRecPlanNum: false,
    isReciting: false,
    isFetchingWords: false,
    isChecking: false,
    hasFinished: false,
    dialogContent: undefined,
}


export const recitationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ISRECITING:
            return (Object.assign({}, state, {
                isReciting: action.isReciting,
            }))
        case CHECK_REQ:
            return (Object.assign({}, state, {
                isChecking: true,
            }));
        case CHECK_SUCCESS:
            return (Object.assign({}, state, {
                isChecking: false,
                targetNum: action.targetNum,
                incNum: action.incNum,
                doneNum: action.doneNum,
                words: undefined,
            }));
        case CHECK_FAILURE:
            return (Object.assign({}, state, {
                isChecking: false,
                targetNum: undefined,
                incNum: undefined,
                doneNum: undefined,
                error: action.error,
                hasFinished: true,
                dialogContent: "发送背诵结果失败",
            }));
        case RECWORD_REQ:
            return (Object.assign({}, state, {
                isFetchingWords: true,
            }));
        case RECWORD_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingWords: false,
                words: action.words,
            }));
        case RECWORD_FALIURE:
            return (Object.assign({}, state, {
                isFetchingWords: false,
                words: undefined,
                error: action.error,
                hasFinished: true,
                dialogContent: "获取单词列表失败",
            }));
        case RECPLANNUM_REQ:
            return (Object.assign({}, state, {
                isFetchingRecPlanNum: true,
            }));
        case RECPLANNUM_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingRecPlanNum: false,
                targetNum: action.targetNum,
                incNum: action.incNum,
                doneNum: action.doneNum,
            }));
        case RECPLANNUM_FAILURE:
            return (Object.assign({}, state, {
                isFetchingRecPlanNum: false,
                targetNum: undefined,
                incNum: undefined,
                doneNum: undefined,
                error: action.error,
                hasFinished: true,
                dialogContent: "获取今日进度失败",
            }))
        case SET_REC_FINISHED:
            return (Object.assign({}, state, {
                hasFinished: action.hasFinished,
            }));
        case LOGOUT:
            return initialState;
        default:
            return state;
    };
}