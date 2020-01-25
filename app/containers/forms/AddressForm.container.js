import {Input} from '../layout';
import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {flex, colors, weight, width} from '../../theme/consts.theme';
import AddressInput from '../../components/addressInput/addressInput.component';
import {connect} from 'react-redux';
import {addressFormInputChangeValue, addressInputCallback} from '../../actions/address.actions';
import Checkbox from "../layout/checkbox.container";
import { STATES } from '../../data/statesData';

class AddressForm extends PureComponent {

    handleItem = (type, value) => {
        this.props.addressFormInputChangeValue({[type]: value})
    };

    handleAddressInput = (data) => {
        const dataToSend = {
            state: data.adminArea && Platform.OS === 'ios' 
            ? data.adminArea 
            : data.adminArea && Platform.OS === 'android' 
            ? STATES[data.adminArea]
            : '',
            city: data.subAdminArea ? data.subAdminArea : '',
            address: (data.streetName && data.streetNumber)
                ? `${data.streetNumber} ${data.streetName}`
                : data.streetName ? data.streetName : '',
            zip: data.postalCode ? data.postalCode : '' 
        }
        console.log('Data which we send to Back: ', dataToSend)
        const {state, city, address, zip} = dataToSend
        !(state && city && address && zip) && alert('Invalid address, please enter a valid address.')
        this.props.addressInputCallback(dataToSend)
    };

    switchCheckBox = () => {
        const  {values, addressFormInputChangeValue} = this.props;
        addressFormInputChangeValue({'saveCheckBox': !values.saveCheckBox })      
    }

    render() {
        const { editingForm, values} = this.props;
        const mainInformation = ['name', 'apartment', 'comment']
        return (
            <View style={styles.formWraper}>
                <View style={styles.deliverySection}>
                    <Text style={styles.sectionHeader}>
                        {editingForm
                            ? 'EDITING ADDRESS'
                            : 'ADD NEW ADDRESS'}
                    </Text>

                        <View style={[styles.sectionItemsWrapper, {marginBottom: 20}]}>
                            <AddressInput
                                callback={(data) => this.handleAddressInput(data)}
                                selected={values}
                            />
                        </View>

                        <View style={styles.sectionItemsWrapper}>
                            {mainInformation.map((item, index) =>
                                <View key={index} style={[styles.sectionItem,
                                    index + 1 === mainInformation.length && styles.sectionUnBordered]}>
                                    <Input
                                        checkout
                                        callbackChange={(value) => this.handleItem(item, value)}
                                        type={item}
                                        defaultValue={
                                            values
                                                ? (values && item === 'name')
                                                ? values.name && values.name
                                                : (values && item === 'comment')
                                                    ? values.comment && values.comment
                                                    : values.apartment && values.apartment
                                                : ''
                                        }
                                    />
                                </View>
                            )}
                        </View>
                        {this.props.addressCheckBox && 
                            <View style={styles.checkBox}>
                                <Checkbox
                                    ref='check'
                                    action={this.switchCheckBox}
                                    selected={values.saveCheckBox}
                                />
                                <Text style={{marginLeft: 10}}>Save my address!</Text>
                            </View>}
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
    checkBox: {
        width: width['100'],
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical : 10,
        paddingLeft: 20
    },
});

const mapStateToProps = ({addresses}) => ({
    values: addresses.values
})

export default connect(mapStateToProps, {addressFormInputChangeValue, addressInputCallback})(AddressForm);