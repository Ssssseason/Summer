import axios from 'axios';
import { ROOT_URL } from '../../config/config';
export const SET_ISRECITING = 'set_isreciting';
export const setIsReciting = (isReciting) => {
    return ({
        type: SET_ISRECITING,
        isReciting: isReciting,
    });
}


export const CHECK_REQ = 'check_req';
export const CHECK_SUCCESS = 'check_success';
export const CHECK_FAILURE = 'check_failure';
export const setCheckedRes = (checkedRes) => {
    return (dispatch, getState) => {
        const { isChecking } = getState().recitation;
        const { token } = getState().persisteditems.auth;
        if (isChecking)
            return;
        dispatch({ type: CHECK_REQ });

        const body = { 'checkedRes': checkedRes };

        axios.put(`${ROOT_URL}/api/recitation/rec_word`, body, {
            headers: {
                Authorization: 'JWT ' + token,
                // 'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                const { targetNum, incNum, doneNum } = response.data;
                dispatch({
                    type: CHECK_SUCCESS,
                    targetNum: response.data.targetNum,
                    incNum: response.data.incNum,
                    doneNum: response.data.doneNum,
                })
                if (doneNum < targetNum + incNum) {
                    if (doneNum < targetNum)
                        dispatch(getRecWord('recite'));
                    else
                        dispatch(getRecWord('review'));
                }
                else {
                    dispatch({
                        type: SET_ISRECITING,
                        isReciting: false,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: CHECK_FAILURE,
                    error: error,
                });
            })
    }
}

export const RECWORD_REQ = 'recword_req';
export const RECWORD_SUCCESS = 'recword_success';
export const RECWORD_FALIURE = 'recword_failure';
export const getRecWord = (type) => {
    return (dispatch, getState) => {

        const { isFetchingWords } = getState().recitation;
        const { token } = getState().persisteditems.auth;
        if (isFetchingWords)
            return;

        dispatch({ type: RECWORD_REQ });

        axios.get(`${ROOT_URL}/api/recitation/rec_word`, {
            headers: {
                Authorization: 'JWT ' + token,
            },
            params: {
                type: type,
            },
        })
            .then((response) => {
                dispatch({
                    type: RECWORD_SUCCESS,
                    words: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: RECWORD_FALIURE,
                    error: error,
                });
            })
    }
}

export const RECPLANNUM_REQ = 'recplannum_req';
export const RECPLANNUM_SUCCESS = 'recplannum_success';
export const RECPLANNUM_FAILURE = 'recplannum_failure';
export const getRecPlanNum = () => {
    return (dispatch, getState) => {
        const { isFetchingRecPlanNum } = getState().recitation;
        const { token } = getState().persisteditems.auth;

        if (isFetchingRecPlanNum)
            return;
        dispatch({ type: RECPLANNUM_REQ });

        axios.get(`${ROOT_URL}/api/recitation/rec_plan`, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                const { targetNum, incNum, doneNum } = response.data;
                dispatch({
                    type: RECPLANNUM_SUCCESS,
                    targetNum: response.data.targetNum,
                    incNum: response.data.incNum,
                    doneNum: response.data.doneNum,
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: RECPLANNUM_FAILURE, error: error });
            })
    }
}