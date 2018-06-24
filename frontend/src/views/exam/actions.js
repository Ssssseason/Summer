import axios from 'axios';
import { ROOT_URL } from '../../config/config';

export const GET_EXAM_REQ = 'get_exam_req';
export const GET_EXAM_SUCCESS = 'get_exam_success';
export const GET_EXAM_FAILURE = 'get_exam_failure';

export const getExam = () => {
    return (dispatch, getState) => {
        const { isFetching } = getState().exam;
        const { token } = getState().persisteditems.auth;
        if (isFetching)
            return;
        dispatch({ type: GET_EXAM_REQ });
        axios.get(`${ROOT_URL}/api/recitation/exam`, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_EXAM_SUCCESS,
                    questions: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: GET_EXAM_FAILURE,
                    error: error,
                });
            })
    }
}

export const POST_EXAM_REQ = 'post_exam_req';
export const POST_EXAM_SUCCESS = 'post_exam_success';
export const POST_EXAM_FAILURE = 'post_exam_failure';
export const postExam = (examRes) => {
    return (dispatch, getState) => {
        const { isPosting } = getState().exam;
        const { token } = getState().persisteditems.auth;
        if (isPosting)
            return;
        dispatch({ type: POST_EXAM_REQ });
        const body = { examRes };
        axios.post(`${ROOT_URL}/api/recitation/exam`, body, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({ type: POST_EXAM_SUCCESS });
            })
            .then((error) => {
                console.log(error);
                dispatch({ type: POST_EXAM_FAILURE });
            })
    }
}

export const SET_EXAM_STATE = "set_exam_state";
export const setExamState = (isExaming) => {
    return ({
        type: SET_EXAM_STATE,
        isExaming: isExaming,
    });
}

export const SET_SHOW_QUERES = 'set_show_queres';
export const setShowQueRes = (showQueRes) => {
    return ({
        type: SET_SHOW_QUERES,
        showExamRes: showQueRes,
    });
}