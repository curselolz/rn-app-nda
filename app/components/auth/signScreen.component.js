import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import SignNav from './signNav.component';
import { flex } from '../../theme/consts.theme';
import SignUpForm from '../../containers/auth/signUpForm.container';
import SignInForm from '../../containers/auth/signInForm.container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class SignScreen extends PureComponent {
    static navigationOptions =({navigation})=> ({
        headerLeft: null,
        headerRight: null,
        title: (navigation.state.params && navigation.state.params.title) || 'Sign In'
    });

    state = {
        route: (this.props.navigation.state.params && this.props.navigation.state.params.title) || 'Sign In'
    }
    changeRoute = (route) => {
        this.setState({route})
        this.props.navigation.setParams({ title: route })
    }

    render() {
        const {route} = this.state;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.wrapper}
                enableResetScrollToCoords={false}
                >
                <View style={styles.body}>
                    <SignNav
                    action={(route) => this.changeRoute(route)}
                    route={route} />
                    {route === 'Sign Up'
                        ? <SignUpForm />
                        : <SignInForm />
                    }
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        ...flex.centered,
        paddingBottom: 50,
        backgroundColor: 'transparent'
    },
    body: {
        ...flex.full,
        ...flex.centered,
        marginTop: 50
    }
});

export default SignScreen
