import {
    ADDRESS_ADD, ADDRESS_DELETED,
    ADDRESS_EDITED,
    ADDRESSES_RECEIVE,
    CLEAR_USER_DATA,
    ADDRESS_INPUT_CHANGE_VALUE,
    ADDRESS_INPUT_CALLBACK,
    CLEAR_ADDRESS_INPUT_VALUES,
    FILL_ADDRESS_FORM,
    CHANGE_FILTER_VALUE,
    PHONE_INPUT_CHANGED,
    FILL_PROFILE_DATA
} from "../actions/constants/index.constants";

const initialState = {
    existingAddresses: null,
    formValid: false,
    phoneInput: '',
    values: {
        saveCheckBox: true,
        apartment: '',
        addressName: '',
        comment: '',
        state: '',
        city: '',
        address: '',
        zip: ''
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADDRESSES_RECEIVE:
            let values = fillValues(action.payload)
            return { ...state, existingAddresses: action.payload, values, formValid: !!action.payload };
        case ADDRESS_ADD:
            if (state.existingAddresses) {
                return {
                    ...state,
                    existingAddresses: [...state.existingAddresses, action.payload],
                    formValid: false,
                    values: initialState.values
                };
            } else {
                return {
                    ...state,
                    existingAddresses: [action.payload],
                    formValid: false,
                    values: initialState.values
                };
            }
        case FILL_PROFILE_DATA:
            return { ...state, phoneInput: action.payload.buyer.phone }

        case ADDRESS_EDITED:
            return {
                ...state,
                existingAddresses: [...state.existingAddresses.filter((item) => item.id !== action.payload.id), action.payload],
                formValid: false,
                values: initialState.values
            };
        case CLEAR_USER_DATA:
            return initialState
        case ADDRESS_INPUT_CHANGE_VALUE:
            return { ...state, values: { ...state.values, ...action.payload } }
        case ADDRESS_INPUT_CALLBACK: {
            const { zip, city, address } = action.payload
            let formValid = !!(zip && city && address && action.payload.state)
            return {
                ...state,
                formValid,
                values: { ...state.values, zip, address, city, state: action.payload.state }
            }
        }
        case FILL_ADDRESS_FORM:
            return { ...state, values: { ...action.payload }, formValid: true }
        case CHANGE_FILTER_VALUE:
            return {
                ...state, values: fillValuesById(state, action.payload),
                formValid: action.payload.type === 'addresses' ? action.payload.data !== 'addNew' : state.formValid
            }
        case CLEAR_ADDRESS_INPUT_VALUES:
            return { ...state, values: initialState.values, formValid: false }
        case PHONE_INPUT_CHANGED:
            return { ...state, phoneInput: action.payload }
        default:
            return state
    }
}

const fillValuesById = (state, data) => {
    let newState = state.values
    if (data.type === 'addresses') {
        if (data.data === 'addNew') {
            newState = initialState.values
            newState['saveCheckBox'] = true
        } else {
            newState = state.existingAddresses.filter(item => item.id == data.data)[0];
            newState['saveCheckBox'] = false
        }
    } else {
        newState = state.values
    }
    return newState
}

const fillValues = (data) => {
    let newState = {
        saveCheckBox: true,
        apartment: '',
        name: '',
        comment: '',
        state: '',
        city: '',
        address: '',
        zip: ''
    }
    if (data) {
        newState = data.filter(item => item.is_primary === true)[0];
        if (!newState) {
            newState = data[0]
        }
        newState.saveCheckBox = false
    }
    return newState
}