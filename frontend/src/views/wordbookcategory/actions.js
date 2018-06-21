import axios from 'axios';
import { ROOT_URL } from '../../config/config';

export const SET_SETTING_STATE = 'set_setting_state';
export const setSettingState = (isEditing) => {
    return ({
        type: SET_SETTING_STATE,
        isEditing: isEditing,
    })
}


export const WORDBOOK_REQ = 'wordbook_req';
export const WORDBOOK_SUCCESS = 'wordbook_success';
export const WORDBOOK_FAILURE = 'wordbook_failure';
export const getWordBooks = () => {
    return (dispatch, getState) => {
        const { isFetching } = getState().wordbookcategory;
        const { token } = getState().persisteditems.auth;
        if (isFetching)
            return;
        dispatch({ type: WORDBOOK_REQ });
        axios.get(`${ROOT_URL}/api/word/wordbook_details`, {
            headers: {
                Authorization: 'JWT ' + token,
            }
        })
            .then((response) => {
                dispatch({
                    type: WORDBOOK_SUCCESS,
                    wordbooks: response.data,
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: WORDBOOK_FAILURE,
                    error: error,
                });
            })
    }
}