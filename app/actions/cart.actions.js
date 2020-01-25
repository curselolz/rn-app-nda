import {
    ADD_ITEM,
    REMOVE_ITEM,
    INCREMENT,
    DECREMENT,
    CLEAR_CART,
    SET_SHOP_ID,
    REMOVE_SHOP_ID
} from './constants/index.constants'
import { Alert } from 'react-native';

export const addItem = (data) => {
    return (dispatch) => {
        Alert.alert('Success',
            'Item added to cart.',
            [{
                text: 'Ok',
                onPress: () => null,
                style: 'Cancel'
            }]);
        dispatch({ type: ADD_ITEM, payload: data });
    }
}

export const removeItem = (data) => {
    return (dispatch) => {
        dispatch({ type: REMOVE_ITEM, payload: data })
    }
}

export const increment = (data) => {
    return (dispatch) => {
        dispatch({ type: INCREMENT, payload: data })
    }
}

export const decrement = (data) => {
    return (dispatch) => {
        dispatch({ type: DECREMENT, payload: data })
    }
}

export const clearCart = (data) => {
    return (dispatch) => {
        dispatch({ type: CLEAR_CART })
    }
}


// export const getAddress = (data) => {
//     return dispatch => {

//         axiosInstance({
//             method: 'get',
//             url: url
//         })
//             .then(response => {
//                 let res = response.data
//                 res.success && dispatch({ type: FILL_CATALOG_DATA, payload: res.data })
//             })
//             .catch(error => console.log(error))
//     }
// }
