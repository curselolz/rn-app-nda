import React, { PureComponent, Component } from 'react'
import { Linking, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { createStackNavigator} from 'react-navigation'
import { fillUserData, getProfileData} from './actions/auth.actions'
import { getNotificationsCount} from './actions/notification.actions';
import {
    StartScreen,
    SignScreen,
    RestorePassword,
    NotificationsScreen,
    FilterScreen,
    CheckOutScreen,
    CartScreen
} from './utils/screens.util';
import { initOneSignall,removeListener } from './utils/appJS/oneSignal.util';
import { setTopLevelNavigator, tabNavigator, navigate} from './utils/navigation.util'
import { colors, weight } from './theme/consts.theme'
import touchIdContainer from './containers/touchIdAlert/touchId.container';
import { checkTouchIdSupported } from './utils/touchId.util';
import { getUserData } from './utils/appJS/getUserData.util';
import { getOrdersData,getOrderById} from './actions/orders.actions';
import {setAsync} from './actions/auth.actions';
import {STORED_USER_DATA} from './actions/constants/index.constants';
import setAxiosDefaults from './utils/axios.util';
import { bindActionCreators } from 'redux';
import {checkUserToken} from './actions/auth.actions';

const RootStack = createStackNavigator({
        Start: {
            screen: StartScreen,
            navigationOptions: {
                header: null
            }
        },
        Auth: {
            screen: SignScreen,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        ForgotPassword: {
            screen: RestorePassword,
            navigationOptions: {
                header: null
            }
        },
        ResetPassword: {
            screen: RestorePassword
        },
        Filter: {
            screen: FilterScreen
        },
        TouchIdScreen: {
            screen: touchIdContainer
        },
        Home: {
            screen: tabNavigator,
            navigationOptions: {
                header: null,
                gesturesEnabled: false,
            }
        },
        Notifications: {
            screen: NotificationsScreen
        },
        CheckOut: {
            screen: CheckOutScreen
        },
        Cart: {
            screen: CartScreen
        },

    },
    {//Options
        initialRouteName: 'Start',
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.red
            },
            headerTitleStyle: {
                flex: 1,
                // alignSelf:'center',
                textAlign: 'center',
                color: colors.white,
                fontWeight: weight.default
            },
        }
    }
);

class App extends Component {
    componentWillMount() {
        Linking.getInitialURL().then(url => {
            if(url) {
                const splitedUrl = url.split('stockistapp://')[1];
                const reg = '[0-9]+$';
                const id = splitedUrl.match(reg)[0];
                getUserData(this.props.fillUserData, this.props.getNotificationsCount,'',id);
            } else {
                getUserData(this.props.fillUserData, this.props.getNotificationsCount,'Home');
            }
        });
        initOneSignall();
    }

    componentDidMount() {
        Linking.getInitialURL().then(url => {
            if(url) {
                const splitedUrl = url.split('stockistapp://')[1];
                const reg = '[0-9]+$';
                const id = splitedUrl.match(reg)[0];
                    AsyncStorage.getItem(STORED_USER_DATA).then((data) => {
                        let parsedData = data !== null
                            ? JSON.parse(data)
                            : null;
                        if(parsedData !== null) {
                            setAxiosDefaults(parsedData.token);
                            fillUserData({
                                token: parsedData.token,
                                gender: parsedData.gender
                            });
                            this.props.getOrderById(id);
                            this.handleOpenURL(url);
                        }
                        else {
                            setAxiosDefaults(),
                            fillUserData({token: undefined})
                            this.props.getOrderById(id);
                            navigate('Auth');
                            this.setState({nextID:id});
                        }
                    }).catch(error => {
                        console.log(error);
                    });
        Linking.addEventListener('url', this.handleOpenURL);
    }
        }).catch(error => {
            console.log(error)
        });
    }

    componentWillUnmount() {
        removeListener();
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        const splitedUrl = typeof event === "object" ? event.url.split('stockistapp://')[1] : event.split('stockistapp://')[1];
        const reg = '[0-9]+$';
        const id = splitedUrl.match(reg)[0];
        const obj = {id:id};
        this.props.getOrderById(id);
        if(this.props.tokenExist || this.props.token) {
            if(id) {
                navigate('OrderDetails',obj);
                this.setState({nextID:id});
            }
        } else {
            navigate('Auth',obj);
                if(id) {
                    this.setState({nextID:id});
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.token !== nextProps.token) {
            if (nextProps.returnToCheckout) {
                // nextProps.getProfileData()
                getProfileData();
                navigate('Cart');
            }
        }
        const {token} = this.props;
        (token === undefined && nextProps.token !== token && !nextProps.returnToCheckout) && checkTouchIdSupported(this.state);
        (nextProps.token === undefined && token !== undefined && token !== null) && navigate('Start');
    }
    render() {
        return (
            <RootStack
                ref={nav => setTopLevelNavigator(nav)}
            />
        )
    }
}

const mapStateToProps = (state,dispatch) => {
    return {
        token: state.auth.token,
        returnToCheckout: state.auth.returnToCheckout,
        tokenExist:state.auth.tokenExist,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({
    getOrderById: getOrderById,
    fillUserData:fillUserData,
    getNotificationsCount:getNotificationsCount,
    checkUserToken:checkUserToken,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);
