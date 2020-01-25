import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Button } from '../../containers/layout/index'
import CartItem from './cartItem.component'
import { removeItem, increment, decrement, clearCart } from '../../actions/cart.actions'
import {signUpOnCheckout} from '../../actions/auth.actions';
import ArrowBack from '../../containers/layout/arrowBack.container'
import { colors, weight, flex, shadows } from '../../theme/consts.theme'
import { navigate } from '../../utils/navigation.util'

class CartScreen extends Component {
    static navigationOptions = {
        title: 'My Cart',
        headerLeft: <ArrowBack />,
        headerRight: (<View />),
    };
    calcTotal = () => {
        let total = this.props.cart.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0)
        return total
    };
    render() {
        const { cart, token, increment, decrement, removeItem, clearCart } = this.props,
            quantity = `${cart.length} item${cart.length !== 1 ? 's' : ''} `.toUpperCase()

        return (
            <View style={flex.full}>
                <ScrollView style={styles.cartItemsWrapper}>
                    {cart.length > 0
                        ? (
                            <Text style={styles.cartHeader}>
                                <Text style={styles.cartHeaderQuantity}>
                                    {quantity}
                                </Text>
                                in your cart
                            </Text>
                        )
                        : <Text style={styles.cartHeaderEmpty}>Your cart is empty</Text>
                    }
                    {cart.map((item, index) =>
                        <CartItem
                            actions={{
                                increment: increment,
                                decrement: decrement,
                                removeItem: removeItem,
                                clearCart: clearCart
                            }}
                            cartLength={cart.length}
                            key={index}
                            data={item}
                        />
                    )}
                </ScrollView>
                {cart.length > 0 &&
                    <View style={styles.cartFooter}>
                        <View style={styles.cartSummaryWrapper}>
                            <Text style={styles.cartSummaryLabel}>
                                Subtotal:
                            </Text>
                            <Text style={styles.cartSummaryPrice}>
                                ${this.calcTotal().toFixed(2)}
                            </Text>
                        </View>
                        {!token &&
                            <Text style={styles.signUpText}>
                                Sign Up to Check out
                            </Text>
                        }
                        <Button
                            upperCase
                            action={() => !token
                                ? (navigate('Auth', {title: 'Sign Up'}), this.props.signUpOnCheckout())
                                : navigate('CheckOut')}
                            label={!token
                                ? 'Sign Up'
                                : 'Check out'}
                        />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cartHeader: {
        fontWeight: weight.semibold,
        margin: 15
    },
    cartHeaderQuantity: {
        color: colors.red
    },
    cartHeaderEmpty: {
        alignSelf: 'center',
        marginVertical: 20,
        fontWeight: weight.semibold
    },
    cartItemsWrapper:{
        marginBottom: 130
    },
    cartFooter: {
        alignItems: 'center',
        position: 'absolute',
        width: Dimensions.get('window').width,
        bottom: 0,
        paddingBottom: 10,
        backgroundColor: colors.white,
        ...shadows.default
    },
    cartSummaryWrapper: {
        ...flex.horizontal,
        marginVertical: 15,
        alignItems: 'center'
    },
    cartSummaryLabel: {
        fontWeight: weight.semibold,
        color: colors.grey,
        marginRight: 5
    },
    cartSummaryPrice: {
        fontWeight: weight.bold,
        fontSize: 16
    },
    signUpText: {
        marginVertical: 10
    }
})

const mapStateToProps = (state) => {
    return {
        cart: state.cart.items,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps, {
    removeItem,
    increment,
    decrement,
    clearCart,
    signUpOnCheckout
})(CartScreen)  