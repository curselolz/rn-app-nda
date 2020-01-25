import {connect} from 'react-redux'
import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {colors, weight, icons, shadows} from '../../theme/consts.theme'
import {navigate} from '../../utils/navigation.util'
import NotificationBell from "../notifications/notificationBell.container";

class ShopBag extends Component {
    render() {
        const {token, cart} = this.props;
        return (
            <View style={styles.wraperView}>
                {token && <NotificationBell
                    count={this.props.notificationsCount}
                />}

                <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 0, right: 10}} style={styles.shopItemsWrapper}
                                  onPress={() => navigate('Cart')}>
                    <View style={styles.shopItemsCount}>
                        <Text style={styles.shopItemsText}>
                            {cart.length}
                        </Text>
                    </View>
                    {icons.shopBag}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wraperView: {
        flexDirection: 'row',
        height: 31,
        marginBottom: 5,

    },
    shopItemsWrapper: {
        position: 'relative',
        paddingLeft: 7.5,
        marginRight: 15
    },
    shopItemsCount: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: colors.white,
        height: 15,
        width: 15,
        ...shadows.default
    },
    shopItemsText: {
        color: colors.black,
        fontSize: 10
    }
});

const mapStateToProps = ({cart, notifs, auth}) => {
    return {
        cart: cart.items,
        notificationsCount: notifs.count,
        token: auth.token
    }
};

export default connect(mapStateToProps)(ShopBag)