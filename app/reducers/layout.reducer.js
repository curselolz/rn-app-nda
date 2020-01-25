import {
    SHOW_BTN_SPINNER,
    HIDE_BTN_SPINNER,
    FILL_COORDS,
    TOGGLE_REFRESHING,
    SHOW_SEARCH_SPINNER,
    HIDE_SEARCH_SPINNER
} from '../actions/constants/index.constants'

const initialState = {
    spinnerVisible: false,
    searchSpinnerVisible: false,
    coords: null,
    refreshing: false
}

export default layout = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_BTN_SPINNER:
            return { ...state, spinnerVisible: true }

        case HIDE_BTN_SPINNER:
            return { ...state, spinnerVisible: false }

        case SHOW_SEARCH_SPINNER:
            return { ...state, searchSpinnerVisible: true }

        case HIDE_SEARCH_SPINNER:
            return { ...state, searchSpinnerVisible: false }

        case FILL_COORDS:
            return { ...state, coords: action.payload }

        case TOGGLE_REFRESHING:
            return { ...state, refreshing: !state.refreshing }

        default:
            return state;
    }
}