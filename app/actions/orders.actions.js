import {
    FILL_ORDERS_DATA,
    CLEAR_CART,
    TOGGLE_REFRESHING,
    HIDE_BTN_SPINNER,
    FILL_ORDER_DETAILS,
    ADD_MORE_ORDERS
} from './constants/index.constants'
import { Alert } from 'react-native';
import axios from 'axios'
import store from '../utils/store.util'
import { navigate } from '../utils/navigation.util'
import { clearUserData } from './auth.actions';
import { DEFAULT_URL } from '../utils/config.util';
import {hideBtnSpinner} from './layout.actions';

export const fillUserData = (data) => {
    return dispatch => {
        dispatch({ type: FILL_USER_DATA, payload: data });
        dispatch({ type: TOKEN_EXIST, payload:true})
    }
}

export const getOrdersData = (refresh) => {
    console.log('Start loading ORDERS DATA')
    return (dispatch, getStore) => {
        const token = getStore().auth.token;
        refresh && dispatch({ type: TOGGLE_REFRESHING })
        axios({
            ...axios.defaults,
            method: 'get',
            url: `/orders?offset=0`
        })
            .then(response => {
                let res = response.data
                let mutatedData = mutateImagesUrls(res.data.rows)
                res.success && (dispatch({ type: FILL_ORDERS_DATA, payload: mutatedData }),
                    refresh && dispatch({ type: TOGGLE_REFRESHING }))
            })
            .catch(error => {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                (token && error.response.status === 401)
                    ? (console.log('ERROR IN GET ORDER DATA:',error.response),clearUserData()(dispatch),
                        dispatch({ type: HIDE_BTN_SPINNER }),
                        alert('Token expired, please sign in again.'))
                    : error.response.message && alert(error.response.message)
            })
    }
};

export const getMoreOrders = (page) => {
    return (dispatch, getStore) => {
        const token = getStore().auth.token;
        axios({
            ...axios.defaults,
            method: 'get',
            url: `/orders?offset=${page}`
        })
            .then(response => {
                let res = response.data
                let mutatedData = mutateImagesUrls(res.data.rows)
                res.success && dispatch({ type: ADD_MORE_ORDERS, payload: {mutatedData, page} })
            })
            .catch(error => {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                (token && error.response.status === 401)
                    ? (console.log('ERROR IN GET ORDER DATA:',error.response),clearUserData()(dispatch),
                        alert('Token expired, please sign in again.'))
                    : error.response.message && alert(error.response.message)
            })
    }
};

export const getOrderById = (id) => {
    return (dispatch, getStore) => {
        const token = getStore().auth.token;
        axios({
            ...axios.defaults,
            method: 'get',
            url: `/orders/${id}`
        })
            .then(response => {
                console.log(response)
                let res = response.data
                let mutedData = mutateImagesUrls([response.data.data])
                res.success && dispatch({ type: FILL_ORDER_DETAILS, payload: mutedData[0]})
            })
            .catch(error => {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                (token && error.response.status === 401)
                    ? (console.log('ERROR IN GET ORDER DATA:',error.response),clearUserData()(dispatch),
                        dispatch({ type: HIDE_BTN_SPINNER }),
                        alert('Token expired, please sign in again.'))
                    : error.response.message && alert(error.response.message)
            })
    }
};

export const confirmCheckout = (data) => {
    console.log('DATA WHIch we send to checout: ', data)
    return (dispatch,getState) => {
        axios({
            ...axios.defaults,
            method: 'post',
            url: '/orders',
            data: data
        })
            .then(response => {
                dispatch({ type: HIDE_BTN_SPINNER });
                hideBtnSpinner();
                let res = response.data;
                res.success
                    ? (dispatch({ type: CLEAR_CART }),
                        navigate('Order'),
                        getOrdersData()(dispatch, getState))
                    : (alert(res.message),
                    console.log('Error from server',res))
            })
            .catch(error => {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                dispatch({ type: HIDE_BTN_SPINNER });
                console.log('ERRRORRR   ', error.response)
                    (token && error.response.status === 401)
                    ? (clearUserData()(dispatch),
                        alert('Token expired, please sign in again.'))
                    : alert(error.response.message)
            })
    }
};

const mutateImagesUrls = (orders) => {
    let newData = []
    orders.map(order => {
        let newOrder = order
        let newProducts = []
        order.order_lines.map(item => {  
            let newProduct = item
            if (!item.product.shopify_id) {
                let newImages = []
                item.product.images.map(image => {
                    let newImage = `${DEFAULT_URL}/photos/${image}`
                    newImages.push(newImage)
                })
                newProduct.product.images = newImages
            }
            newProducts.push(newProduct)
            
        })
        newOrder.order_lines = newProducts
        newData.push(newOrder)
    })
    return newData
}
