import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { flex, icons, colors, weight, width } from '../../theme/consts.theme'
import Swipeout from 'react-native-swipeout'
import { capitalize } from '../../utils/string.util'
import { DEFAULT_URL } from '../../utils/config.util';
import ImageLoader from '../../containers/layout/imageLoader.container';

class CartItem extends Component {

    decrementPress = () => {
        const { data, actions } = this.props
        data.quantity > 1 
            ? actions.decrement(data) 
            :  Alert.alert('Attention!',
            'Item will be removed from cart, are you sure you want to delete this item?',
            [{
                text: 'Yes', onPress: () => actions.removeItem(data)
            },
            {text: 'No'}
        ])
    }
    render() {
        const { data, inOrder, unBordered, cartLength, actions } = this.props,
            swipeOutBtns = [{
                text: 'Delete',
                backgroundColor: colors.red,
                onPress: () => cartLength === 1 ? actions.clearCart() : actions.removeItem(data)
            }];

        return (
            <Swipeout
            autoClose
            backgroundColor='transparent' 
            right={swipeOutBtns} 
            disabled={inOrder}>
                <View style={[styles.itemWrapper, inOrder && styles.itemWrapperOrder, unBordered && styles.itemWrapperUnbordered]}>
                    <ImageLoader
                        style={[styles.itemImage, inOrder && styles.itemImageOrder]}
                        source={{ uri: data.image }}
                    />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemInfoName}>
                            {capitalize(data.name)}
                        </Text>
                        <Text style={styles.itemInfoPrice}>
                            $ {(data.price * data.quantity).toFixed(2)}
                        </Text>
                        {/* {data.variation.options.map((option, index) =>
                            <View key={index} style={styles.parameter}>
                                <Text style={styles.parameterLabel}>
                                    {option.feature.name.toUpperCase()}:
                            </Text>
                                <Text style={styles.parameterValue}>
                                    {capitalize(option.name)}
                                </Text>
                            </View>
                        )} */}
                        {inOrder &&
                            <View style={styles.parameter}>
                                <Text style={styles.parameterLabel}>
                                    QUANTITY:
                            </Text>
                                <Text style={styles.parameterValue}>
                                    {data.quantity}
                                </Text>
                            </View>
                        }
                    </View>
                    {!inOrder &&
                        <View style={styles.itemAction}>
                            <TouchableOpacity
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                onPress={() => data.quantity < data.variation.quantity && actions.increment(data)}
                            >
                                {icons.increment}
                            </TouchableOpacity>
                            <View style={styles.itemQuantity}>
                                <Text style={styles.itemQuantityText}>
                                    {data.quantity}
                                </Text>
                            </View>
                            <TouchableOpacity
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                onPress={this.decrementPress}
                            >
                                {icons.decrement}
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
    itemWrapper: {
        ...flex.horizontal,
        ...flex.remote,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        marginHorizontal: 15,
        paddingVertical: 15
    },
    itemImage: {
        height: 125,
        width: 100,
        backgroundColor: colors.grey
    },
    itemInfo:{
        width: width['100'] - 160
    },
    itemInfoName: {
        marginBottom: 5,
        paddingHorizontal: 10,  
        fontSize: 16
    },
    itemInfoPrice: {
        paddingHorizontal: 10,
        fontWeight: weight.bold,
        marginBottom: 7.5
    },
    parameter: {
        ...flex.horizontal,
        marginVertical: 5
    },
    parameterLabel: {
        color: colors.grey,
        fontWeight: weight.semibold,
        marginRight: 5,
    },
    parameterValue: {
        fontWeight: weight.semibold
    },
    itemAction: {
        ...flex.remote
    },
    itemQuantity: {
        ...flex.centered,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.grey,
        height: 30,
        width: 30
    },
    itemWrapperOrder: {
        justifyContent: 'flex-start'
    },
    itemImageOrder: {
        marginRight: 15
    },
    itemWrapperUnbordered: {
        borderBottomWidth: 0
    }
})

export default CartItem