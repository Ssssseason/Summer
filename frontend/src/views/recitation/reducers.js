import { SET_ISRECITING, CHECK_REQ, CHECK_SUCCESS, CHECK_FAILURE, RECWORD_SUCCESS, RECWORD_FALIURE, RECPLANNUM_REQ, RECPLANNUM_SUCCESS, RECPLANNUM_FAILURE, RECWORD_REQ } from "./actions";
import { LOGOUT } from "../login/actions";

const initialState = {
    targetNum: undefined,
    incNum: undefined,
    doneNum: undefined,
    words: undefined,
    isFetchingRecPlanNum: false,
    isReciting: false,
    isFetchingWords: false,
    isChecking: false,
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
            }))
        case LOGOUT:
            return initialState;
        default:
            return state;
    };
}