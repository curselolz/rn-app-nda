import { SHOW_BTN_SPINNER, HIDE_BTN_SPINNER } from './constants/index.constants'

export const showBtnSpinner = () => {
    return dispatch => {
        dispatch({ type: SHOW_BTN_SPINNER })
    }
}

export const hideBtnSpinner = () => {
    return dispatch => {
        dispatch({ type: HIDE_BTN_SPINNER })
    }
}

