import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import { getOrdersData, getMoreOrders } from '../../actions/orders.actions'
import { getProfileData } from '../../actions/auth.actions'
import moment from 'moment'
import { colors, shadows, flex, weight, width, height } from '../../theme/consts.theme'
import CartItem from '../../components/cart/cartItem.component'
import { capitalize } from '../../utils/string.util'
import { navigate } from '../../utils/navigation.util'
import ShopBag from '../../containers/layout/shopBag.container';
import { Button } from '../../containers/layout'
import withDebounce from '../../utils/debounce.util'
import LoaderComponent from '../../containers/loader/loader.container';

const TouchableOpacityEx = withDebounce(TouchableOpacity);

class Orders extends Component {
    static navigationOptions = {
        headerRight: <ShopBag />,
        headerLeft: <View />,
        title: 'My Orders'
    };
    componentWillMount() {
        if (this.props.backToCart) {
            this.props.getProfileData()
        } else {
            console.log('Start loading orders data')
            this.props.getOrdersData()
        }
    }

    buyerStatus = (pickup) => ({
        1: 'Ordered',
        2: pickup ? 'Ready for pickup from' : `Prepping`,
        3: `Shipped`,
        4: 'Delivered',
        5: 'Picked up',
        6: 'Canceled'
    })

    addMoreGigs = () => {
        const { orders } = this.props;
        let newPage = orders ? orders.length : 0
        this.props.getMoreOrders(newPage)
    }

    keyExtractor = (item, index) => item.id.toString()

    renderItem = ({ item }) => {
        let order = item;
        if (!item) {
            return
        }
        return (
            <TouchableOpacityEx onPress={() => navigate('OrderDetails', { order: order })} style={styles.orderWrapper}>
                <View style={styles.orderIdWrapper}>
                    <Text>ORDER ID: {order.id}</Text>
                </View>
                <View style={styles.orderItemsWrapper}>
                    {order.order_lines.map((order_line, index) =>
                        <CartItem
                            inOrder
                            unBordered={order.order_lines.length === index + 1}
                            key={index.toString()}
                            data={{
                                name: order_line.product.name,
                                image: order_line.product.images[0],
                                quantity: order_line.quantity,
                                price: order_line.product.price,
                                // size: order_line.options[0].name,
                                // color: order_line.options[1].name
                            }}
                        />
                    )}
                </View>
                <View style={styles.orderFooter}>
                    <View style={styles.footerStatus}>
                        <Text style={styles.statusLabel}>Status</Text>
                        <Text style={styles.statusValue}>{order.status && this.buyerStatus(order.order_type === 'pickup')[order.status]}</Text>
                    </View>

                    {(order.status != 6 && order.status != 4) &&
                        <View style={styles.footerDelivery}>
                            <Text style={styles.deliveryLabel}>{order.order_type === 'pickup' ? 'Available for Pickup' : 'Estimated Delivery'}</Text>
                            <Text style={styles.deliveryValue}>
                                {order.pickup_window
                                    ? moment(order.pickup_window).format('MMM DD, YYYY')
                                    : order.estimated_delivery_at
                                        ? moment(order.estimated_delivery_at).format('DD MMM YYYY')
                                        : 'Waiting...'}
                            </Text>
                        </View>
                    }

                </View>
            </TouchableOpacityEx>
        )
    }
    render() {
        const { orders, refreshing, getOrdersData, token } = this.props;

        return (
            <View>
            {
                orders && orders.length
                    ? <FlatList
                        refreshing={refreshing}
                        data={orders}
                        extraData={orders}
                        keyExtractor={this.keyExtractor}
                        renderItem={(item) => this.renderItem(item)}
                        onEndReached={this.addMoreGigs}
                        getItemLayout={(data, index) => (
                            { length: height/3, offset: height/3 * index, index }
                        )}
                        onEndReachedThreshold={0.7}
                        onRefresh={() => getOrdersData(true)}
                    />
                    : <View style={styles.emptyOrdersWrapper}>
                        <Text style={styles.emptyOrdersText}>
                            You have no orders yet, check out what we have in your local stores!
                            </Text>
                        <Button upperCase label='Back to home' action={() => navigate('Home')} />
                    </View>

            }

            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    orderWrapper: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 15,
        ...shadows.default
    },
    orderIdWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    orderItemsWrapper: {
        borderTopWidth: 1,
        borderTopColor: colors.grey,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
    },
    orderFooter: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        ...flex.horizontal,
        ...flex.remote
    },
    statusLabel: {
        fontWeight: weight.semibold,
        color: colors.grey,
        marginBottom: 5
    },
    statusValue: {
        color: colors.red,
        fontWeight: weight.bold,
        fontSize: 15
    },
    deliveryLabel: {
        fontWeight: weight.semibold,
        color: colors.grey,
        marginBottom: 5
    },
    deliveryValue: {
        fontSize: 15,
    },
    emptyOrdersWrapper: {
        marginTop: 100,
        ...flex.full,
        ...flex.centered
    },
    emptyOrdersText: {
        fontWeight: weight.semibold,
        textAlign: 'center',
        alignSelf: 'center',
        width: width['80'],
        marginTop: 20,
        marginBottom: 10,
    }
})

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        refreshing: state.layout.refreshing,
        token: state.auth.token,
        backToCart: state.auth.returnToCheckout,
        page: state.orders.page
    }
}

export default connect(mapStateToProps, { getOrdersData, getProfileData, getMoreOrders })(Orders)
