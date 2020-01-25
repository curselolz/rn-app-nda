import React, {Component} from 'react';
import { KeyboardAvoidingView} from 'react-native';
import ArrowBack from '../../containers/layout/arrowBack.container';
import ChangePasswordData from "../../containers/profile/changePasswordData.container";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {flex} from "../../theme/consts.theme";

class ChangePasswordScreen extends Component {
    static navigationOptions = {
        title: 'Change Password',
        headerLeft: <ArrowBack/>,
    };

    render() {
        return (
            <KeyboardAvoidingView style={flex.full}>
                <KeyboardAwareScrollView>
                    <ChangePasswordData/>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
        )
    }
}

export default ChangePasswordScreen;