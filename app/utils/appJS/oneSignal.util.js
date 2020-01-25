import OneSignal from 'react-native-onesignal';
import {AsyncStorage} from 'react-native';
import {PLAYER_ID_FROM_ONESIGNAL} from "../../actions/constants/index.constants";

const ONESIGNAL_APPID = '78bc1b5b-ed0a-4d01-b20f-e35cea088c54';

export const initOneSignall = () => {
    console.log('init one signal')
        OneSignal.init(ONESIGNAL_APPID),
        OneSignal.addEventListener('received', onReceived),
        OneSignal.addEventListener('opened', onOpened),
        OneSignal.addEventListener('ids', onIds),
        OneSignal.configure()
};

export const removeListener = () => {
        OneSignal.removeEventListener('received', onReceived),
        OneSignal.removeEventListener('opened', onOpened),
        OneSignal.removeEventListener('ids', onIds)
}

const onReceived = (notification) => {
    console.log('on receive',notification);
};

const onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
};

const onIds = (device) => {
    console.log('id')
    console.log('Device info: ', device);
    console.log(device.userId)
    if (device.userId) {
        AsyncStorage.setItem(PLAYER_ID_FROM_ONESIGNAL, device.userId);
    }
};
