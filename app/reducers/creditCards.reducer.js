import { FILL_USER_CARDS, CLEAR_USER_DATA, CARDS_INPUT_CHANGE_VALUE, CHANGE_FILTER_VALUE, CREDIT_CARD_FORM_VALID, RESET_CREDIT_CARD_VALUES } from "../actions/constants/index.constants";
import { searchFirstTwo } from "../utils/searchRegExp.util";

const initialState = {
    cards: null,
    formValid: false,
    values: {
        paymentCheckBox: true,
        card: '',
        expires: '',
        code: '',
        amExpress: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FILL_USER_CARDS:
            let values = fillCardsValues(action.payload)
            return { ...state, cards: action.payload.cards, values, formValid: !!action.payload.cards };
        case CARDS_INPUT_CHANGE_VALUE:
            let data = filterAmExpCard(action.payload)
            return { ...state, values: { ...state.values, ...data } }
        case CHANGE_FILTER_VALUE:
            return {
                ...state, values: fillValuesById(state, action.payload),
                formValid: action.payload.type === 'cards' ? action.payload.data !== 'addNew' : state.formValid
            }
        case CREDIT_CARD_FORM_VALID:
            return { ...state, formValid: action.payload }
        case RESET_CREDIT_CARD_VALUES:
            return { ...state, formValid: false, values: initialState.values }
        case CLEAR_USER_DATA:
            return initialState
        default:
            return state
    }
}
const filterAmExpCard = (data) => {
    let newData = data
    let key = Object.keys(data)[0]
    key === 'card' && (searchFirstTwo(data.card) == 37 || searchFirstTwo(data.card) == 34)
        ? newData.amExpress = true
        : key === 'card' && (searchFirstTwo(data.card) != 37 && searchFirstTwo(data.card) != 34)
            ? newData.amExpress = false
            : newData
    return newData
}
const fillValuesById = (state, data) => {
    let newState = state.values
    if (data.type === 'cards') {
        if (data.data === 'addNew') {
            newState = initialState.values
        } else {
            newState = state.cards.filter(item => item.id == data.data)[0];
            newState['paymentCheckBox'] = false
        }
    }
    return newState
}

const fillCardsValues = (data) => {
    var newState =  {
        paymentCheckBox: true,
        card: '',
        expires: '',
        code: '',
        amExpress: false
    }
    if (data.cards) {
        let primary = data.cards.filter(item => item.primary === true)[0]
        newState = primary
        newState['paymentCheckBox'] = false
    }
    return newState
}