import React, { Component } from 'react';
import moment from 'moment';
import {
    StyleSheet, View,
    Text, Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Radio } from '../layout/index';
import { getShopWorkTime } from '../../actions/catalog.actions';
import { confirmCheckout } from '../../actions/orders.actions'
import { showBtnSpinner, hideBtnSpinner } from '../../actions/layout.actions'
import { changeFilterValue, filterPicked, closePicker } from '../../actions/filter.actions';
import { getUserAddresses } from '../../actions/address.actions';
import { getUserCards } from '../../actions/creditCards.actions';
import DeliveryForm from '../forms/deliveryForm.container';
import FilterControl from '../filter/filterControl.container';
import { colors, shadows, flex, icons, weight, width } from '../../theme/consts.theme';
import ArrowBack from '../layout/arrowBack.container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stripe from 'tipsi-stripe';
import { STRIPE_DEFAULTS } from "../../utils/config.util";


stripe.setOptions({
    ...STRIPE_DEFAULTS
});

class CheckOutScreen extends Component {
    static navigationOptions =({navigation})=> ({
        title: 'Check out',
        headerLeft: <ArrowBack
            navigation={navigation}
            pop
        />,
        headerRight: <View />
    });

    state = {
        selectedType: 'delivery',
        addressCheckBox: true,
        visibleControl: false,
        selectedControl: null,
        offSet: new Animated.Value(Dimensions.get('window').height),
        addressFormVisible: !this.props.addresses,
        paymentFormVisible: true,
        paymentCheckBox: true
    };

    componentWillMount() {
        this.props.getUserAddresses();
        this.props.getUserCards();
        this.props.getShopWorkTime(this.props.shopId);
    }

    calcTotal = (step) => {
        const total = this.props.cart.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0),
            delivery = this.state.selectedType === 'delivery' ? 14.99 : 0,
            tax = (total + delivery) * 0.08875

        if (step === 1) {
            return total
        }
        if (step === 2) {
            return tax
        }
        if (step === 3) {
            return (total + tax + delivery)
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.cards !== this.props.cards) {
            if (nextProps.cards) {
                this.setState({
                    paymentFormVisible: false,
                    paymentCheckBox: false
                })
            }
        }
        if (nextProps.addresses !== this.props.addresses) {
            if (nextProps.addresses) {
                this.setState({ addressFormVisible: false, addressCheckBox: false })
            }
        }
    }

    handleChange = (id) => {
        const { selectedControl, addressFormVisible,
            addressCheckBox, paymentFormVisible,
            paymentCheckBox } = this.state;
        this.props.changeFilterValue(id)
        if (id === 'addNew') {
            this.setState({
                addressFormVisible: selectedControl === 'addresses' || addressFormVisible,
                addressCheckBox: selectedControl === 'addresses' || addressCheckBox,
                paymentFormVisible: selectedControl === 'cards' || paymentFormVisible,
                paymentCheckBox: selectedControl === 'cards' || paymentCheckBox,
            })
        } else {
            this.setState({
                addressFormVisible: selectedControl === 'addresses' ? false : addressFormVisible,
                addressCheckBox: selectedControl === 'addresses' ? false : addressCheckBox,
                paymentFormVisible: selectedControl === 'cards' ? false : paymentFormVisible,
                paymentCheckBox: selectedControl === 'cards' ? false : paymentCheckBox,
            })
        }
    };

    showControl = (type) => {
        this.props.filterPicked(type)
        !this.state.visibleControl
            ? this.setState({
                visibleControl: true,
                selectedControl: type
            })
            : this.refs.filterControl.closeModal()
    };

    createOrder = () => {
        const { cardValues } = this.props;
        console.log(cardValues);
        if (cardValues.card) {
            console.log(cardValues.card);
            this.createStripeToken()
        } else {
            console.log('else card')
            this.createWithExistingCard()
        }
    }

    closePicker = () => {
        this.setState({ visibleControl: false })
        this.props.closePicker()
    }

    createWithExistingCard = () => {
        this.props.showBtnSpinner();

        const { cart, cardValues, phoneInput, addresses } = this.props,
            { addressCheckBox, paymentCheckBox, selectedType } = this.state,
            { address, city, state, zip, name, comment, apartment } = this.props.addressValues,
            selectedTypeDelivery = selectedType === 'delivery',
            params = {
                existed_card: true,
                token_id: cardValues.id,
                variations: cart.map(item => {
                    return {
                        variation_id: item.variation.id,
                        quantity: item.quantity
                    }
                }),
                address_line: selectedTypeDelivery && address,
                phone: phoneInput,
                address_city: selectedTypeDelivery && city,
                address_zipcode: selectedTypeDelivery && zip,
                address_state: selectedTypeDelivery && state,
                address_name: selectedTypeDelivery && name || selectedTypeDelivery && `Address #${this.props.addresses ? this.props.addresses.length : '1'}`,
                address_comment: selectedTypeDelivery && comment,
                address_apartment: selectedTypeDelivery && apartment,
                save_address: (selectedTypeDelivery && addresses && addresses.length < 10)
                    ? addressCheckBox
                    : selectedTypeDelivery && !addresses,
                save_card: paymentCheckBox,
                order_type: selectedType
            }
        this.props.confirmCheckout(params);
    }

    createStripeToken = async () => {
        const { address, city, state, zip, name, comment, apartment, saveCheckBox } = this.props.addressValues,
            { card, expires, code, paymentCheckBox } = this.props.cardValues,
            { showBtnSpinner, hideBtnSpinner, phoneInput, addresses } = this.props,
            { selectedType } = this.state,
            selectedTypeDelivery = selectedType === 'delivery',
            params = {
                number: card,
                expMonth: parseInt(expires.substring(0, 2)),
                expYear: parseInt(expires.slice(-2)),
                cvc: code,
                currency: 'usd',
                address_line: selectedTypeDelivery && address,
                address_city: selectedTypeDelivery && city,
                address_state: selectedTypeDelivery && state,
                address_country: 'USA',
                address_zip: selectedTypeDelivery && zip
            };
        showBtnSpinner();
        try {
            console.log('try block');
            console.log(stripe);
            let stripeResponse = await stripe.createTokenWithCard(params);
            console.log(stripeResponse)
            let data = {
                    token_id: stripeResponse.tokenId,
                    variations: this.props.cart.map(item => {
                        return {
                            variation_id: item.variation.id,
                            quantity: item.quantity
                        }
                    })
                };
            console.log(data);
            this.props.confirmCheckout({
                ...data,
                address_line: selectedTypeDelivery && address,
                phone: phoneInput,
                address_city: selectedTypeDelivery && city,
                address_zipcode: zip,
                address_state: selectedTypeDelivery && state,
                address_name: selectedTypeDelivery && name || selectedTypeDelivery && `Address #${this.props.addresses ? this.props.addresses.length : '1'}`,
                address_comment: selectedTypeDelivery && comment ? comment : '',
                address_apartment: selectedTypeDelivery && apartment ? apartment : '',
                save_address: (selectedTypeDelivery && addresses && addresses.length < 10)
                    ? saveCheckBox
                    : selectedTypeDelivery && !addresses,
                save_card: paymentCheckBox,
                order_type: selectedType
            })
        } catch (error) {
            if(!error.response.message) {
                console.log('HERE');
            } else {
                console.log(error);
            }
            alert(error.message);
            hideBtnSpinner();
        }
    };

    handleSelectedType = (type) => {
        const { addressValues } = this.props;
        this.setState({ selectedType: type, addressFormVisible: type === 'pickup' ? false : !addressValues.address })
    }

    render() {
        const { shop_adress } = this.props.cart.length !== 0 && this.props.cart[0];
        const { addressFormVisible, paymentFormVisible,
            paymentCheckBox, addressCheckBox, selectedType } = this.state,
            { addresses, cards, authProfile, schedule, filtersData, phoneInput,
                cardValues, addressValues, cardsFormValid, addressFormValid } = this.props,
            workDays = schedule && Object.keys(schedule.work_time).map(item =>
                ({ day: item, data: schedule.work_time[item] }));
        workDays && workDays.splice(0, 0, workDays.pop())
        const confirmDetails = [
            { label: 'Subtotal:', value: `$${this.calcTotal(1).toFixed(2)}` },
            { label: 'Delivery:', value: `$${this.state.selectedType === 'delivery' ? '14.99' : '0'}` },
            { label: 'Tax:', value: `$${this.calcTotal(2).toFixed(2)}` },
            { label: 'Total', value: `$${this.calcTotal(3).toFixed(2)}` }
        ]
        return (
            <KeyboardAvoidingView style={flex.full}>
                <KeyboardAwareScrollView
                    enableResetScrollToCoords={false}
                >
                    <View style={styles.checkOutTypesWrapper}>
                        <View style={[styles.checkOutType, styles.checkoutTypeBordered]}>
                            <Text>
                                Pickup
                            </Text>
                            <Radio
                                ref='type'
                                action={() => this.handleSelectedType('pickup')}
                                selected={selectedType === 'pickup'}
                            />
                        </View>
                        <View style={styles.checkOutType}>
                            <Text>
                                Delivery
                            </Text>
                            <Radio
                                ref='type'
                                action={() => this.handleSelectedType('delivery')}
                                selected={selectedType === 'delivery'}
                            />
                        </View>
                    </View>

                    {selectedType === 'pickup'
                        && (
                            <View style={styles.pickupDetailsWrapper}>
                                {icons.pickupCart}
                                <Text style={styles.pickupDetailsText}>
                                    Pick up your item at
                                </Text>
                                <Text style={styles.pickupDetailsAddress}>
                                    {`${shop_adress}`}
                                </Text>
                                <View style={styles.scheduleWrapper}>
                                    {workDays && workDays.map((item, index) =>
                                        <View style={[styles.schedule, index === workDays.length - 1 && { borderBottomWidth: 0 }]} key={index.toString()}>
                                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.day.toUpperCase()}</Text>
                                            <Text style={{ flex: 2, textAlign: 'center' }}>
                                                {item.data.start ? `${moment(item.data.start).format('hh:mm A')} - ${moment(item.data.end).format('hh:mm A')}` : 'CLOSED'}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )
                    }
                    {(addresses && selectedType !== 'pickup') &&
                        <React.Fragment>
                            <Text style={styles.titlesText}>{addressValues.address ? 'MY PRIMARY ADDRESS' : 'ADDRESSES'}</Text>
                            <View style={styles.filterSection}>
                                <TouchableOpacity
                                    style={[styles.filterItem, { marginRight: -5 }]}
                                    onPress={() => this.showControl('addresses')}>
                                    {addressValues
                                        ? <React.Fragment>
                                            <Text style={{ color: colors.grey }}>
                                                {addressValues.address ? `${addressValues.name}` : 'Choose from your addresses'}
                                            </Text>
                                            <View style={styles.row}>
                                                <Text style={styles.filterItemLabel}>
                                                    {addressValues.address
                                                        && `${addressValues.address} ${addressValues.state}`}
                                                </Text>
                                                <Text style={styles.primaryBox}>
                                                    {icons.arrowForward}
                                                </Text>
                                            </View>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Text style={styles.filterItemLabel}>
                                                Select
                                                    </Text>
                                            <Text style={styles.primaryBox}>
                                                {icons.arrowForward}
                                            </Text>
                                        </React.Fragment>
                                    }
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    }
                    {cards &&
                        <React.Fragment>
                            <Text style={styles.titlesText}>MY PRIMARY CARD</Text>
                            <View style={styles.filterSection}>
                                <TouchableOpacity
                                    style={[styles.filterItem, { marginRight: -5 }]}
                                    onPress={() => this.showControl('cards')}>
                                    {cardValues.id
                                        ? <React.Fragment>
                                            <Text style={{ color: colors.grey }}>
                                                {cardValues.id && `${cardValues.type}`.toUpperCase()}
                                            </Text>
                                            <View style={styles.row}>
                                                <Text style={styles.filterItemLabel}>
                                                    {cardValues.id && `**** **** **** ${cardValues.last4}`}
                                                </Text>
                                                <Text style={styles.primaryBox}>
                                                    {icons.arrowForward}
                                                </Text>
                                            </View>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Text style={styles.filterItemLabel}>
                                                Select
                                                </Text>
                                            <Text style={styles.primaryBox}>
                                                {icons.arrowForward}
                                            </Text>
                                        </React.Fragment>
                                    }
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    }

                    {this.state.visibleControl
                        ? <FilterControl
                            selected={this.state.selectedControl}
                            ref='filterControl'
                            closeModal={this.closePicker}
                            onChange={this.handleChange}
                            data={filtersData[this.state.selectedControl]}
                            offSet={this.state.offSet}
                        />
                        :
                        <DeliveryForm
                            ref='deliveryForm'
                            addressFormVisible={addressFormVisible}
                            paymentFormVisible={paymentFormVisible}
                            paymentCheckBox={paymentCheckBox}
                            addressCheckBox={addressCheckBox}
                            phone={authProfile && authProfile.buyer.phone}
                        />}

                    {!this.state.visibleControl &&
                        <React.Fragment>
                            <View style={{ marginBottom: 29 }}>
                                <Text style={{ marginHorizontal: width['10'], fontSize: 16, marginVertical: 10 }}>CONFIRM PAYMENT</Text>
                                <View style={{ marginHorizontal: width['10'], marginBottom: 20 }}>
                                    {confirmDetails.map((item, index) =>
                                        <View
                                            key={item.label}
                                            style={[{ flexDirection: 'row', height: 45, borderBottomColor: colors.black, alignItems: 'center' },
                                            index === confirmDetails.length - 2 && { borderBottomWidth: 1 }]}
                                        >
                                            <Text style={{ flex: 1, color: colors.grey }}>{item.label}</Text>
                                            <Text style={[{ flex: 1 }, index === confirmDetails.length - 1 && { fontWeight: '900' }]}>{item.value}</Text>
                                        </View>
                                    )}
                                </View>


                                <Button
                                    disabled={(selectedType !== 'pickup')
                                        ? !(cardsFormValid && addressFormValid && phoneInput)
                                        : !(cardsFormValid && phoneInput)
                                    }
                                    upperCase
                                    label='Confirm'
                                    action={this.createOrder}
                                />
                            </View>
                        </React.Fragment>
                    }
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    confirmWrapper: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        bottom: 0,
        padding: 10,
        backgroundColor: colors.white,
        ...shadows.default
    },
    pickupDetailsWrapper: {
        ...flex.centered,
        marginVertical: 20
    },
    pickupDetailsText: {
        marginVertical: 5
    },
    pickupDetailsAddress: {
        fontWeight: weight.semibold,
        fontSize: 18,
        textAlign: 'center'
    },
    checkOutTypesWrapper: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey
    },
    checkOutType: {
        ...flex.horizontal,
        ...flex.remote,
        marginHorizontal: 15,
        marginVertical: 5,
        paddingVertical: 7.5
    },
    checkoutTypeBordered: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey
    },
    filterSection: {
        marginTop: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: colors.grey,
        borderBottomColor: colors.grey,
        backgroundColor: '#fff'
    },
    scheduleWrapper: {
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.grey,
        marginVertical: 10

    },
    filterItem: {
        ...flex.horizontal,
        ...flex.remote,
        marginLeft: 15,
        marginRight: 15,
        marginVertical: 7.5,
        paddingVertical: 7.5
    },
    filterItemValue: {
        color: colors.grey
    },
    filterItemLabel: {
        fontWeight: weight.semibold
    },
    row: {
        ...flex.horizontal,
    },
    primaryBox: {
        width: 30,
        marginLeft: 10
    },
    titlesText: {
        width: width['100'],
        marginLeft: 15,
        marginTop: 10
    },
    schedule: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        width: width['80'],
        borderBottomColor: colors.grey,
        borderBottomWidth: 1,
    }
});

const mapStateToProps = ({ cart, addresses, creditCards, auth, filters }) => {
    return {
        cart: cart.items,
        addresses: addresses.existingAddresses,
        cards: creditCards.cards,
        authProfile: auth.profile,
        shopId: cart.shop_id,
        schedule: cart.schedule,
        filtersData: filters,
        addressValues: addresses.values,
        cardValues: creditCards.values,
        addressFormValid: addresses.formValid,
        cardsFormValid: creditCards.formValid,
        phoneInput: addresses.phoneInput
    }
};

export default connect(mapStateToProps, {
    hideBtnSpinner, confirmCheckout,
    showBtnSpinner, getUserAddresses,
    getUserCards, getShopWorkTime,
    changeFilterValue, filterPicked, closePicker
})(CheckOutScreen)


// Component was 630 rows length!!!!
