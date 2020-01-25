import { connect } from 'react-redux'
import React, { Component } from 'react'
import { signUp } from '../../actions/auth.actions'
import { Button, Input, Radio, Checkbox } from '../layout/index'
import { colors, weight } from '../../theme/consts.theme'
import { View, TouchableOpacity, Platform, Text, StyleSheet, Linking } from 'react-native'
import { navigate } from '../../utils/navigation.util'
import FacebookBtn from '../../components/auth/facebookBtn.component';

class SignUpForm extends Component {
    state = {
        selectedGender: null,
        formData: [],
        terms: false
    }

    handleSignUp = () => {
        this.validate() && this.collectData()
    }
    validate = () => {
        let requiredFields = Object.values(this.refs).filter(field => field.props.required),
            valid = requiredFields.map(field => {
                return field.handleValidation()
                    ? true
                    : false
            }),
            checkboxValid = this.state.terms;
        this.refs.check.setState({ valid: checkboxValid })
        let passwordMatch = (this.refs.password.state.value === this.refs.confirmPassword.state.value)
        this.refs.password.state.value.length<8 && alert('Password must be at least 8 characters.')
        !this.refs.email.handleValidation() && alert('Try again. Not a valid email address.')
        this.refs.phone.state.value.length !== 17 && alert('Try again. Not a valid phone number.')

        !passwordMatch && alert('Password does not match. Please try again.')

        !checkboxValid && alert('To continue you must agree to the terms & conditions.')

        return (valid.includes(false) || !checkboxValid || !passwordMatch || this.refs.password.state.value.length<8 || this.refs.phone.state.value.length !== 17)
            ? false
            : true
    }
    collectData = () => {
        let fields = Object.values(this.refs),
            data = {};

        fields.map(field => field.props.type !== undefined && (data[field.props.type] = field.state.value))

        if(this.state.selectedGender) { data['gender'] = this.state.selectedGender;}

        this.props.signUp(data)
        console.log('Data to signUp: ', data)
    };

    goToTermsOfUse = () => {
        
        Linking.openURL('https://getstockist.co/terms').catch(err => console.error('An error occurred', err));
    }
    render() {
        return (
            <View style={styles.form}>
                <Input
                    ref='first_name'
                    type='first_name'
                    required
                />
                <Input
                    ref='last_name'
                    type='last_name'
                    required
                />
                <Input
                    ref='phone'
                    type='phone'
                    required
                />
                <Input
                    ref='email'
                    type='email'
                    required
                />
                <Input
                    ref='password'
                    type='password'
                    required
                />
                <Input
                    ref='confirmPassword'
                    type='confirm'
                    required
                />
                <View style={styles.radioWrapper}>
                    <Radio
                        label='Woman'
                        ref='woman_radio'
                        action={() => this.setState({ selectedGender: 'woman' })}
                        selected={this.state.selectedGender === 'woman'}
                    />
                    <Radio
                        label='Man'
                        ref='man_radio'
                        action={() => this.setState({ selectedGender: 'man' })}
                        selected={this.state.selectedGender === 'man'}
                    />
                </View>
                <Button
                    action={this.handleSignUp}
                    label='Sign up'
                    upperCase
                />
                <FacebookBtn
                    onFacebookPress={()=> this.setState({ terms: true })}
                />
                <View style={styles.termsWrapper}>
                    <Checkbox
                        ref='check'
                        action={() => this.setState({ terms: !this.state.terms })}
                        selected={this.state.terms}
                    />
                    <Text style={styles.termsText}>
                        Agree with
                    </Text>
                    <TouchableOpacity
                        style={styles.termsLinkWrapper}
                        onPress={this.goToTermsOfUse}
                    >
                        <Text style={styles.termsLink}>Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        marginTop: 15,
    },
    fbBtn: {
        height: 200
    },
    radioWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 40
    },
    termsWrapper: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        justifyContent: 'center'
    },
    termsText: {
        color: colors.black,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    termsLinkWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        alignContent: 'center'
    },
    termsLink: {
        color: colors.black,
        fontWeight: weight.semibold,
    }
})

export default connect(null, { signUp })(SignUpForm)
