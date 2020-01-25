import React, { PureComponent } from 'react';
import {
    View, Image, Text,
    StyleSheet, TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { colors, flex } from '../../theme/consts.theme';
import { TOUCH_ID_PERMISSION } from '../../actions/constants/index.constants';
import { navigate } from '../../utils/navigation.util';
import { withNavigation } from 'react-navigation';
import {getOrderById} from '../../actions/orders.actions';


class TouchIdAlert extends PureComponent {
    static navigationOptions = {
        header: null
    };

    handleTap = (value) => {
        AsyncStorage.setItem(TOUCH_ID_PERMISSION, value);
        if(this.props.navigation.state.params) {
            if(this.props.navigation.state.params.nextID) {
                const id = parseInt(this.props.navigation.state.params.nextID);
                this.props.getOrderById(id);
                navigate('OrderDetails',{id});
            }
        }
        else {
            navigate('Home')
        }
    }


    render() {
        let title = 'Log in to Stokist with Touch ID';
        let mainText = 'Use your fingerprint to log in on Stokist \n instead of typing your password \n (You can always change it in settings)'
        // if (touchIDAvailable !== 'TouchID') {
        //     title = 'Log in to Stokist with Face ID';
        //     mainText = 'Use your face to log in on Stokist \n instead of typing your password \n (You can always change it in settings)'
        // }

        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Image
                        style={styles.image}
                        source={require('../../theme/images/touchIdImage.png')}
                    />
                </View>
                <View style={styles.centerView}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.secondaryText}>{mainText}</Text>
                </View>
                <View style={styles.bottomView}>
                    <TouchableOpacity
                        onPress={() => this.handleTap('yes')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}> Use Touch ID </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.handleTap('no')}
                        style={[styles.button, { backgroundColor: colors.grey }]}
                    >
                        <Text style={styles.buttonText}>No, thanks</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...flex.full
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: 10,
        width: '80%',
        textAlign: 'center',
    },
    secondaryText: {
        color: colors.grey,
        textAlign: 'center',
        width: '85%',
        fontSize: 13,
    },
    topView: {
        flex: 4.5,
        ...flex.centered,
    },
    centerView: {
        flexGrow: 1,
        ...flex.centered,
    },
    bottomView: {
        flex: 3,
        ...flex.centered,
        width: '100%'
    },

    button: {
        width: '90%',
        height: 50,
        backgroundColor: colors.red,
        borderRadius: 5,
        ...flex.centered,
        marginVertical: 5
    },
    buttonText: {
        color: 'white'
    }

})

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps, {getOrderById})(withNavigation(TouchIdAlert));
