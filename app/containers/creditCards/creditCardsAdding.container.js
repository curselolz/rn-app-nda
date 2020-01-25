import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout'
import { Button } from '../layout/index';
import CreditCardForm from "../forms/CreditCardsForm.container";
import { colors, flex, icons, width } from "../../theme/consts.theme";
import { connect } from 'react-redux';
import { showBtnSpinner, hideBtnSpinner } from '../../actions/layout.actions';
import { addNewCard, deleteCreditCard, setPrimeCard, resetCreditCardValues } from '../../actions/creditCards.actions';
import stripe from "tipsi-stripe";

class CreditCardsAdding extends Component {

    state = {
        addingNew: false,
    };

    stripeValidation = async () => {
        const { showBtnSpinner, hideBtnSpinner, values } = this.props;
        const { card, expires, code, cvv, amExpress } = values,
            params = {
                number: card,
                expMonth: parseInt(expires.substring(0, 2)),
                expYear: parseInt(expires.slice(-2)),
                cvc: amExpress ? code : cvv,
                currency: 'usd',
            };
        showBtnSpinner();
        try {
            let stripeResponse = await stripe.createTokenWithCard(params),
                data = { token: stripeResponse.tokenId };

            this.props.addNewCard(data)
        } catch (error) {
            console.log('Error from stripe token!', error.response);
            if(!error.response.message) {
                console.log('HERE');
            } else {
                console.log(error);
            }
            alert(error.message);
            hideBtnSpinner();
        }

    };

    handlePress = (index) => {
        this.props.setPrimeCard(index);
    };

    confirmButtonPressed = () => {
        if (this.props.creditCards && this.props.creditCards.length < 5 || !this.props.creditCards) {
            if (!this.state.addingNew) {
                this.props.resetCreditCardValues()
                this.setState({ addingNew: true })
            } else {
                this.stripeValidation();
                this.setState({ addingNew: false })
            }
        } else {
            alert('Maximum number of cards saved. \nTo add new card, please delete an existing.')
        }

    };

    cancelPress = () => {
        this.props.resetCreditCardValues()
        this.setState({
            addingNew: false,
        })
    };

    render() {
        const { creditCards, spinnerVisible, formValid } = this.props,
            { addingNew } = this.state;
        swipeOutBtns = (id, ) => [{
            text: 'Delete',
            backgroundColor: colors.red,
            onPress: () => this.props.deleteCreditCard(id)
        }];
        return (
            <View style={styles.container}>
                {!creditCards && !addingNew &&
                    <Text style={styles.noDataText}> Nothing </Text>
                }
                {(!addingNew && creditCards) &&
                    <View style={styles.profileDataWrapper}>
                        {creditCards.map((item, index) => {
                            return (
                                <Swipeout
                                    autoClose
                                    backgroundColor='transparent'
                                    right={swipeOutBtns(item.id)}
                                    key={index.toString()}>
                                    <TouchableOpacity
                                        disabled={spinnerVisible}
                                        onPress={() => this.handlePress(item.id)}
                                        style={[styles.profileDataItem, index === creditCards.length - 1 && styles.itemUnbordered]}>
                                        <Text style={styles.textStyle}>
                                            {item.type.toUpperCase()}
                                        </Text>
                                        <View style={styles.row}>
                                            <Text>
                                                {item.last4}
                                            </Text>
                                            <Text style={styles.primaryBox}>
                                                {item.primary && icons.checkedBlack}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                </Swipeout>
                            )
                        })}
                    </View>
                }

                {addingNew &&
                    <React.Fragment>
                        <CreditCardForm
                            ref='deliveryForm'
                            action={(formValid) => this.setState({ formValid: formValid })}
                        />
                        <View style={styles.button}>
                            <Button
                                upperCase
                                label={'Cancel'}
                                action={this.cancelPress}
                            />
                        </View>
                    </React.Fragment>
                }

                <View style={styles.button}>
                    <Button
                        disabled={
                            (!this.state.addingNew)
                                ? false
                                : !formValid

                        }
                        upperCase
                        label={!addingNew ? 'Add New Card' : 'Confirm'}
                        action={this.confirmButtonPressed}
                    />
                </View>

            </View>


        )
    }
}

const styles = {
    profileDataWrapper: {
        backgroundColor: colors.white,
        marginVertical: 20,
        width: width['100'],
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        borderTopWidth: 1,
        borderTopColor: colors.grey
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.grey
    },
    button: {
        marginTop: 10
    },
    profileDataItem: {
        paddingLeft: 15,
        paddingRight: 5,
        ...flex.horizontal,
        ...flex.remote,
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        alignItems: 'center',
        height: 50
    },
    itemUnbordered: {
        borderBottomWidth: 0
    },
    row: {
        ...flex.horizontal,
    },
    primaryBox: {
        width: 30,
        marginLeft: 10
    },
    noDataText: {
        fontSize: 25,
        marginVertical: 40
    },
    container: {
        alignItems: 'center'
    }
};

const mapStateToProps = ({ creditCards, layout }) => ({
    creditCards: creditCards.cards,
    primary: creditCards.primary,
    spinnerVisible: layout.spinnerVisible,
    values: creditCards.values,
    formValid: creditCards.formValid
});

export default connect(mapStateToProps,
    {
        showBtnSpinner, hideBtnSpinner,
        addNewCard, deleteCreditCard,
        setPrimeCard, resetCreditCardValues
    })(CreditCardsAdding);
