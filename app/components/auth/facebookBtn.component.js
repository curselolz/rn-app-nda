import React, { Component } from 'react';
import { FBLoginManager } from 'react-native-facebook-login';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { Button } from '../../containers/layout';
import { signUpFacebook } from '../../actions/auth.actions';

class FacebookBtn extends Component {
    handleSignInFacebook = () => {
        this.props.onFacebookPress()
        console.log('facebook button pressed');
        const { signUpFacebook } = this.props;
        if (Platform.OS === 'ios') {
            FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web);
            FBLoginManager.loginWithPermissions(['email'],(error, data) => {
                !error
                    ? signUpFacebook(data.credentials.token)
                    : console.log('Facebook login not work',error)
            })
        } else {
            FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.WebView);
            FBLoginManager.loginWithPermissions(['email'], (error, data) => {
                !error
                    ? signUpFacebook(data.credentials.token)
                    : console.log(error, data)
            });
        }
    };
    render() {
        return (
            <Button
                facebook
                action={this.handleSignInFacebook}
                label='Sign with Facebook'
            />
        );
    }
}

export default connect(null, { signUpFacebook })(FacebookBtn);