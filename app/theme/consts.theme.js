import React from 'react'
import { Dimensions, Platform } from 'react-native'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'

export const colors = {
    white: '#FFF',
    red: '#A93536',
    black: '#1C1C1C',
    grey: '#AAAAAA',
    darkBlue: '#012D5E',
    orange: '#ffa35f'
}

export const weight = {
    default: '500',
    semibold: '600',
    bold: '900'
}

export const width = {
    '100': Dimensions.get('window').width,
    '80': Dimensions.get('window').width * 0.8,
    '60': Dimensions.get('window').width * 0.6,
    '40': Dimensions.get('window').width * 0.4,
    '20': Dimensions.get('window').width * 0.2,
    '10': Dimensions.get('window').width * 0.1,
};

export const height = {
    '100': Dimensions.get('window').height,
    '80': Dimensions.get('window').height * 0.8,
    '60': Dimensions.get('window').height * 0.6,
    '40': Dimensions.get('window').height * 0.4,
    '20': Dimensions.get('window').height * 0.2,
    '10': Dimensions.get('window').height * 0.1
};

export const _styles = {
    container: {
        paddingTop: Platform.OS === 'ios' ? 20 : 10,
        flex: 1,
        backgroundColor: 'white',
      }
}

export const flex = {
    full: {
        flex: 1
    },
    remote: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    horizontal: {
        flexDirection: 'row'
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export const icons = {
    shopBag: <SimpleIcon name='bag' size={30} color={colors.white} />,
    filter: <FeatherIcon name='filter' size={18} color={colors.black} />,
    checked: <FeatherIcon name='check' size={20} color={colors.white} />,
    checkedBlack: <FeatherIcon name='check' size={20} color={colors.black} />,
    search: <Ionicons name='ios-search' size={20} color={colors.black} />,
    homeTab: <Ionicons name='ios-home-outline' size={25} color={colors.grey} />,
    homeTabFocused: <Ionicons name='ios-home' size={25} color={colors.darkBlue} />,
    catalogTab: <Ionicons name='ios-shirt-outline' size={25} color={colors.grey} />,
    catalogTabFocused: <Ionicons name='ios-shirt' size={25} color={colors.darkBlue} />,
    ordersTab: <Ionicons name='ios-heart-outline' size={25} color={colors.grey} />,
    ordersTabFocused: <Ionicons name='ios-heart' size={25} color={colors.darkBlue} />,
    profileTab: <Ionicons name='ios-contact-outline' size={25} color={colors.grey} />,
    profileTabFocused: <Ionicons name='ios-contact' size={25} color={colors.darkBlue} />,
    arrowBack: <Ionicons name='ios-arrow-back' size={30} color={colors.white} />,
    arrowForward: <Ionicons name='ios-arrow-forward' size={20} color={colors.red} />,
    increment: <Ionicons name='ios-arrow-up' size={30} color={colors.black} />,
    decrement: <Ionicons name='ios-arrow-down' size={30} color={colors.black} />,
    pickupCart: <Ionicons name='ios-cart-outline' size={85} color={colors.grey} />,
    camera: <Ionicons name='ios-camera-outline' size={65} color={colors.grey} />,
    camera2: <Ionicons name='ios-camera-outline' size={30} color={colors.grey} />,
    logo: require('./images/stocklist-logo.png'),
    emptyProfile: require('./images/profile.png')
}

export const shadows = {
    default: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2
    }
}