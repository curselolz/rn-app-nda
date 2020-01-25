import {
    DELETE_INTERNAL_NOTIFICATION,
    FILL_INTERNAL_NOTIFICATIONS,
    FILL_INTERNAL_NOTIFICATIONS_COUNT, SET_NOTIFICATIONS_TO_NULL, CLEAR_USER_DATA
} from "../actions/constants/index.constants";

const initialState = {
    notifications: null,
    count: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FILL_INTERNAL_NOTIFICATIONS_COUNT:
            return { ...state, count: action.payload };
        case FILL_INTERNAL_NOTIFICATIONS:
            return { ...state, notifications: action.payload.reverse() };
        case DELETE_INTERNAL_NOTIFICATION:
            return { ...state, notifications: state.notifications.filter(item => item.id !== action.payload) };
        case SET_NOTIFICATIONS_TO_NULL:
            return { ...state, count: null };
        case CLEAR_USER_DATA:
            return initialState
        default:
            return state
    }
}