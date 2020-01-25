import {
    FILL_HOME_DATA,
    TOGGLE_REFRESHING,
    ADD_MORE_TO_HOME,
    USER_COORDS
} from './constants/index.constants'
import axios from 'axios'

export const getHomeData = (coords, refresh, firstLoad) => (dispatch, getState) => {
    let filters = getState().filters
    let productsOffset = getState().home.offSet
    dispatch({type: USER_COORDS, payload: coords})
    const genderHelper = {
        'All': '',
        'Men': 'man',
        'Women': 'woman',
        'Kids': 'kid'
    },
        { gender, price, distance, sorting } = filters,
        genderQuery = genderHelper[gender.selected]
            ? `&gender=${genderHelper[gender.selected]}`
            : '',
        priceQuery = price.selected
            ? `&min_price=${price.selected[0]}&max_price=${price.selected[1]}`
            : '',
        distanceQuery = distance.selected
            ? `&min_distance=0&max_distance=${distance.selected}`
            : '',
        sortingString = sorting.selected === 'Price High to low'
            ? '&price_order=desc'
            : sorting.selected === 'Price Low to high'
                ? '&price_order=asc'
                : sorting.selected === 'Name A to Z'
                    ? '&name_order=asc'
                    : sorting.selected === 'Name Z to A'
                        ? '&name_order=desc'
                        : '',
            offset = `&offset=${(refresh || firstLoad )? 0 : productsOffset}`
    const url = `/buyer/products?lat=${coords.lat}&lng=${coords.lng}`
        + `${genderQuery}${priceQuery}${distanceQuery}${sortingString}${offset}`
    console.log('refresh url', url);

    refresh && dispatch({ type: TOGGLE_REFRESHING });
    axios({
        ...axios.defaults,
        method: 'get',
        url
    })
        .then(response => {
            let res = response.data
            if (res.success) {
                if(firstLoad || refresh) {
                    dispatch({ type: FILL_HOME_DATA, payload: {data: res.data, search: false} })
                    refresh && dispatch({ type: TOGGLE_REFRESHING })
                }else{
                    res.data && res.data.other_products.length && dispatch({ type: ADD_MORE_TO_HOME, payload: res.data })
                }
            }else{
                if(!error.response.message) {
                    console.log('HERE');
                } else {
                    console.log(error);
                }
                alert(res.message)
            }
        })
        .catch(error => {
            console.log(error)
            refresh && dispatch({ type: TOGGLE_REFRESHING })
        })
}
