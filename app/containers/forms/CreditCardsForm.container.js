import { Input } from '../layout';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { cardsInputChangeValue, creditCardFormValid } from '../../actions/creditCards.actions';
import { flex, colors, weight, width } from '../../theme/consts.theme';
import Checkbox from "../layout/checkbox.container";

class CardsForm extends PureComponent {

    componentWillReceiveProps(nextProps) {
        if (nextProps.values !== this.props.values) {
            this.validation(nextProps)
        }
    }
    handleItem = (type, value) => {
        this.props.cardsInputChangeValue({ [type]: value })
    };

    switchCheckbox = () => {
        this.props.cardsInputChangeValue({ 'paymentCheckBox': !this.props.values.paymentCheckBox })
    }

    validation = (props) => {
        let { card, expires, code, cvv, amExpress } = props.values
        !!(amExpress ? card && card.length == 17 : card && card.length == 19)
            && !!(expires && expires.length == 5)
            && !!(amExpress ? code && code.length == 4 : cvv && cvv.length == 3)
            ? this.props.creditCardFormValid(true)
            : this.props.creditCardFormValid(false)
    }

    render() {
        const { values } = this.props,
            cardDetails = ['card', 'expires', values.amExpress ? 'code' : 'cvv']


        return (
            <View style={styles.formWraper}>
                <View style={styles.deliverySection}>
                    <Text style={styles.sectionHeader}>
                        ADD NEW CARD
                    </Text>
                </View>
                <View style={styles.deliverySection}>
                    <View style={styles.sectionItemsWrapper}>
                        {cardDetails.map((item, index) =>
                            <View key={index} style={[styles.sectionItem,
                            index + 1 === cardDetails.length && styles.sectionUnBordered]}>
                                <Input
                                    checkout
                                    callbackChange={(value) => this.handleItem(item, value)}
                                    type={item}
                                />
                            </View>
                        )}
                    </View>
                </View>
                {this.props.paymentCheckBox &&
                    <View style={styles.checkBox}>
                        <Checkbox
                            ref='check'
                            action={this.switchCheckbox}
                            selected={values.paymentCheckBox}
                        />
                        <Text style={{ marginLeft: 10 }}>Save my Card!</Text>
                    </View>}
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
    checkBox: {
        width: width['100'],
        height: 30,
        paddingLeft: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10
    },
});

const mapStateToProps = ({ creditCards }) => ({
    values: creditCards.values
})

export default connect(mapStateToProps, { cardsInputChangeValue, creditCardFormValid })(CardsForm);

// 130 rows