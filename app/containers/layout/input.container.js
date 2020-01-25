import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TextInput } from 'react-native';
// import TextInputMask from 'react-native-text-input-mask';
import { TextInputMask } from 'react-native-masked-text';
import { colors, flex, width } from '../../theme/consts.theme';
import { inputs } from '../../utils/inputs.util';
import validate from '../../utils/validation.util';
import { searchFirstTwo } from '../../utils/searchRegExp.util';

class Input extends Component {
    state = {
        valid: true,
        value: ''
    }

    handleValidation = () => {
        let valid

        this.props.callbackBlur && this.props.callbackBlur()

        return this.props.required && (
            valid = validate(this.state.value, this.props.type) === false || this.state.value === ''
                ? false
                : true,
            this.setState({ valid: valid }),
            valid)
    }
    handleChange = (value) => {
        const { callbackChange } = this.props;

        callbackChange && callbackChange(value);

        this.setState({ value: value });
    }
    render() {
        const {
            inputWhite,
            style,
            type,
            inputStyle,
            checkout,
            searchFunc,
            defaultValue,
            editable,
            profile,
            minLength,
        } = this.props;
        return (
            <View style={[styles.inputWrapper,
            checkout && styles.checkoutStyleWrapper,
            profile && styles.profileStyleWrapper,
            style && style]}>
            {inputs[type].type === 'default' || inputs[type].type === 'email-address' ?
                <TextInput
                    ref='textInput'
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor={inputWhite
                        ? colors.white
                        : colors.grey}
                    keyboardType={inputs[type].keyBoardType}
                    editable={editable}
                    returnKeyType={type === 'search' ? 'search' : null}
                    onSubmitEditing={() => type === 'search' ? searchFunc() : null}
                    // placeholder={defaultValue ? defaultValue : inputs[type].placeholder}
                    defaultValue={defaultValue}
                    placeholder={inputs[type].placeholder}
                    value={defaultValue ? defaultValue : this.state.value}
                    minLength={minLength}
                    style={[styles.input,
                    checkout && styles.checkoutStyle,
                    profile && styles.profileInput,
                    inputStyle && inputStyle,
                    !this.state.valid && styles.inputRequired,
                    inputWhite && styles.inputWhite]}
                    autoCapitalize={
                        type === 'email' || type === 'password'
                        || type === 'old_password' || type === 'new_password'
                        || type === 'confirm'
                        ? 'none'
                        : 'sentences'}
                    secureTextEntry={type === 'password' || type === 'old_password' || type === 'new_password'
                    || type === 'confirm' && true}
                    onBlur={this.handleValidation}
                    onChangeText={this.handleChange}
                /> : <TextInputMask
                maxLength={inputs[type].maxLength}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor={inputWhite
                    ? colors.white
                    : colors.grey}
                placeholder={inputs[type].placeholder}
                keyboardType={inputs[type].keyBoardType}
                editable={editable}
                returnKeyType={type === 'search' ? 'search' : null}
                onSubmitEditing={() => type === 'search' ? searchFunc() : null}
                defaultValue={defaultValue}
                // ref={this.props && null}
                value={defaultValue ? defaultValue : this.state.value}
                // value={this.state.value ? this.state.value : defaultValue}
                // placeholder={defaultValue ? defaultValue : inputs[type].placeholder}
                minLength={minLength}
                style={[styles.input,
                    checkout && styles.checkoutStyle,
                    profile && styles.profileInput,
                    inputStyle && inputStyle,
                    !this.state.valid && styles.inputRequired,
                    inputWhite && styles.inputWhite]}
                autoCapitalize={
                    type === 'email' || type === 'password'
                        || type === 'old_password' || type === 'new_password'
                        || type === 'confirm'
                        ? 'none'
                        : 'sentences'}
                secureTextEntry={type === 'password' || type === 'old_password' || type === 'new_password'
                    || type === 'confirm' && true}
                onBlur={this.handleValidation}
                onChangeText={this.handleChange}
                type={inputs[type].type}
                options={{
                    mask: inputs[type].mask
                }}
            />
        }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputWrapper: {
        marginVertical: 10,
        ...flex.centered
    },
    input: {
        width: width['80'],
        borderColor: colors.black,
        borderBottomWidth: 1,
        color: colors.black,
        fontSize: 15,
        padding: 5
    },
    inputRequired: {
        borderColor: colors.red
    },
    inputWhite: {
        color: colors.white,
        borderColor: colors.white
    },
    checkoutStyle: {
        borderBottomWidth: 0,
        paddingVertical: 12,
        width: width['100'] - 30
    },
    checkoutStyleWrapper: {
        margin: 0,
        padding: 0
    },
    profileInput: {
        borderBottomWidth: 0,
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
    profileStyleWrapper: {
        marginVertical: 0,
        paddingVertical: 10,
        width: width['60']
    }
})

export default Input
