import {
    DELETE_INTERNAL_NOTIFICATION,
    FILL_INTERNAL_NOTIFICATIONS,
    FILL_INTERNAL_NOTIFICATIONS_COUNT, SET_NOTIFICATIONS_TO_NULL
} from "./constants/index.constants";
import axios from 'axios';

export const getNotificationsCount = () => dispatch => {
    axios({
        ...axios.defaults,
        method: 'get',
        url: '/notifications-count'
    })
        .then(response => {
            let res = response.data;
            if (res.success) {
                dispatch({ type: FILL_INTERNAL_NOTIFICATIONS_COUNT, payload: res.data })
            }else{
                console.log('GET request was not succeed!')
            }
        })
        .catch(error => {
            console.log('ERRRORRR:',error.response);
        })
};

export const getNotifications = () => dispatch => {
    axios({
        ...axios.defaults,
        method: 'get',
        url: '/notifications'
    })
        .then(response => {
            let res = response.data;
            if (res.success) {
                dispatch({ type: FILL_INTERNAL_NOTIFICATIONS, payload: res.data })
            }else{
                console.log('GET request was not succeed!')
            }
        })
        .catch(error => {
            console.log('ERRRORRR:',error.response);
        })
};

export const deleteNotification = (id) => dispatch => {
    axios({
        ...axios.defaults,
        method: 'delete',
        url: '/notifications/'+id
    })
        .then(response => {
            let res = response.data;
            if (res.success) {
                dispatch({ type: DELETE_INTERNAL_NOTIFICATION, payload: id })
            }else{
                console.log('GET request was not succeed!')
            }
        })
        .catch(error => {
            console.log('ERRRORRR:',error.response);
        })
};

export const resetNotificationsCount = () => {
    return {type: SET_NOTIFICATIONS_TO_NULL}
};

