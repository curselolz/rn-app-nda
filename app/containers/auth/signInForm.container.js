import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../actions/auth.actions'
import { Input, Button } from '../../containers/layout/index'
import { weight, colors, width } from '../../theme/consts.theme'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { navigate } from '../../utils/navigation.util'
import FacebookBtn from '../../components/auth/facebookBtn.component';
import { withNavigation } from 'react-navigation';

class SignInForm extends Component {

    handleSignIn = () => {
        this.validate() && this.collectData();

    };
    validate = () => {
        let requiredFields = Object.values(this.refs).filter(field => field.props.required),
            valid = requiredFields.map(field => {
                return !!field.handleValidation()
            });
            !this.refs.email.handleValidation() && alert('Try again. Not a valid email address.')

        return !valid.includes(false)
    };
    collectData = () => {
        let fields = Object.values(this.refs),
            data = {};

        fields.map(field => field.props.type !== undefined && (data[field.props.type] = field.state.value));
        if (this.props.playerId) {
            data['player_id'] = this.props.playerId;
        }
        this.props.signIn(data);
        if(this.props.navigation.state.params) {
            console.log('ok')
        } else {
            console.log('no data');
        }
    };
    render() {
        const { authSuccess, authMsg } = this.props;
        return (
            <View style={styles.form}>
                <Input
                    ref='email'
                    type='email'
                    required
                />
                <Input
                    ref='password'
                    type='password'
                    required
                    style={styles.passwordInput}
                />
                {!authSuccess && <Text style={styles.errorText}>{authMsg}</Text>}
                <Button
                    action={this.handleSignIn}
                    label='Sign In'
                    upperCase
                />
                <FacebookBtn
                    onFacebookPress={() => console.log('Start Facebook login')}
                />
                <TouchableOpacity
                    style={styles.forgotLinkWrapper}
                    onPress={() => navigate('ForgotPassword')}
                >
                    <Text style={styles.forgotLink}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        marginTop: 15
    },
    forgotLinkWrapper: {
        marginTop: 50,
        flexDirection: 'row',
        width: 125,
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    forgotLink: {
        fontWeight: weight.semibold,
        color: colors.black
    },
    passwordInput: {
        marginBottom: 50
    },
    errorText: {
        color: colors.red,
        alignSelf: 'center',
        marginBottom: 10,
        fontWeight: weight.semibold
    }
});

const mapStateToProps = state => {
    return {
        authSuccess: state.auth.authSuccess,
        authMsg: state.auth.authMsg,
        playerId: state.auth.playerId
    }
};

export default connect(mapStateToProps, { signIn })(withNavigation(SignInForm));
