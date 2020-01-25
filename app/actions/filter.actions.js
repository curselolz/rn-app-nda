import { CLOSE_PICKER, CHANGE_FILTER_VALUE, PICKER_OPEN } from "./constants/index.constants";

export const filterPicked = (type) => dispatch => {
    dispatch({ type: PICKER_OPEN, payload: type })
}

export const closePicker = () => {
    return { type: CLOSE_PICKER }
}

export const changeFilterValue = (data) =>(dispatch, getState)=> {
    dispatch ({ type: CHANGE_FILTER_VALUE, payload: {data, type: getState().filters.type}})
}