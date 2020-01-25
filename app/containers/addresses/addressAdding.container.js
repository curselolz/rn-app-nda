import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Swipeout from 'react-native-swipeout'
import {Button} from '../layout/index';
import {colors, flex, icons, width} from "../../theme/consts.theme";
import {connect} from 'react-redux';
import {hideBtnSpinner, showBtnSpinner} from "../../actions/layout.actions";
import {
    getUserAddresses,
    addNewAddress,
    editAddress,
    deleteAddress,
    setPrime, fillAddressForm,
    clearAddressInputValues
} from '../../actions/address.actions';
import AddressForm from '../forms/AddressForm.container';

class AddressAdding extends Component {

    state = {
        editing: false,
        addingNew: false,
        selected: null,
        editingId: null,
        swiped: null
    };
    componenWillUnmount() {
        this.props.clearAddressInputValues()
    }

    addressSend = () => {
        const {addingNew, editingId} = this.state;
        const {addresses, values} = this.props;
        const {address, city, state, zip, name, comment, apartment} = values,
            params = {
                address,
                city,
                state,
                zip,
                name: name ? name : `Address #${this.props.addresses ? addresses.length + 1: '1'}`,
                comment: comment ? comment : '',
                apartment: apartment ? apartment : ''
            };
        if (addingNew) {
            this.props.addNewAddress(params);
        } else {
            params['id'] = editingId;
            this.props.editAddress(params);
            this.setState({editingId: null})
        }

    };

    handlePress = (index) => {
        const {fillAddressForm, addresses} = this.props;
        this.setState({
            editing: true,
            editingId: addresses[index].id
        })
        fillAddressForm(addresses[index])
    };

    confirmButtonPressed = () => {
        if (this.props.addresses && this.props.addresses.length < 10 || !this.props.addresses) {
            if (!this.state.editing && !this.state.addingNew) {
                this.setState({addingNew: true})
                this.props.clearAddressInputValues()
            } else if (this.state.addingNew) {
                this.addressSend();
                this.setState({addingNew: false, formValid: false})
            } else if (this.state.editing) {
                this.addressSend();
                this.setState({editing: false, formValid: false})
            }
        }else{
            alert('Maximum number of addresses saved. To add new address, please delete an existing.')
        }

    };

    cancelPress = () => {
        this.setState({
            editing: false,
            addingNew: false,
            editingId: null
        })
        this.props.clearAddressInputValues()
    };

    render() {
        const {addresses, formValid} = this.props,
            {editing, addingNew, selected} = this.state,
            swipeOutBtns = (id, primary) => !primary
                ? [{
                    text: 'Prime',
                    backgroundColor: colors.grey,
                    onPress: () => {
                        this.props.setPrime(id)
                        this.setState({swiped: null})
                    }
                }, {
                    text: 'Delete',
                    backgroundColor: colors.red,
                    onPress: () => {
                        this.props.deleteAddress(id)
                        this.setState({swiped: null})
                    }
                }]
                : [{
                    text: 'Delete',
                    backgroundColor: colors.red,
                    onPress: () => {
                        this.props.deleteAddress(id)
                        this.setState({swiped: null})
                    }
                }];
        return (
            <View style={styles.container}>
                {!addresses &&
                    <Text style={styles.noDataText}> Nothing </Text>
                }
                {(!editing && !addingNew && addresses) &&
                <View style={styles.profileDataWrapper}>
                    {addresses.map((item, index) => {
                        return (
                            <Swipeout
                                onOpen={() => this.setState({swiped: index})}
                                close={this.state.swiped !== index}
                                backgroundColor='transparent'
                                right={swipeOutBtns(item.id, item.is_primary)}
                                key={index.toString()}>
                                <TouchableOpacity
                                    onPress={() => this.handlePress(index)}
                                    style={[styles.profileDataItem, index === addresses.length - 1 && styles.itemUnbordered]}>
                                    <Text style={styles.textStyle}>
                                        {`${item.name}`}
                                    </Text>
                                    <View style={styles.row}>
                                        <Text>
                                            {item.address}
                                        </Text>
                                        <Text style={styles.primaryBox}>
                                            {item.is_primary && icons.checkedBlack}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            </Swipeout>
                        )
                    })}
                </View>
                }

                {(editing || addingNew) &&
                <React.Fragment>
                    <AddressForm
                        ref='deliveryForm'
                        action={(formValid) => this.setState({formValid: formValid})}
                        formType='addressForm'
                        editingForm={editing}
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
                            (!this.state.editing && !this.state.addingNew)
                                ? false
                                : !formValid

                        }
                        upperCase
                        label={(!editing && !addingNew) ? 'Add New Address' : 'Confirm'}
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

const mapStateToProps = ({addresses}) => ({
    addresses: addresses.existingAddresses,
    formValid: addresses.formValid,
    values: addresses.values
});

export default connect(mapStateToProps,
    {
        hideBtnSpinner,
        showBtnSpinner,
        getUserAddresses,
        addNewAddress,
        editAddress,
        deleteAddress,
        setPrime,
        fillAddressForm,
        clearAddressInputValues
    })(AddressAdding);