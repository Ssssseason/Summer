import axios from 'axios';
import { ROOT_URL } from '../../config/config';

export const LOGIN_REQ = 'login_req';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAILURE = 'login_failure';

export const login = (username, password) => {
    return (dispatch, getState) => {
        const { isLogining } = getState().login;
        if (isLogining)
            return;
        dispatch({
            type: LOGIN_REQ,
        });

        const body = new FormData();
        body.append('username', username);
        body.append('password', password);

        axios.post(`${ROOT_URL}/api/user/token_auth`, body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            })
            .then((response) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    auth: response.data.auth,
                    avatar: response.data.avatar,
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: LOGIN_FAILURE,
                    error: error,
                })
            })
    }
}

export const REG_REQ = 'reg_req';
export const REG_SUCCESS = 'reg_success';
export const REG_FAILURE = 'reg_failure';

export const register = (username, email, password) => {
    return (dispatch, getState) => {
        const { isRegistering } = getState().login;
        if (isRegistering)
            return;
        dispatch({ type: REG_REQ });
        axios.post(`${ROOT_URL}/api/user/register`, {
            username,
            email,
            password,
        })
            .then((response) => {
                dispatch({
                    type: REG_SUCCESS,
                })
                dispatch(login(username, password));
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: REG_FAILURE,
                    error: error,
                })
            })
    }
}

export const LOGOUT = 'logout';
export const logout = () => {
    return ({
        type: LOGOUT,
    });
}