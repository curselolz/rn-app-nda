import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
    Linking
} from 'react-native'
import { Logo } from '../../containers/layout/index';
import { Button } from '../../containers/layout/index';
import { weight, colors, flex, width, height, _styles } from '../../theme/consts.theme';
import { connect } from 'react-redux';
import { addPlayerId } from '../../actions/auth.actions';
import { navigate } from '../../utils/navigation.util';
import { PLAYER_ID_FROM_ONESIGNAL } from "../../actions/constants/index.constants";
import LoaderComponent from '../../containers/loader/loader.container';
import {checkUserToken} from '../../actions/auth.actions';
import { initOneSignall } from "../../utils/appJS/oneSignal.util";

class StartScreen extends PureComponent {

    static navigationOptions = {
        header: false
    };

    handleSkipLoginPress = () => {
        AsyncStorage.getItem(PLAYER_ID_FROM_ONESIGNAL).then(data => {
                this.props.addPlayerId(data);
        });
        navigate('Home');
    }

    handlePress = () => {
        this.getPlayerIdForOnesignal();
        navigate('Auth', {title: 'Sign Up'});
    };

    getPlayerIdForOnesignal = () => {
        AsyncStorage.getItem(PLAYER_ID_FROM_ONESIGNAL).then(data => {
            this.props.addPlayerId(data);
        })
    };

    render() {
        const { token } = this.props
        return (
            <ImageBackground source={require('../../theme/images/auth/start-bg.jpg')} style={_styles.container}>
                <StatusBar
                hidden={Platform.OS === 'android'}
                />
                <View style={styles.wrapper}>
                    <View style={styles.body}>
                        <View style={styles.bodyTop}>
                            {/* <Logo /> */}
                            <View>
                                <Text style={styles.header}>
                                    Stockist
                                </Text>
                                <Text style={styles.description}>
                                    Shop Local Fashion On-Demand
                                </Text>
                            </View>
                        </View>
                        {token === null && <LoaderComponent />}
                        {token === undefined &&
                            <View style={styles.bodyBottom}>
                                <Button
                                    label='Sign up'
                                    upperCase
                                    action={this.handlePress}
                                />
                                <Button
                                    label='Skip for now'
                                    upperCase
                                    transparent
                                    action={this.handleSkipLoginPress}
                                />
                                <View style={styles.footer}>
                                    <Text style={styles.footerTxt}>
                                        Already have an account?
                                </Text>
                                    <View style={styles.signIn}>
                                        <TouchableOpacity
                                            onPress={() => navigate('Auth', {title: 'Sign In'})}>
                                            <Text
                                                style={[styles.footerTxt, styles.signInTxt]}
                                            >
                                                Sign In
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        ...flex.full,
        justifyContent: 'center'
    },
    header: {
        fontWeight: weight.bold,
        textAlign: 'center',
        fontSize: 40,
        color: colors.white,
        marginVertical: 20
    },
    body: {
        flex: 0.8
    },
    bodyTop: {
        marginTop: height['20'] / 3,
        flex: 0.7,
        ...flex.remote
    },
    bodyBottom: {
        flex: 0.3,
        ...flex.remote
    },
    description: {
        width: width['80'],
        fontWeight: weight.default,
        lineHeight: 20,
        fontSize: 15,
        textAlign: 'center',
        color: colors.white,
        marginBottom: '40%'
    },
    footer: {
        flexDirection: 'row',
        marginTop: 30
    },
    footerTxt: {
        color: colors.white
    },
    signIn: {
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        marginLeft: 5,
    },
    signInTxt: {
        fontWeight: weight.semibold
    }
});


const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        playerId: state.auth.playerId
    }
};

export default connect(mapStateToProps, { addPlayerId,checkUserToken,initOneSignall })(StartScreen)
