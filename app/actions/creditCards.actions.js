import {
    ADD_NEW_CREDIT_CARD, DELETE_CREDIT_CARD,
    FILL_USER_CARDS,
    HIDE_BTN_SPINNER,
    SHOW_BTN_SPINNER,
    CARDS_INPUT_CHANGE_VALUE,
    CREDIT_CARD_FORM_VALID,
    RESET_CREDIT_CARD_VALUES,
} from "./constants/index.constants";

import axios from 'axios';
import { Alert } from "react-native";
import creditCards from "../reducers/creditCards.reducer";


export const getUserCards = () => dispatch => {
    axiosRequest('get', 'cards', null, null, true, dispatch, null, false)

};

export const addNewCard = (data) => (dispatch) => {
    axiosRequest('post', 'cards', null, 'Added', false, dispatch, data, false)
};

export const deleteCreditCard = (id) => dispatch => {
    axiosRequest('delete', 'cards', id, 'Deleted', false, dispatch, null, false)

};

export const setPrimeCard = (id) => dispatch => {
    axiosRequest('get', 'cards', id, 'Set as Prime', false, dispatch, null, true);
};

const axiosRequest = (requestMetod, route, id, strings, first, dispatch, data, setPrimary) => {
    let url = `/${route}`;

    if (id && setPrimary) {

        url = `${url}/${id}/set-primary`
    } else if (id) {
        url = `${url}/${id}`
    }

    const body = data
        ? {
            ...axios.defaults,
            method: requestMetod,
            data: data,
            url: url
        }
        : {
            ...axios.defaults,
            method: requestMetod,
            url: url
        };

    dispatch({ type: SHOW_BTN_SPINNER });
    axios(body)
        .then(response => {
            dispatch({ type: HIDE_BTN_SPINNER });
            let res = response.data;
            let cards;
            if (res.data && res.data.sources.data) {
                cards = res.data.sources.data.map(item => ({
                    id: item.id,
                    type: item.brand,
                    last4: item.last4,
                    primary: (res.data.default_source === item.id)
                }));
            } else {
                cards = null
            }
            if (res.success) {
                res.data ?
                    dispatch({
                        type: FILL_USER_CARDS, payload: {
                            primary: res.data.default_source,
                            cards
                        }
                    })
                    :
                    dispatch({
                        type: FILL_USER_CARDS, payload: {
                            primary: null,
                            cards
                        }
                    });
                if (!first) {
                    Alert.alert('Success',
                        `Card has been ${strings}.`,
                        [{
                            text: 'Ok'
                        }])
                }
            } else {
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                alert(res.message);
                console.log('GET request was noe succeed!')
            }
        })
        .catch(error => {
            console.log('ERRRORRR:', error.response);
            dispatch({ type: HIDE_BTN_SPINNER });
        })
};

export const cardsInputChangeValue = (data) => {
    return { type: CARDS_INPUT_CHANGE_VALUE, payload: data }
}

export const creditCardFormValid = (value) => {
    return { type: CREDIT_CARD_FORM_VALID, payload: value }
}

export const resetCreditCardValues = () => {
    return { type: RESET_CREDIT_CARD_VALUES }
}
