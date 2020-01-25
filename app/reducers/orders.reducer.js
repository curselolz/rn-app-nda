import {
    FILL_ORDERS_DATA,
    FILL_ORDER_DETAILS,
    ADD_MORE_ORDERS
} from "../actions/constants/index.constants";
import _ from 'lodash'

const initialState = {
    orders: null,
    details: null
};

export default (orders = (state = initialState, action) => {
    switch (action.type) {
        case FILL_ORDERS_DATA:
            return { ...state, orders: action.payload };
        case ADD_MORE_ORDERS:
        let orders = filterExistingOrders(state.orders, action.payload.mutatedData)
            return {
                ...state,
                orders
            };
        case FILL_ORDER_DETAILS:
            return { ...state, details: action.payload };

        default:
            return state;
    }
});

const filterExistingOrders = (orders, newOrders) => {
    let filteredOrders = []
    let arr = []
    orders.map(order => {
        newOrders.map((newOrder, index) =>{
            if(_.isEqual(order, newOrder)) {
                newOrders.splice(index, 1)
            }
        })
    })
    filteredOrders = [...orders, ...newOrders]
    return filteredOrders
}
