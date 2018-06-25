import axios from 'axios';
import { ROOT_URL } from '../../config/config';

export const SET_UD_EDITING = 'set_ud_editing';
export const setUDIsEditing = (isEditing) => {
    return ({
        type: SET_UD_EDITING,
        isEditing: isEditing,
    });
}

export const GET_UD_REQ = 'get_ud_req';
export const GET_UD_SUCCESS = 'get_ud_success';
export const GET_UD_FAILURE = 'get_ud_failure';
export const getUserDefined = () => {
    return (dispatch, getState) => {
        const { isFetching } = getState().userdefined.isFetching;
        const { token } = getState().persisteditems.auth;
        if (isFetching)
            return;
        dispatch({ type: GET_UD_REQ });

        axios.get(`${ROOT_URL}/api/word/userdefined`, {
            headers: {
                Authorization: "JWT " + token,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_UD_SUCCESS,
                    words: response.data,
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: GET_UD_FAILURE,
                    error: error,
                });
            })
    }
}

export const POST_UD_REQ = 'post_ud_req';
export const POST_UD_SUCCESS = 'post_ud_success';
export const POST_UD_FAILURE = 'post_ud_failure';
export const postUserDefined = (word) => {
    return (dispatch, getState) => {
        const { token } = getState().persisteditems.auth;
        dispatch({ type: POST_UD_REQ });
        axios.post(`${ROOT_URL}/api/word/userdefined`, word, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({ type: POST_UD_SUCCESS });
                dispatch(getUserDefined());
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: POST_UD_FAILURE, error: error });
            })

    }
}

export const PUT_UD_REQ = 'put_ud_req';
export const PUT_UD_SUCCESS = 'put_ud_success';
export const PUT_UD_FAILURE = 'put_ud_failure';
export const putUserDefined = (word) => {
    return (dispatch, getState) => {
        const { token } = getState().persisteditems.auth;
        dispatch({ type: PUT_UD_REQ });
        axios.put(`${ROOT_URL}/api/word/userdefined`, word, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({ type: PUT_UD_SUCCESS });
                dispatch(getUserDefined());
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: PUT_UD_FAILURE, error: error });
            })
    }
}

export const DEL_UD_REQ = 'del_ud_req';
export const DEL_UD_SUCCESS = 'del_ud_success';
export const DEL_UD_FAILURE = 'del_ud_failure';
export const delUserDefined = (id) => {
    return (dispatch, getState) => {
        const { token } = getState().persisteditems.auth;
        dispatch({ type: DEL_UD_REQ });
        axios.delete(`${ROOT_URL}/api/word/userdefined`, {
            params:{
                id: id,
            },
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({ type: DEL_UD_SUCCESS });
                dispatch(getUserDefined());
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: DEL_UD_FAILURE, error: error });
            })
    }
}

export const SET_UD_HASFINISHED = 'set_ud_hasfinished';
export const setUDFinished = (hasFinished)=>{
    return ({
        type: SET_UD_HASFINISHED,
        hasFinished: hasFinished,
    });
}