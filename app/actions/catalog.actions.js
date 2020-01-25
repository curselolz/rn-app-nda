import {
    FILTERED,
    FILL_CATALOG_DATA,
    FILL_SUBCATALOG_DATA,
    CLEAR_SUBCATALOG_DATA,
    FILL_PRODUCT_DATA,
    CLEAR_PRODUCT_DATA,
    FILL_SHOP_DATA,
    FILL_CATALOG_GENDER,
    CLEAR_CATALOG_GENDER,
    FILL_PRODUCT_LIST,
    SHOW_BTN_SPINNER,
    TOGGLE_REFRESHING,
    HIDE_BTN_SPINNER,
    FILL_HOME_DATA,
    HIDE_SEARCH_SPINNER,
    SHOW_SEARCH_SPINNER, MAX_PRICE_RECEIVED, FILL_SHOP_WORK_TIME, CLEAR_PRODUCTS_LIST, FILL_MORE_TO_CATALOG, FILL_MORE_TO_SUB_CATALOG, SET_CATEGORY_PRODUCTS_ID
} from './constants/index.constants';
import axios from 'axios';

export const getCatalogData = (gender, refresh, loadMore) => (dispatch, getState) => {
    const productsOffset = getState().catalog.offset
    let url = (gender !== undefined && gender !== null)
        ? `/categories/?gender=${gender.toLowerCase()}&with_products=true`
        : '/categories/?gender=man&with_products=true',
        offset = loadMore ? `&offset=${productsOffset}` : ''
    url += offset
    console.log('getCatalogData URL ', loadMore, url)
    refresh && dispatch({ type: TOGGLE_REFRESHING })
    dispatch({ type: FILL_CATALOG_GENDER, payload: gender })

    axios({
        ...axios.defaults,
        method: 'get',
        url: url
    })
        .then(response => {
            const res = response.data;
            res.success && (
                refresh && dispatch({ type: TOGGLE_REFRESHING }),
                loadMore
                    ? res.data.rows.length && dispatch({ type: FILL_MORE_TO_CATALOG, payload: res.data.rows })
                    : dispatch({ type: FILL_CATALOG_DATA, payload: res.data.rows }))
        })
        .catch(error => console.log(error))

}
export const getSubCatalogData = (path, refresh, loadMore) => (dispatch, getState) => {
    const productsOffset = getState().catalog.subOffset
    let url = `/categories/${path}/?with_products=true`,
        offset = loadMore ? `&offset=${productsOffset}` : ''
    url += offset

    refresh && dispatch({ type: TOGGLE_REFRESHING })

    console.log('PATH getSubCatalogData', url)


    !loadMore && dispatch({ type: CLEAR_SUBCATALOG_DATA });
    axios({
        ...axios.defaults,
        method: 'get',
        url
    })
        .then(response => {
            let res = response.data;
            console.log(res);
            refresh && dispatch({ type: TOGGLE_REFRESHING })
            if (res.success) {
                loadMore
                    ? res.data.length && dispatch({ type: FILL_MORE_TO_SUB_CATALOG, payload: res.data })
                    : dispatch({ type: FILL_SUBCATALOG_DATA, payload: res.data })
            } else {
                !loadMore && dispatch({ type: FILL_SUBCATALOG_DATA, payload: [] })
            }
        })
        .catch(error => {
            console.log('Error from get sub catalog', error.response)
            refresh && dispatch({ type: TOGGLE_REFRESHING })
        })
};

export const getCategoryProducts = (id) => dispatch => {
    // dispatch({ type: CLEAR_SUBCATALOG_DATA });
    dispatch({ type: CLEAR_PRODUCTS_LIST })
    dispatch({ type: SET_CATEGORY_PRODUCTS_ID, payload: id})
    let url = `/category-products/${id}`
    axios({
        ...axios.defaults,
        method: 'get',
        url
    })
        .then(response => {
            let res = response.data;
            res.success
                ? dispatch({ type: FILL_PRODUCT_LIST, payload: {data: res.data, id} })
                : dispatch({ type: FILL_PRODUCT_LIST, payload: {data:[], id} })
        })
        .catch(error => console.log('Error from get sub catalog', error.response))

}

export const getProductDetails = (id) => {
    return dispatch => {

        dispatch({ type: CLEAR_PRODUCT_DATA, payload: id });


        axios({
            ...axios.defaults,
            method: 'get',
            url: `/products/${id}`
        })
            .then(response => {
                let res = response.data

                res.success && dispatch({ type: FILL_PRODUCT_DATA, payload: {data: res.data, id} })
            })
            .catch(error => console.log(error))
    }
}

export const getShopDetails = (id) => {
    return dispatch => {
        axios({
            ...axios.defaults,
            method: 'get',
            url: `/shops/${id}?with_products=true`
        })
            .then(response => {
                let res = response.data

                res.success && dispatch({ type: FILL_SHOP_DATA, payload: res.data })
            })
            .catch(error => console.log(error))
    }
}

export const getShopWorkTime = (id) => dispatch => {
    axios({
        ...axios.defaults,
        method: 'get',
        url: `/shops/${id}`
    })
        .then(response => {
            let res = response.data
            res.success && dispatch({ type: FILL_SHOP_WORK_TIME, payload: res.data })
        })
        .catch(error => {

            console.log('errrrrr', error.response)
        })
}

export const filterCatalogData = (data) => (dispatch, getState) => {
    const genderHelper = {
        'All': '',
        'Men': 'man',
        'Women': 'woman',
        'Kids': 'kid'
    },
        { gender, price, distance, path, coords, sorting, category } = data,
        startUrl = path
            ? `category-products/${path}`
            : `buyer/products`,
        genderQuery = genderHelper[gender]
            ? `gender=${genderHelper[gender]}`
            : '',
        priceQuery = price
            ? `&min_price=${price[0]}&max_price=${price[1]}`
            : '',
        coordsQuery = coords
            ? `&lat=${coords.lat}&lng=${coords.lng}`
            : '',
        distanceQuery = distance
            ? `&min_distance=${distance[0]}&max_distance=${distance[1]}`
            : '',
        sortingString = sorting === 'Price High to low'
            ? '&price_order=desc'
            : sorting === 'Price Low to high'
                ? '&price_order=asc'
                : sorting === 'Name A to Z'
                    ? '&name_order=asc'
                    : sorting === 'Name Z to A'
                        ? '&name_order=desc'
                        : ''
    let filterFeatures = ''
    console.log('PATH : ', path, 'and gender query:', genderQuery)
    if (getState().filters.features && category) {
        const features = getState().filters.features
        features.map(item => {
            if (data[item].id !== 'None') {
                let feature = `&feature_${data[item].feature}[]=${data[item].id}`
                filterFeatures += feature
            }

        })
    }
    const searchUrl = `/${startUrl}/?${genderQuery}` +
        `${priceQuery}${distanceQuery}${coordsQuery}${sortingString}${filterFeatures}`;
    console.log('search string do we send', searchUrl)
    dispatch({ type: SHOW_BTN_SPINNER })
    axios({
        ...axios.defaults,
        method: 'get',
        url: searchUrl
    })
        .then(response => {
            const res = response.data;
            console.log('RES AFTER filter apply: ', res)
            res.success
                ? dispatch({
                    type: path
                        ? FILL_PRODUCT_LIST
                        : FILL_HOME_DATA, payload: path ? {data :res.data, id: path} :{ data: res.data, search: false }
                })
                : dispatch({
                    type: path
                        ? FILL_PRODUCT_LIST
                        : FILL_HOME_DATA, payload: { data: [], search: false }
                })

            dispatch({ type: HIDE_BTN_SPINNER });
            dispatch({ type: FILTERED });
        })
        .catch(error => console.log(error))

}

export const searchByName = (value, path, isCatalog, coords) => {
    return dispatch => {
        const url = path
            ? `categories/${path}`
            : `buyer/products`,
            coordsQuery = coords
                ? `&lat=${coords.lat}&lng=${coords.lng}`
                : '',
            distanceQuery = `&min_distance=${0}&max_distance=${10}`;

        dispatch({ type: SHOW_SEARCH_SPINNER })
        axios({
            ...axios.defaults,
            method: 'get',
            url: `/${url}/?with_products=true&name=${value.toLowerCase()}${coordsQuery}${distanceQuery}`
        })
            .then(response => {
                let res = response.data;
                res.success
                    ? dispatch({
                        type: path
                            ? FILL_PRODUCT_LIST
                            : FILL_HOME_DATA,
                        payload: isCatalog
                            ? {data: res.data[0].products, id: null}
                            : { data: res.data, search: true }
                    })
                    : dispatch({
                        type: path
                            ? FILL_PRODUCT_LIST
                            : FILL_HOME_DATA, payload: { data: [], search: true }
                    })
                dispatch({ type: HIDE_SEARCH_SPINNER })
            })
            .catch(error => {
                dispatch({ type: HIDE_SEARCH_SPINNER });
                console.log(error);
            })
    }
};

export const getFilterDetails = (id) => dispatch => {
    let url = `/autocomplete/filter-details`
    if (id) {
        url = url + `?subcategory_id=${id}`
    }
    axios({
        ...axios.defaults,
        method: 'get',
        url
    })
        .then(response => {

            let res = response.data;
            res.success && dispatch({ type: MAX_PRICE_RECEIVED, payload: { price: res.data.maxPrice, data: res.data.features } })
        })
        .catch(error => console.log('Error from get max price', error.response))
};