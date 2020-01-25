import {
    ADD_ITEM,
    REMOVE_ITEM,
    INCREMENT,
    DECREMENT,
    CLEAR_CART,
    FILL_SHOP_WORK_TIME,
    CLEAR_USER_DATA
} from '../actions/constants/index.constants'

const initialState = {
    shop_id: null,
    items: [],
    schedule: null
}

export default cart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
                shop_id: action.payload.shop_id
            }

        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item !== action.payload)
            }

        case INCREMENT:
            return {
                ...state,
                items: state.items.map(item => item === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            }

        case DECREMENT:
            return {
                ...state,
                items: state.items.map(item => item === action.payload
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
            }
        case CLEAR_CART:
            return initialState
        case FILL_SHOP_WORK_TIME:
            return { ...state, schedule: action.payload }
        case CLEAR_USER_DATA:
            return initialState

        default:
            return state;
    }
}