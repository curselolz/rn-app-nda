import React, { Component } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, Alert, StyleSheet, Dimensions, FlatList } from 'react-native'
import { Button } from '../../containers/layout/index'
import orderBy from 'lodash.orderby';
import ArrowBack from '../../containers/layout/arrowBack.container'
import ShopBag from '../../containers/layout/shopBag.container'
import { colors, flex, weight, icons, } from '../../theme/consts.theme'
import { connect } from 'react-redux'
import { addItem, increment, clearCart } from '../../actions/cart.actions'
import { getProductDetails } from '../../actions/catalog.actions'
import { navigate } from '../../utils/navigation.util'
import Feature from './feature.container';
import difference from 'lodash.difference';
import ItemHeader from './itemHeader.container';
import { DEFAULT_URL } from '../../utils/config.util';
import LoaderComponent from '../loader/loader.container';
import ImageLoader from '../layout/imageLoader.container';
import { htmlParser } from '../../utils/htmlParser.util';

class ItemDetailsScreen extends Component {
    static navigationOptions =({navigation})=> ({
        title: 'Details',
        headerLeft: <ArrowBack navigation={navigation} pop/>,
        headerRight: <ShopBag />
    })
    state = {
        features: [],
        selectedFeatures: [],
        inited: false,
        variation: {
            id: null,
            quantity: null
        }
    }
    componentWillMount() {
        console.log('Mount new details screen')
        this.props.getProductDetails(this.props.navigation.state.params.id)
    }
    componentWillReceiveProps(nextProps) {
        !this.state.inited && nextProps.data !== null && this.getFeatures(nextProps.data.variations)
        if(nextProps.navigation !== this.props.navigation) {
            nextProps.navigation.state.params 
            && nextProps.getProductDetails(nextProps.navigation.state.params.id)
        }
    }
    handleAdd = () => {
        let selectedVariation = null;
        this.props.data.variations.map(variation =>
            difference(this.state.selectedFeatures.map(feature =>
                feature.id),
                variation.options.map(option => option.id)).length === 0 && (selectedVariation = variation)
        )

        const { data, cart, cartShop, clearCart, addItem } = this.props,
            { id, shop_id, price, name, images, shopify_id } = data,
            item = {
                id: id,
                shop_id: shop_id,
                shop_adress: data.shop.address,
                price: price,
                name: name,
                image: shopify_id ? images[0] :`${DEFAULT_URL}/photos/${images[0]}`,
                quantity: 1,
                variation: selectedVariation
            };

        (cart.filter(cartItem => cartItem.variation.id === selectedVariation.id).length > 0)
            ? Alert.alert(
                'Product already in cart!',
                'Please select another variation or go to the cart to change the quantity.',
                [{
                    text: 'Ok',
                    onPress: () => null, style: 'cancel'
                }]
            )
            : (cartShop !== null) && (cartShop !== shop_id)
                ? Alert.alert(
                    'You have added a product from another shop!',
                    'If you want to continue, cart will be cleared and item will be added',
                    [
                        {
                            text: 'OK',
                            onPress: () => (clearCart(), addItem(item))
                        },
                        {
                            text: 'Cancel',
                            onPress: () => null, style: 'cancel'
                        },
                    ]
                )
                : addItem(item);

        this.setState({ selectedFeatures: [] }, () => this.getFeatures(data.variations))
    }
    handleFeature = item => {
        const filteredSelectedFeatures = this.state.selectedFeatures.filter(option => option.feature_id !== item.feature_id),
            selectedFeaturesMutated = [...filteredSelectedFeatures, {
                id: item.id,
                feature_id: item.feature_id
            }];

        this.setState({
            selectedFeatures: selectedFeaturesMutated
        }, () => this.getFeatures(this.props.data.variations))
    }
    getFeatures = variations => {
        const filterVariations = this.state.selectedFeatures.length !== 0;
        let features = [],
            availableVariations = filterVariations
                ? []
                : variations

        filterVariations && variations.map(variation =>
            difference(this.state.selectedFeatures.map(feature =>
                feature.id),
                variation.options.map(option => option.id)).length === 0 && availableVariations.push(variation)
        )

        availableVariations.map(variation =>
            variation.quantity !== 0 && variation.options.map(option => {
                (features.filter(item =>
                    item.id === option.feature_id).length === 0) && features.push({
                        id: option.feature_id,
                        name: option.feature.name,
                        data: variations.filter(v => v.quantity !== 0).reduce((acc, nestedVariation) => {
                            const alreadyExistOptions = acc.map(option => option.id),
                                optionsWithSameType = nestedVariation.options.filter(nestedOption =>
                                    nestedOption.feature_id === option.feature_id);

                            return (optionsWithSameType.length !== 0 && !alreadyExistOptions.includes(optionsWithSameType[0].id))
                                ? acc.concat([{
                                    ...optionsWithSameType[0],
                                    disabled: !this.setDisabled(availableVariations, optionsWithSameType[0].id)
                                }])
                                : acc
                        }, [])
                    })
            })
        )

        this.setState({
            features: orderBy(features, 'id', 'asc'),
            selectedFeatures: variations.length === 1
                ? features.map(feature => ({
                    id: feature.data[0].id,
                    feature_id: feature.data[0].feature_id
                }))
                : this.state.selectedFeatures
        });
    }
    setDisabled = (variations, id) => {
        let state = false;

        variations.map(disVariation =>
            disVariation.options.map(disOption => disOption.id === id && (state = true)))

        return state;
    }
    render() {
        const { data, cart } = this.props,
            { name, price, description, shop, images, variations, shopify_id } = data !== null && data;
            let quantityExist = variations && variations.filter(item => item.quantity !== 0).length
            console.log('FEATURES :', this.state.features)
        return (
            data !== null ? <ScrollView>
                <ItemHeader
                    images={images}
                    name={name}
                    price={price}
                    shopify_id={shopify_id}
                />
                <View style={styles.itemSection}>
                    <Text style={styles.itemSectionHeader}>
                        Description
                    </Text>
                    <Text style={styles.itemDescription}>
                        {htmlParser(description)}
                    </Text>
                </View>
                {this.state.features.map((feature, index) =>
                    <Feature
                        action={item => item.disabled
                            ? this.setState({ selectedFeatures: [] }, () => this.handleFeature(item))
                            : this.handleFeature(item)}
                        label={feature.name}
                        data={feature.data}
                        selected={this.state.selectedFeatures}
                        key={index}
                    />
                )}
                <View style={[styles.itemSection, styles.buttonSection]}>
                    <Button
                        disabled={(this.state.selectedFeatures.length !== this.state.features.length) || variations.length === 0 || !quantityExist
                            ? true
                            : false}
                        action={this.handleAdd}
                        upperCase
                        label={cart.filter(cartItem => cartItem.variationId === this.state.variation.id).length > 0
                            ? 'In cart'
                            : (variations.length === 0 || !quantityExist) ? 'No variations available' : 'Add to cart'}
                    />
                </View>
                <View style={[styles.itemSection, flex.centered]}>
                    <ImageLoader
                        style={styles.imageShop}
                        source={{ uri: `${DEFAULT_URL}/photos/${shop.photo}` }}
                    />
                    <TouchableOpacity style={styles.shopLink} onPress={() => navigate('ShopDetails', { id: shop.id, name: shop.shop_name })}>
                        <Text>Go to store</Text>
                        {icons.arrowForward}
                    </TouchableOpacity>
                </View>
            </ScrollView>
                : <LoaderComponent />
        )
    }
}

const styles = StyleSheet.create({
    itemSection: {
        padding: 15,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1
    },
    itemSectionHeader: {
        fontWeight: weight.semibold,
        marginBottom: 10
    },
    itemDescription: {
        color: colors.grey
    },
    buttonSection: {
        alignItems: 'center'
    },
    imageShop: {
        width: 50,
        height: 50,
        marginBottom: 5
    },
    shopLink: {
        ...flex.remote,
        ...flex.horizontal,
        width: 85,
    }
})


const mapStateToProps = (state) => {
    return {
        cart: state.cart.items,
        cartShop: state.cart.shop_id,
        data: state.catalog.details
    }
}

export default connect(mapStateToProps, {
    addItem,
    increment,
    getProductDetails,
    clearCart
})(ItemDetailsScreen)