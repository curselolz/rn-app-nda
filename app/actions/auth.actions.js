import {
    FILL_USER_DATA,
    CLEAR_USER_DATA,
    REMOVE_USER_DATA,
    SIGN_UP_SUCCESS,
    SIGN_IN_FAILED,
    SHOW_BTN_SPINNER,
    HIDE_BTN_SPINNER,
    FILL_PROFILE_DATA,
    SIGN_IN_SUCCESS,
    SHOW_ERR_MESSAGE,
    SHOW_FORGOT_MSG,
    ADD_PLAYER_ID,
    PASSWORD_CHANGED,
    PASSWORD_TRIGER_OFF,
    RETURN_TO_CHECKOUT,
    STORED_USER_DATA,
    BACK_TO_HOME,
    USER_TOKEN,
    TOKEN_EXIST,
} from './constants/index.constants';
import { FBLoginManager } from 'react-native-facebook-login';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import setAxiosDefaults from '../utils/axios.util';
import { initOneSignall } from "../utils/appJS/oneSignal.util";

export const fillUserData = (data) => {
    return dispatch => {
        dispatch({ type: FILL_USER_DATA, payload: data })
    }
};

export const clearUserData = () => {
    return dispatch => {
        FBLoginManager.logout((err, data) => console.log(data));
        AsyncStorage.clear().then(() => {
            dispatch({ type: CLEAR_USER_DATA })
        })
    }
};

export const signIn = (data) => {
    return dispatch => {
        dispatch({ type: SHOW_BTN_SPINNER });
        axios({
            ...axios.defaults,
            method: 'post',
            data: data,
            url: '/login'
        })
            .then(response => {
                let res = response.data;
                if (res.success) {
                    setAsync(res, () => {
                        initOneSignall()
                        setAxiosDefaults(res.data.token);
                        fillUserData({
                            token: res.data.token,
                            gender: res.data.gender
                        })
                        dispatch({ type: HIDE_BTN_SPINNER })
                        dispatch({ type: FILL_USER_DATA, payload: res.data })
                        dispatch({ type: TOKEN_EXIST, payload: true})
                        dispatch({ type: SIGN_IN_SUCCESS })
                    })
                }
            })
            .catch(error => {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                console.log('ERRRORRR:', error.response);
                dispatch({ type: HIDE_BTN_SPINNER });
                dispatch({ type: SIGN_IN_FAILED, payload: error.response.data.message })
            })
    }
};

export const signUp = (data) =>  (dispatch, getState) => {
    console.log('sign up')
        if (getState().auth.playerId) {
            data['player_id'] = getState().auth.playerId;
        }
        console.log(data);
        dispatch({ type: SHOW_BTN_SPINNER });
        axios({
            ...axios.defaults,
            method: 'post',
            data: data,
            url: '/register'
        })
            .then(response => {
                let res = response.data;
                if(res.success) {
                    setAsync(res, () => {
                        initOneSignall()
                        setAxiosDefaults(res.data.token)
                        dispatch({ type: HIDE_BTN_SPINNER })
                        dispatch({ type: FILL_USER_DATA, payload: res.data })
                        dispatch({ type: TOKEN_EXIST, payload: true})
                    })
                }else{
                    if(!error.response.message) {
                        console.log('HERE');
                    } else {
                        console.log(error);
                    }
                    dispatch({ type: HIDE_BTN_SPINNER }), alert(res.message)
                }
            })
            .catch(error => {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                alert(error.response.message || 'Connection lost try again later...')
                dispatch({ type: HIDE_BTN_SPINNER })
            })
};

export const setAsync = (res, callBack) => {
    console.log('Start fill async storage!')
    AsyncStorage.setItem(STORED_USER_DATA, JSON.stringify({
        token: res.data.token,
        gender: res.data.gender || 'man',
    }), ()=> {
        console.log('Finished fill async storage!')
        callBack()
    })
}

export const signUpFacebook = (token) => {
    return (dispatch, getState) => {
        var player_id;
        if (getState().auth.playerId) {
            player_id = getState().auth.playerId;
        }
        axios({
            ...axios.defaults,
            method: 'post',
            data: {
                access_token: token,
                player_id
            },
            url: '/login/facebook'
        })
            .then(response => {
                let res = response.data;
                dispatch({ type: TOKEN_EXIST, payload: true})
                res.success && (dispatch({ type: FILL_USER_DATA, payload: res.data }),
                    setAxiosDefaults(res.data.token),
                    AsyncStorage.setItem(STORED_USER_DATA, JSON.stringify({
                        token: res.data.token,
                        gender: res.data.user.buyer.gender
                    })))
            })
            .catch(error => console.log(error.response))
    }
};

export const getProfileData = () => {
    console.log('started loading user profile!!!!', axios.defaults)
    return dispatch => {
        axios({
            ...axios.defaults,
            method: 'get',
            url: '/profile'
        })
            .then(response => {
                let res = response.data
                res.success ? dispatch({ type: FILL_PROFILE_DATA, payload: res.data })
                    : console.log('res not success: ', res);
            })
            .catch(error => {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                console.log('someThing WRONG :', error.response);
                (token && error.response.status === 401)
                    ? (clearUserData()(dispatch),
                        dispatch({ type: HIDE_BTN_SPINNER }),
                        alert('Token expired, please sign in again.'))
                    : alert(error.response.message)
            })
    }
};

export const saveProfileData = (data) => {
    return dispatch => {
        dispatch({ type: SHOW_BTN_SPINNER });
        axios({
            ...axios.defaults,
            method: 'put',
            url: '/buyer',
            data: data,
            headers: {
                ...axios.defaults.headers,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                let res = response.data;
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                res.success
                    ? (dispatch({ type: FILL_PROFILE_DATA, payload: res.data }), dispatch({ type: HIDE_BTN_SPINNER }))
                    : (dispatch({ type: HIDE_BTN_SPINNER }), dispatch({ type: SHOW_ERR_MESSAGE, payload: res.message }))
            })
            .catch(error => (dispatch({ type: HIDE_BTN_SPINNER }), console.log('errro from prifile data send', error.response)))
    }
};

export const forgotPassword = email => {
    return dispatch => {

        dispatch({ type: SHOW_BTN_SPINNER });
        axios({
            ...axios.defaults,
            method: 'post',
            url: '/forgot-password',
            data: {
                email: email
            }
        })
            .then(response => {
                dispatch({ type: HIDE_BTN_SPINNER });
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                let res = response.data;
                res.success
                    ? dispatch({ type: SHOW_FORGOT_MSG })
                    : alert(res.message)
            })
            .catch(error => {
                dispatch({ type: HIDE_BTN_SPINNER });
                if(typeof error.response.message === 'undefined') {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                alert(error.response.data.message)
                console.log(error.response)
            })
    }
};

export const changePassword = (data) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER });
    axios({
        ...axios.defaults,
        method: 'post',
        url: '/change-password',
        data
    })
        .then(response => {
            dispatch({ type: HIDE_BTN_SPINNER });
            let res = response.data;
            if (res.success) {
                dispatch({
                    type: PASSWORD_CHANGED
                })
            } else {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                alert(res.message);
            }
        })
        .catch(error => {
            if(!error.response.message) {
                console.log('HERE');
            } else {
                console.log(error);
            }
            alert(error.response.data.message);
            dispatch({ type: HIDE_BTN_SPINNER });
        })
};


export const addPlayerId = (playerId) => {
    return { type: ADD_PLAYER_ID, payload: playerId }
};

export const paswordChangeTriger = () => {
    return { type: PASSWORD_TRIGER_OFF };
}

export const signUpOnCheckout = () => (dispatch, getState) => {
    let flagOn = getState().auth.returnToCheckout
    dispatch ({ type: flagOn ? BACK_TO_HOME : RETURN_TO_CHECKOUT })
}
