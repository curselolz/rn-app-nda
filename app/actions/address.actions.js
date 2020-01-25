import {
    ADDRESS_ADD, ADDRESS_EDITED,
    ADDRESSES_RECEIVE,
    HIDE_BTN_SPINNER,
    SHOW_BTN_SPINNER,
    ADDRESS_INPUT_CHANGE_VALUE,
    ADDRESS_INPUT_CALLBACK,
    CLEAR_ADDRESS_INPUT_VALUES,
    FILL_ADDRESS_FORM,
    PHONE_INPUT_CHANGED,
} from "./constants/index.constants";

import axios from 'axios';
import {navigate} from "../utils/navigation.util";
import {Alert} from "react-native";


export const getUserAddresses = () => {
    return dispatch => {
        dispatch({ type: SHOW_BTN_SPINNER });
        axios({
            ...axios.defaults,
            method: 'get',
            url: '/addresses'
        })
            .then(response => {
                dispatch({ type: HIDE_BTN_SPINNER});
                let res = response.data;
                if (res.success && res.data.length) {
                    dispatch({ type: ADDRESSES_RECEIVE, payload: res.data })
                }else{
                }
            })
            .catch(error => {
                console.log('ERRRORRR:',error);
                dispatch({ type: HIDE_BTN_SPINNER});
            })
    }
};

export const addNewAddress = (data) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER});
    axios({
        ...axios.defaults,
        method: 'post',
        data: data,
        url: '/addresses'
    })
        .then(response => {
            let res = response.data;
            dispatch({ type: HIDE_BTN_SPINNER});
            res.success
                ? (dispatch({ type: ADDRESS_ADD, payload: res.data }),
                    Alert.alert('Success',
                        'Address has been Added.',
                        [{
                            text: 'Ok'
                        }]))
                : (alert(res.message), console.log('result from add new address:' ,res));
        })
        .catch(error => {
            console.log('error after address added', error.response);
            dispatch({ type: HIDE_BTN_SPINNER});
        })
};

export const editAddress = (data) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER});
    axios({
        ...axios.defaults,
        method: 'put',
        data: data,
        url: `/addresses/${data.id}`
    })
        .then(response => {
            let res = response.data;
            dispatch({ type: HIDE_BTN_SPINNER});
            res.success
                ? (dispatch({ type: ADDRESS_EDITED, payload: res.data }),
                    Alert.alert('Success',
                        'Address has been edited.',
                        [{
                            text: 'Ok'
                        }]))
                : alert(res.message);
        })
        .catch(error => {
            console.log('error after address added', error.response);
            dispatch({ type: HIDE_BTN_SPINNER});
        })
};

export const deleteAddress = (id) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER});
    axios({
        ...axios.defaults,
        method: 'delete',
        url: `/addresses/${id}`
    })
        .then(response => {
            let res = response.data;
            dispatch({ type: HIDE_BTN_SPINNER});
            res.success
                ? (dispatch({ type: ADDRESSES_RECEIVE, payload: res.data.length ? res.data : null }),
                    Alert.alert('Success',
                        'Address has been deleted.',
                        [{
                            text: 'Ok'
                        }]))
                : alert(res.message);
        })
        .catch(error => {
            console.log('error after address deleted', error.response);
            dispatch({ type: HIDE_BTN_SPINNER});
        })
};

export const setPrime = (id) => dispatch => {
    dispatch({ type: SHOW_BTN_SPINNER});
    axios({
        ...axios.defaults,
        method: 'get',
        url: `/addresses/${id}/set-primary`
    })
        .then(response => {
            dispatch({ type: HIDE_BTN_SPINNER});
            let res = response.data;
            res.success
                ? (dispatch({ type: ADDRESSES_RECEIVE, payload: res.data }),
                    Alert.alert('Success',
                        'Address has been edited.',
                        [{
                            text: 'Ok'
                        }]))
                : alert(res.message);

        })
        .catch(error => {
            console.log('error after address added', error.response);
            dispatch({ type: HIDE_BTN_SPINNER});
        })
};

export const addressFormInputChangeValue = (data) => {
    return {type: ADDRESS_INPUT_CHANGE_VALUE, payload: data}
}
export const addressInputCallback = (data) => {
    return { type: ADDRESS_INPUT_CALLBACK, payload: data}
}
export const fillAddressForm = (data) => {
    return {type: FILL_ADDRESS_FORM, payload: data}
}
export const clearAddressInputValues = () => {
    return {type: CLEAR_ADDRESS_INPUT_VALUES}
}

export const phoneInputChanged = (data) => {
    return {type: PHONE_INPUT_CHANGED, payload: data}
}
