import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Input, Button } from '../../containers/layout/index'
import { colors, weight } from '../../theme/consts.theme'
import { forgotPassword } from '../../actions/auth.actions'
import { navigate } from '../../utils/navigation.util'

class ForgotPasswordForm extends PureComponent {
    collectData = () => {
        !this.refs.email.handleValidation() && alert('Try again. Not a valid email address.')
        this.refs.email.handleValidation() && this.props.forgotPassword(this.refs.email.state.value)
    }
    render() {
        const { msg } = this.props
        return (
            <View>
                {msg
                    ?
                    <View>
                        <Text style={styles.forgotMsg}>
                            Check you email to recover your password
                        </Text>
                        <Button
                            upperCase
                            label='Sign In'
                            action={() => navigate('Auth')}
                        />
                    </View>
                    : <View>
                        <Text style={styles.forgotHeader}>
                            Forgot your password?
                        </Text>
                        <Text style={styles.forgotDescription}>
                            Enter your email below to receive your password reset instructions
                        </Text>
                        <Input
                            type='email'
                            ref='email'
                            required
                            inputWhite
                            style={styles.emailInput}
                        />
                        <Button
                            upperCase
                            action={this.collectData}
                            label='Send'
                        />
                        <TouchableOpacity
                            style={styles.signLinkWrapper}
                            onPress={() => navigate('Auth')}
                        >
                            <Text style={styles.signLink}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    forgotHeader: {
        fontWeight: weight.bold,
        color: colors.white,
        alignSelf: 'center',
        fontSize: 18,
        marginVertical: 20
    },
    forgotDescription: {
        fontWeight: weight.default,
        color: colors.white,
        width: 220,
        alignSelf: 'center'
    },
    emailInput: {
        marginVertical: 50
    },
    signLinkWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        width: 60,
        alignSelf: 'center',
        marginTop: 50,
        justifyContent: 'center',
        alignContent: 'center'
    },
    signLink: {
        alignSelf: 'center',
        color: colors.white,
        fontWeight: weight.semibold
    },
    forgotMsg: {
        color: colors.white,
        marginBottom: 30,
        alignSelf: 'center'
    }
})

const mapStateToProps = state => {
    return {
        msg: state.auth.forgotMsg
    }
}

export default connect(mapStateToProps, { forgotPassword })(ForgotPasswordForm)