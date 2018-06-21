import axios from 'axios';
import { ROOT_URL } from '../../config/config';

export const SET_TARGETNUM_REQ = 'set_targetnum_req';
export const SET_TARGETNUM_SUCCESS = 'set_targetnum_success';
export const SET_TARGETNUM_FAILURE = 'set_targetnum_failure';

export const setTargetNum = (targetNum) => {
    return (dispatch, getState) => {
        const { isPosting } = getState().setting;
        const { token } = getState().persisteditems.auth;
        if (isPosting)
            return;
        dispatch({ type: SET_TARGETNUM_REQ });

        const body = { 'targetNum': targetNum };
        axios.post(`${ROOT_URL}/api/recitation/target_num`, body, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({
                    type: SET_TARGETNUM_SUCCESS,
                });
                dispatch(getTargetNum());
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: SET_TARGETNUM_FAILURE,
                    error: error,
                });
            })
    }
}

export const GET_TARGETNUM_REQ = 'get_targetnum_req';
export const GET_TARGETNUM_SUCCESS = 'get_targetnum_success';
export const GET_TARGETNUM_FAILURE = 'get_targetnum_failure';

export const getTargetNum = () => {
    return (dispatch, getState) => {
        const { isFetchingTargetNum } = getState().setting;
        const { token } = getState().persisteditems.auth;
        if (isFetchingTargetNum)
            return;
        dispatch({ type: GET_TARGETNUM_REQ });
        axios.get(`${ROOT_URL}/api/recitation/target_num`, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_TARGETNUM_SUCCESS,
                    currentTargetNum: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: GET_TARGETNUM_FAILURE,
                    error: error,
                });
            })
    }
}


export const SET_WORDBOOK_REQ = 'set_wordbook_req';
export const SET_WORDBOOK_SUCCESS = 'set_wordbook_success';
export const SET_WORDBOOK_FAILURE = 'set_wordbook_failure';
export const setWordBook = (id) => {
    return (dispatch, getState) => {
        const { isPosting } = getState().setting;
        const { token } = getState().persisteditems.auth;
        if (isPosting)
            return;

        dispatch({ type: SET_WORDBOOK_REQ });
        const body = { 'id': id };
        axios.post(`${ROOT_URL}/api/recitation/subscription`, body, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({
                    type: SET_WORDBOOK_SUCCESS,
                });
            })
            .then(()=>{

                dispatch(getWordBook());
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: SET_WORDBOOK_FAILURE,
                    error: error,
                });
            })
    }
}


export const GET_WORDBOOK_REQ = 'get_wordbook_req';
export const GET_WORDBOOK_SUCCESS = 'get_wordbook_success';
export const GET_WORDBOOK_FAILURE = 'get_wordbook_failure';
export const getWordBook = () => {
    return (dispatch, getState) => {
        const { isFetchingWordBook } = getState().setting;
        const { token } = getState().persisteditems.auth;
        // if (isFetchingWordBook)
        //     return;

        dispatch({ type: GET_WORDBOOK_REQ });

        axios.get(`${ROOT_URL}/api/recitation/subscription`, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_WORDBOOK_SUCCESS,
                    currentWordBook: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: GET_WORDBOOK_FAILURE,
                });
            })
    }
}