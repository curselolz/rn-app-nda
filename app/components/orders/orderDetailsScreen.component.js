import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native'
import ArrowBack from '../../containers/layout/arrowBack.container'
import CartItem from '../../components/cart/cartItem.component'
import { colors, weight, flex, width } from '../../theme/consts.theme'
import { connect } from 'react-redux'
import { getOrderById } from '../../actions/orders.actions'
import moment from 'moment'
import { capitalize } from '../../utils/string.util';
import LoaderComponent from '../../containers/loader/loader.container';

class OrderDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Order: ${navigation.state.params.id || navigation.state.params.order.id}`,
        headerLeft: <ArrowBack
            navigation={navigation}
            goto='Order'
        />,
        headerRight: <View />
    })

    componentWillMount() {
        // console.log(this.props.navigation.state.params);
        const id = this.props.navigation.state.id;
        if (id) {
            console.log(id);
            this.props.getOrderById(id)
        }
    }

    render() {
        var data = null
        if (this.props.details || this.props.navigation.state.params.order) {
            data = this.props.navigation.state.params.order || this.props.details,
                deliverySteps = [{
                    label: 'Ordered',
                    width: Dimensions.get('window').width * 0,
                    id: '1'
                }, {
                    label: 'Prepping',
                    width: Dimensions.get('window').width * 0.25 + 30,
                    id: '2'
                }, {
                    label: 'Shipped',
                    width: Dimensions.get('window').width * 0.75 - 50,
                    id: '3'
                }, {
                    label: 'Delivered',//'Completed',
                    width: Dimensions.get('window').width - 30,
                    id: '4'
                }
                ],
                currentStatus = deliverySteps.filter(step => step.id == data.status);
        }
        if (!data) {
            return <LoaderComponent />
        }
        return (
            <ScrollView>
                <View style={styles.orderItemsWrapper}>
                    {data.order_lines.map((order_line, index) =>
                        <CartItem
                            inOrder
                            unBordered={data.order_lines.length === index + 1}
                            key={index}
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
                <View style={styles.orderDetailsData}>
                    <Text style={styles.dataStatus}>
                        {currentStatus.label}
                    </Text>
                    <View style={styles.deliveryWrapper}>
                        {(data.status == 4 || data.status == 6 || data.status == 5)

                            ? <Text style={{ fontSize: 25, fontWeight: 'bold', width: width['100'], textAlign: 'center' }}>
                                {data.status == 4
                                    ? 'Delivered!'
                                    : data.status == 5
                                        ? 'Picked up!'
                                        : data.status == 6
                                            ? 'Canceled'
                                            : ''}
                            </Text>
                            : <React.Fragment>
                                <Text style={styles.deliveryLabel}>
                                    {data.order_type === 'delivery' ? 'Estimated Delivery:' : 'Available to pickup from:'}
                                </Text>
                                <Text style={styles.deliveryValue}>
                                    {data.estimated_delivery_at
                                        ? moment(data.estimated_delivery_at).format('DD MMM, YYYY')
                                        : data.pickup_window ? moment(data.pickup_window).format('MMM DD, YYYY') : 'Waiting...'}
                                </Text>
                            </React.Fragment>
                        }
                    </View>
                    {data.order_type === 'delivery' && currentStatus.length &&
                        <View style={styles.deliverySteps}>
                            <View style={styles.stepsWrapper}>
                                {deliverySteps.map((item, index) =>
                                    <View key={index} style={styles.stepWrapper}>
                                        <Text style={styles.stepLabel}>
                                            {item.label}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.stepsPointsWrapper}>
                                <View style={[styles.stepPoint,
                                currentStatus[0].id >= 1 && styles.stepPointActive]}></View>
                                <View style={[styles.stepPoint,
                                currentStatus[0].id >= 2 && styles.stepPointActive]}></View>
                                <View style={[styles.stepPoint,
                                currentStatus[0].id >= 3 && styles.stepPointActive]}></View>
                                <View style={[styles.stepPoint,
                                currentStatus[0].id >= 4 && styles.stepPointActive]}></View>
                            </View>
                            <View style={styles.deliveryBarWrapper}>
                                <View style={[styles.deliveryBar, { width: currentStatus[0].width }
                                ]}></View>
                            </View>
                        </View>
                    }

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    orderItemsWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey
    },
    orderDetailsData: {
        marginHorizontal: 15,
        marginBottom: 50
    },
    dataStatus: {
        marginVertical: 10,
        color: colors.red,
        fontWeight: weight.bold,
        fontSize: 17
    },
    deliveryLabel: {
        color: colors.grey,
        fontWeight: weight.semibold,
        marginRight: 10
    },
    deliveryWrapper: {
        ...flex.horizontal,
    },
    deliverySteps: {
        position: 'relative',
        height: 75
    },
    stepsWrapper: {
        marginTop: 25,
        position: 'absolute',
        width: width['100'] - 30,
        bottom: 25,
        ...flex.horizontal,
        ...flex.remote
    },
    stepLabel: {
        color: colors.grey,
        marginBottom: 10
    },
    stepsPointsWrapper: {
        ...flex.horizontal,
        ...flex.remote,
        bottom: 0,
        zIndex: 1,
        width: width['100'] - 30,
        position: 'absolute'
    },
    stepPoint: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: colors.grey,
    },
    stepPointFirst: {
        // alignSelf: 'flex-start'
    },
    stepPointLast: {
        // alignSelf: 'flex-end'
    },
    deliveryBarWrapper: {
        height: 3,
        bottom: 9,
        width: width['100'] - 30,
        position: 'absolute',
        backgroundColor: colors.grey
    },
    deliveryBar: {
        height: 3,
        backgroundColor: colors.red,
        position: 'absolute'
    },
    stepPointActive: {
        backgroundColor: colors.red
    }
})

const mapStateToProps = state => {
    return {
        details: state.orders.details
    }
}

export default connect(mapStateToProps, { getOrderById })(OrderDetailsScreen)
