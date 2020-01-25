import {
    FILL_USER_DATA,
    CLEAR_USER_DATA,
    SIGN_UP_SUCCESS,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILED,
    FILL_PROFILE_DATA,
    SHOW_ERR_MESSAGE,
    USER_TOKEN,
    SHOW_FORGOT_MSG,
    ADD_PLAYER_ID,
    PASSWORD_CHANGED,
    PASSWORD_TRIGER_OFF,
    RETURN_TO_CHECKOUT,
    BACK_TO_HOME,
    TOKEN_EXIST
} from '../actions/constants/index.constants'

const initialState = {
    token: null,
    profile: null,
    authSuccess: null,
    playerId: null,
    passwordChanged: false,
    returnToCheckout: false,
    tokenExist:false,
};

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case FILL_USER_DATA:
            return { ...state, token: action.payload.token, gender: action.payload.gender };
        case CLEAR_USER_DATA:
            return { ...initialState, token: undefined };
        case SIGN_IN_SUCCESS:
            return { ...state, authSuccess: true };
        case SIGN_IN_FAILED:
            return { ...state, authSuccess: false, authMsg: action.payload };
        case SHOW_ERR_MESSAGE:
            return { ...state, errMsg: action.payload };
        case SHOW_FORGOT_MSG:
            return { ...state, forgotMsg: true };
        case FILL_PROFILE_DATA:
            return { ...state, errMsg: null, profile: action.payload };
        case ADD_PLAYER_ID:
            return { ...state, playerId: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, passwordChanged: true }
        case PASSWORD_TRIGER_OFF:
            return { ...state, passwordChanged: false }
        case RETURN_TO_CHECKOUT:
            return { ...state, returnToCheckout: true }
        case BACK_TO_HOME:
            return { ...state, returnToCheckout: false }
        case TOKEN_EXIST:
            return { ...state, tokenExist: action.payload};
        default:
            return state;
    }
}
