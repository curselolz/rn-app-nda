import {
    FILL_CATALOG_DATA,
    FILL_SUBCATALOG_DATA,
    CLEAR_SUBCATALOG_DATA,
    CLEAR_CATALOG_DATA,
    FILL_PRODUCT_DATA,
    CLEAR_PRODUCT_DATA,
    FILL_SHOP_DATA,
    FILL_CATALOG_GENDER,
    CLEAR_CATALOG_GENDER,
    FILL_PRODUCT_LIST,
    FILTERED, MAX_PRICE_RECEIVED, CLEAR_PRODUCTS_LIST, FILL_MORE_TO_CATALOG, FILL_MORE_TO_SUB_CATALOG, SET_CATEGORY_PRODUCTS_ID
} from '../actions/constants/index.constants'
import { goBack } from '../utils/navigation.util';

const initialState = {
    main: null,
    subCatalog: null,
    details: null,
    shop: null,
    catalogGender: null,
    products: null,
    maxPrice: null,
    offset: 0,
    subOffset: 0,
    productsId: null
};

export default cart = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_CATALOG_DATA:
            return initialState

        case FILL_CATALOG_DATA:
            return { ...state, main: action.payload, offset: 10 }

        case FILL_MORE_TO_CATALOG:
            return { ...state, main: [...state.main, ...action.payload], offset: state.offset + 10 }

        case FILL_SUBCATALOG_DATA:
            return { ...state, subCatalog: action.payload, subOffset: 10 }

        case FILL_MORE_TO_SUB_CATALOG:
            return { ...state, subCatalog: [...state.subCatalog, ...action.payload], subOffset: state.subOffset + 10 }

        case CLEAR_SUBCATALOG_DATA:
            return { ...state, subCatalog: null }

        case FILL_PRODUCT_DATA:
            if (state.detailsId === action.payload.id) {
                return { ...state, details: action.payload.data }
            }
            return state

        case CLEAR_PRODUCT_DATA:
            return { ...state, details: null, detailsId: action.payload }

        case SET_CATEGORY_PRODUCTS_ID:
            return { ...state, productsId: action.payload }

        case FILL_SHOP_DATA:
            return { ...state, shop: action.payload }

        case FILL_CATALOG_GENDER:
            return { ...state, catalogGender: action.payload }

        case CLEAR_CATALOG_GENDER:
            return { ...state, catalogGender: null }

        case FILL_PRODUCT_LIST:
            if (action.payload.id === state.productsId) {
                return { ...state, products: action.payload.data };
            }
            return state
        case CLEAR_PRODUCTS_LIST:
            return { ...state, products: [], productsId: null }
        case MAX_PRICE_RECEIVED:
            return { ...state, maxPrice: action.payload };
        case FILTERED:
            goBack();
        default:
            return state;
    }
}