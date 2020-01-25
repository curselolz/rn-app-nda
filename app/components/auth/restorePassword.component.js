import React, { PureComponent } from 'react'
import { ImageBackground, View, StyleSheet,StatusBar } from 'react-native'
import { flex } from '../../theme/consts.theme'
import ForgotPasswordForm from '../../containers/auth/forgotPasswordForm.container'

class RestorePassword extends PureComponent {
    static navigationOptions = {
        header: false
    }
    componentWillMount(){
        StatusBar.setBarStyle('light-content', true);
    }
    render() {
        let route = this.props.navigation.state.routeName,
            backgroundUrl = route === 'ForgotPassword'
                ? require('../../theme/images/auth/forgot-bg.png')
                : require('../../theme/images/auth/start-bg.jpg');
        return (
            <ImageBackground source={backgroundUrl} style={flex.full}>
                <View style={styles.wrapper}>
                    <View style={styles.body}>
                         <ForgotPasswordForm  />
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        ...flex.full
    },
    body: {
        flex: 0.6,
        alignItems: 'center'
    }
});

export default RestorePassword;