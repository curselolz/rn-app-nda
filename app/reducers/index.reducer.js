import { combineReducers } from 'redux'
import auth from './auth.reducer'
import layout from './layout.reducer'
import cart from './cart.reducer'
import catalog from './catalog.reducer'
import home from './home.reducer'
import orders from './orders.reducer'
import addresses from './addresses.reducer'
import notifs from './notification.reducer';
import creditCards from './creditCards.reducer';
import filters from './filters.reducer';

export default combineReducers({
    auth,
    cart,
    catalog,
    layout,
    home,
    orders,
    addresses,
    notifs,
    creditCards,
    filters
})