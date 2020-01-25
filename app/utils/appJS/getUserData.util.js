import { AsyncStorage, Alert} from 'react-native';
import { navigate } from '../navigation.util';
import TouchID from 'react-native-touch-id';
import setAxiosDefaults from '../axios.util'
import { TOUCH_ID_PERMISSION } from '../../actions/constants/index.constants';
import { STORED_USER_DATA } from '../../actions/constants/index.constants';
import { DEBUGGER_MODE } from '../config.util';

const getUserDataStored = (fillUserData, getNotificationsCount,navPath,id) => {
    AsyncStorage.getItem(STORED_USER_DATA).then((data) => {
        let parsedData = data !== null
            ? JSON.parse(data)
            : null;
        if(parsedData !== null && navPath !== '') {
        setAxiosDefaults(parsedData.token);
        navigate('Home');
        getNotificationsCount();
        getInternalNotification(getNotificationsCount);
        fillUserData({
            token: parsedData.token,
            gender: parsedData.gender
        })
        } else if (parsedData !== null && navPath === '') {
        setAxiosDefaults(parsedData.token);
        getNotificationsCount();
        getInternalNotification(getNotificationsCount);
        fillUserData({
            token: parsedData.token,
            gender: parsedData.gender
        })
        navigate('OrderDetails',{id})
        } else {
            setAxiosDefaults();
            fillUserData({token: undefined});
        }
        }).catch(error => {
        console.log(error);
        });
}
export const getUserData = (fillUserData, getNotificationsCount,navPath,id) => {
    AsyncStorage.getItem(TOUCH_ID_PERMISSION).then((value) => {
        if (value === 'yes') {
            TouchID.authenticate('To Log in to Stokist with Touch ID')
                .then(success => {
                    getUserDataStored(fillUserData, getNotificationsCount,navPath,id);
                })
                .catch(error => {
                    Alert.alert('Sorry', 'Device not support touch ID');
                    AsyncStorage.setItem(TOUCH_ID_PERMISSION, JSON.stringify('no'))
                    console.log(error,'error')
                    setAxiosDefaults()
                    fillUserData({token: undefined})
                });
        } else {
            getUserDataStored(fillUserData, getNotificationsCount,navPath,id);
        }
    })
};

const getInternalNotification = (getNotificationsCount) => {
    setInterval(getNotificationsCount, 180000)
};
