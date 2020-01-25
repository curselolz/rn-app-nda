import {AsyncStorage, Platform} from 'react-native';
import { navigate } from './navigation.util';
import TouchID from 'react-native-touch-id';
import { TOUCH_ID_PERMISSION, TOUCH_ID_DEVICE } from '../actions/constants/index.constants';

export const checkTouchIdSupported = (nextScreen) => {
    if (Platform.OS === 'ios') {
        TouchID.isSupported()
            .then(biometryType => {
                AsyncStorage.getItem(TOUCH_ID_PERMISSION).then((res) => {
                    if (res !== null) {
                        navigate('Home')
                    } else {
                        navigate('TouchIdScreen',nextScreen);
                    }
                });
            }).catch(e => {
                navigate('Home')
                console.log('not supported', e)
            });
    } else {
        navigate('Home')
    }
}
