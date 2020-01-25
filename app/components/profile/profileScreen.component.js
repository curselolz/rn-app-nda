import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View} from 'react-native'
import { Button,} from '../../containers/layout/index'
import { flex, weight } from '../../theme/consts.theme'
import ProfileData from '../../containers/profile/profileData.container'
import { navigate } from '../../utils/navigation.util'
import setAxiosDefaults from '../../utils/axios.util'
import ShopBag from '../../containers/layout/shopBag.container'
import { clearUserData, getProfileData, saveProfileData } from '../../actions/auth.actions'
import { DEFAULT_URL } from '../../utils/config.util';
import LoaderComponent from '../../containers/loader/loader.container';

class ProfileScreen extends Component {
    static navigationOptions = {
        headerRight: <ShopBag />,
        headerLeft: <View/>,
        title: 'Profile'
    };
    componentDidMount() {
        const { token, getProfileData } = this.props;

        token !== undefined && (setAxiosDefaults(token), getProfileData());
    }
    render() {
        const {
            token,
            profile,
            clearUserData,
            saveProfileData,
            errMsg
        } = this.props,
            profileData = profile !== null && [{
                label: 'First name',
                type: 'first_name',
                control: 'input',
                value: profile.buyer.first_name || ''
            }, {
                label: 'Last name',
                type: 'last_name',
                control: 'input',
                value: profile.buyer.last_name || ''
            }, {
                label: 'Email',
                type: 'email',
                control: 'input',
                value: profile.email && profile.email !== 'NULL' ? profile.email : ''
            }, {
                label: 'Phone',
                type: 'phone',
                control: 'input',
                value: profile.buyer.phone || ''
            }, {
                label: 'Gender',
                control: 'dropdown',
                value: profile.buyer.gender || ''
            }],
            settingsData = profile !== null && [
                { type: 'Addresses'},
                { type: 'Payments'},
                { type: 'Change Password'}
            ];
            console.log(profileData);
            console.log('DATA')
        return (
            <ScrollView contentContainerStyle={styles.profileWrapper}>
                {(token !== undefined && token !== null && profile !== null) &&
                    <ProfileData
                        saveProfileData={saveProfileData}
                        clearUserData={clearUserData}
                        data={profileData}
                        settingsData={settingsData}
                        errMsg={errMsg}
                        img={`${DEFAULT_URL}/photos/${this.props.profile.buyer.photo}`}
                    />
                }
                {profile === null && token !== undefined && <LoaderComponent />}
                {token === undefined && profile === null &&
                    [
                        <Text key='signText' style={styles.signUpText}>Please sign up to view profile.</Text>,
                        <Button key='signBtn' upperCase label='Sign up' action={() => navigate('Auth', {title: 'Sign Up'})} />
                    ]
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    signUpText: {
        marginVertical: 10,
        fontWeight: weight.semibold
    },
    profileWrapper: {
        ...flex.centered,
        paddingVertical: 25
    }
});

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        profile: state.auth.profile,
        errMsg: state.auth.errMsg
    }
}

export default connect(mapStateToProps, { clearUserData, getProfileData, saveProfileData })(ProfileScreen)
