import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getShopDetails } from '../../actions/catalog.actions'
import ArrowBack from '../../containers/layout/arrowBack.container'
import { ItemsList } from '../../containers/layout'
import { flex, width, colors, weight } from '../../theme/consts.theme';
import { DEFAULT_URL } from '../../utils/config.util';

class ShopScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
        headerLeft: <ArrowBack />
    })
    componentWillMount() {
        let id = this.props.navigation.state.params.id
        this.props.getShopDetails(id)
    }
    render() {
        const { shop_name, address, shopProducts, photo, products } = this.props.state !== null && this.props.state,
            shopDetails = [{
                label: 'Name',
                value: shop_name
            },
            {
                label: 'Address',
                value: address
            }]

        return (
            <ScrollView >
                <Image
                    style={styles.shopImage}
                    source={{ uri: `${DEFAULT_URL}/photos/${photo}` }}
                // source={require('../../theme/images/touchIdImage.png')}
                />
                <View style={styles.shopDetails}>
                    {shopDetails.map((item, index) =>
                        <View key={index} style={[styles.detailsItem, shopDetails.length === index + 1 && styles.detailsItemUnbordered]}>
                            <Text style={styles.itemLabel}>{item.label}</Text>
                            <Text
                                style={{ width: width['100'] * 0.7 }}
                                numberOfLines={2}
                            >{item.value}</Text>
                        </View>
                    )}
                </View>
                <ItemsList
                    data={products}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    shopImage: {
        width: width['100'],
        height: width['100'],
        backgroundColor: colors.grey,
        resizeMode: 'contain'
    },
    shopDetails: {
        width: width['100'],
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        borderTopWidth: 1,
        borderTopColor: colors.grey
    },
    detailsItem: {
        ...flex.remote,
        ...flex.horizontal,
        marginHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey
    },
    detailsItemUnbordered: {
        borderBottomWidth: 0
    },
    itemLabel: {
        color: colors.grey,
        fontWeight: weight.semibold
    }
})

const mapStateToProps = state => {
    return {
        state: state.catalog.shop
    }
}

export default connect(mapStateToProps, { getShopDetails })(ShopScreen)