import {
  MAX_PRICE_RECEIVED,
  CLOSE_PICKER,
  CHANGE_FILTER_VALUE,
  PICKER_OPEN,
  CLEAR_USER_DATA,
  ADDRESSES_RECEIVE,
  FILL_USER_CARDS,
  CLEAR_SUBCATALOG_DATA
} from "../actions/constants/index.constants";
import { fillFeatures, fillAddresses, fillCards } from "../utils/controlState.util";

const initialState = {
  pickerVisible: false,
  type: null,
  distance: {
    selected: 10,
    controlType: "picker",
    values: [1, 5, 10, 25, 50, 100]
  },
  gender: {
    selected: "All",
    controlType: "picker",
    values: ["All", "Men", "Women", "Kids"]
  },
  price: {
    controlType: "slider",
    selected: [1, 10000],
    minValue: 1,
    maxValue: 10000
  },
  sorting: {
    selected: "Nearest",
    controlType: "picker",
    values: ["Nearest", "Price Low to high", "Price High to low", "Name A to Z", "Name Z to A"]
  },
  addresses: {
    selected: "",
    controlType: "picker",
    values: []
  },
  cards: {
    selected: "",
    controlType: "picker",
    values: []
  },
  features: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PICKER_OPEN:
      return { ...state, pickerVisible: true, type: action.payload };
    case MAX_PRICE_RECEIVED:
      const features = fillFeatures(initialState, action.payload);
      return features;
    case CLOSE_PICKER:
      return { ...state, pickerVisible: false, type: null };
    case CLEAR_SUBCATALOG_DATA:
      return initialState;
    case CHANGE_FILTER_VALUE:
      return {
        ...state,
        [state.type]: {
          ...state[state.type],
          selected: action.payload.data
        }
      };
    case ADDRESSES_RECEIVE:
      const addresses = fillAddresses(action.payload);
      return { ...initialState, addresses: addresses };
    case FILL_USER_CARDS:
      const cards = fillCards(action.payload);
      return { ...state, cards };
    case CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
};