import { Input } from '../layout';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { flex, colors, weight, width } from '../../theme/consts.theme';
import AddressForm from './AddressForm.container';
import CardsForm from './CreditCardsForm.container';
import {connect} from 'react-redux';
import {phoneInputChanged} from '../../actions/address.actions';

class DeliveryForm extends PureComponent {

    componentWillReceiveProps(nexProps) {
        if (nexProps.addressFormVisible !== this.props.addressFormVisible) {
            this.setState({ ...this.state, addressFormValid: !nexProps.addressFormVisible })
        }
        if (nexProps.paymentFormVisible !== this.props.paymentFormVisible) {
            this.setState({ ...this.state, paymentFormValid: !nexProps.paymentFormVisible })
        }
    }

    handleInput = (value) => {
        this.props.phoneInputChanged(value)
    };

    render() {
        const { addressFormVisible, addressCheckBox,
            paymentFormVisible, paymentCheckBox, inputValue } = this.props;

        return (
            <View style={styles.formWraper}>
                <View style={styles.deliverySection}>

                    {addressFormVisible &&
                        <AddressForm
                            addressCheckBox={addressCheckBox}
                        />
                    }

                    {paymentFormVisible &&
                        <CardsForm
                            paymentCheckBox={paymentCheckBox}
                        />
                    }
                    <Text style={styles.titleText}>
                        MY PHONE NUMBER
                    </Text>

                    <View style={styles.sectionItemsWrapper}>
                        <View style={[styles.sectionItem, styles.sectionUnBordered]}>
                            <Input
                                checkout
                                type='phone'
                                callbackChange={(value) => this.handleInput(value)}
                                defaultValue={inputValue}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formWraper: {
        marginBottom: 10
    },
    deliverySection: {
        // marginVertical: 10
    },
    sectionHeader: {
        fontWeight: weight.semibold,
        margin: 15
    },
    sectionItem: {
        ...flex.remote,
        ...flex.horizontal,
        marginHorizontal: 15,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1
    },
    itemLabel: {
        color: colors.grey,
        fontWeight: weight.semibold
    },
    sectionUnBordered: {
        borderBottomWidth: 0
    },
    sectionItemsWrapper: {
        borderTopWidth: 1,
        borderTopColor: colors.grey,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        backgroundColor: colors.white
    },
    titleText: {
        width: width['100'],
        marginLeft: 15,
        marginVertical: 10
    }
});

const mapStateToProps =({addresses}) => ({
    inputValue: addresses.phoneInput
})

export default connect(mapStateToProps, {phoneInputChanged})(DeliveryForm);