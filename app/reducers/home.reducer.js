import {
    FILL_HOME_DATA, ADD_MORE_TO_HOME, USER_COORDS
} from '../actions/constants/index.constants'
import _ from 'lodash'

const initialState = {
    unique_products: null,
    other_products: null,
    offSet: 0,
    search: false,
    coords: null
}

export default home = (state = initialState, action) => {
    switch (action.type) {
        case USER_COORDS:
            return {...state, coords: action.payload }
        case FILL_HOME_DATA:
            return {...state, ...action.payload.data, offSet: action.payload.search ? 0 : 10, search: action.payload.search }
        case ADD_MORE_TO_HOME:
        let other_products = filterExistingProduckts(state.other_products, action.payload.other_products)
            return { ...state, other_products, offSet: state.offSet += 10}
        default:
            return state;
    }
}

const filterExistingProduckts = (produckts, newProduckts) => {
    let filtered = []
    produckts.map(product => {
        newProduckts.map((newProduct, index) =>{
            if(_.isEqual(product, newProduct)) {
                newProduckts.splice(index, 1)
            }
        })
    })
    filtered = [...produckts, ...newProduckts]
    return filtered
}