import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { capitalize } from '../../utils/string.util';
import { navigate } from '../../utils/navigation.util';
import { connect } from 'react-redux';
import TouchID from 'react-native-touch-id';
import { getUserAddresses } from '../../actions/address.actions';
import { getUserCards } from '../../actions/creditCards.actions';
import { Button, Input, Radio } from '../layout/index'
import { width, height, colors, flex, weight, icons } from '../../theme/consts.theme'
import { View, Image, Text, StyleSheet, AsyncStorage, TouchableOpacity, PixelRatio, Switch, Platform } from 'react-native'
import { TOUCH_ID_PERMISSION } from '../../actions/constants/index.constants';
import { DEFAULT_URL } from '../../utils/config.util';


class ProfileData extends Component {
    state = {
        editMode: false,
        touchIDAvailable: null,
        touchIDEnabled: null,
        photo: {
            uri: ''
        }
    };
    handleEdit = () => {
        this.setState({ editMode: true })
    };
    handleLogout = () => {
        this.props.clearUserData()
    };

    componentWillMount() {
        this.props.getUserAddresses();
        this.props.getUserCards();
        this.setState({ gender: this.props.data.filter(item => item.label === 'Gender')[0].value })
        this.checkTouchIdSupported()
    }

    checkTouchIdSupported = () => {
        if (Platform.OS === 'ios') {
            TouchID.isSupported()
                .then(biometryType => {
                    this.setState({ touchIDAvailable: biometryType })
                    AsyncStorage.getItem(TOUCH_ID_PERMISSION).then((res) => {
                        if (res === 'yes') {
                            this.setState({
                                touchIDEnabled: true,
                            });
                        } else if (res === 'no') {
                            this.setState({
                                touchIDEnabled: false,
                            });
                        }
                    });
                }).catch(e => {
                    console.log('not supported', e)
                });
        }
    }

    handleSave = () => {
        let data = this.state,
            formData = new FormData,
            keys = Object.keys(data);
        keys.map(key =>
            (key !== 'editMode' && key !== 'photo' && key !== 'touchIDAvailable' && key !== 'touchIDEnabled') && formData.append(key, data[key])
        );
        data.photo.uri !== '' && formData.append('photo', data.photo);
        if (data.email === '' || !this.refs.email.handleValidation()) {
            return alert('Try again. Not a valid email address.')
        } else {
            console.log('valid')
        }

        this.props.saveProfileData(formData);

        this.setState({ editMode: false });
    };

    handleImage = () => {
        ImagePicker.showImagePicker({
            maxWidth: width['100'] * PixelRatio.get() / 4,
            maxHeight: height['100'] * PixelRatio.get() / 4,
            quality: 0.5
        }, res => {
            this.setState({
                cameraRollVisible: false,
                photo: {
                    type: 'image/jpeg',
                    name: res.fileName || 'my photo.JPG',
                    ...res
                }
            })
        })
    };

    touchIdSwitch = () => {
        const { touchIDEnabled } = this.state;
        if (touchIDEnabled) {
            AsyncStorage.setItem(TOUCH_ID_PERMISSION, 'no').then(() => this.setState({ touchIDEnabled: false }))
        } else {
            AsyncStorage.setItem(TOUCH_ID_PERMISSION, 'yes').then(() => this.setState({ touchIDEnabled: true }))
        }

    }

    render() {
        const { data, errMsg, img, settingsData, addresses, creditCards } = this.props;
        const { touchIDAvailable, touchIDEnabled } = this.state;
        console.log('Image or uri: ', img )
        return (
            <View style={styles.profileWrapper}>
                <View style={styles.imageWrapper}>
                    <Image
                        key='image'
                        style={styles.image}
                        source={(img !== `${DEFAULT_URL}/photos/null` || this.state.photo.uri)
                            ? {
                                uri: this.state.photo.uri !== ''
                                    ? this.state.photo.uri
                                    : img
                            }
                            : icons.emptyProfile}
                    />
                    {this.state.editMode &&
                        <TouchableOpacity onPress={() => this.handleImage()} style={styles.iconWrapper}>
                            {icons.camera}
                        </TouchableOpacity>
                    }
                </View>
                <View key='data' style={styles.profileDataWrapper}>
                    {data.map((item, index) =>
                        <View
                            style={[styles.profileDataItem, index === data.length - 1 && styles.itemUnbordered]}
                            key={index}
                        >
                            <Text style={styles.itemLabel}>
                                {item.label}
                            </Text>
                            {item.control === 'input' &&
                                <Input
                                    ref={item.type}
                                    callbackChange={value => this.setState({ [item.type]: value })}
                                    required={item.type === 'email'}
                                    profile
                                    type={item.type}
                                    editable={this.state.editMode}
                                    defaultValue={item.value}
                                />
                            }
                            {
                                item.control === 'dropdown' &&
                                <View style={styles.radioWrapper}>
                                    {this.state.editMode
                                        ? [
                                            <Radio
                                                key='womanRadio'
                                                label='Woman'
                                                ref='woman_radio'
                                                action={() => this.setState({ gender: 'woman' })}
                                                selected={this.state.gender === 'woman'}
                                            />,
                                            <Radio
                                                key='manRadio'
                                                label='Man'
                                                ref='man_radio'
                                                action={() => this.setState({ gender: 'man' })}
                                                selected={this.state.gender === 'man'}
                                            />
                                        ]
                                        : <Text>{capitalize(item.value)}</Text>
                                    }
                                </View>
                            }
                        </View>
                    )}
                </View>
                <Text style={styles.settingsHeader}> Settings </Text>
                <View key='buttons' style={styles.profileDataWrapper}>
                    {settingsData.map((item, index) =>
                        <TouchableOpacity
                            key={index.toString()}
                            onPress={() => item.type === 'Addresses'
                                ? navigate('Addresses')
                                : item.type === 'Payments'
                                    ? navigate('CreditCards')
                                    : navigate('ChangePassword')}
                            style={[styles.profileDataItem, index === settingsData.length - 1 && styles.itemUnbordered, { marginRight: 5 }]}
                        >
                            <Text style={styles.itemLabel}>
                                {item.type}
                            </Text>
                            <View style={styles.rowView}>
                                <View style={[styles.radioWrapper]}>
                                    <Text>
                                        {item.type === 'Addresses'
                                            ? (addresses ? addresses.length : '0')
                                            : item.type === 'Payments'
                                                ? (creditCards ? creditCards.length : '0')
                                                : ''
                                        }
                                    </Text>
                                </View>
                                <View style={[styles.radioWrapper, { marginLeft: 7 }]}>
                                    <Text>
                                        {icons.arrowForward}
                                    </Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    )}

                </View>
                {touchIDAvailable &&
                    <React.Fragment>
                        <Text style={styles.settingsHeader}> Security </Text>
                        <View key='security' style={styles.profileDataWrapper}>
                            <View style={[styles.profileDataItem, styles.itemUnbordered]}>
                                <Text style={styles.itemLabel}>Enable TouchID</Text>
                                <View style={styles.radioWrapper}>
                                    <Switch
                                        onValueChange={this.touchIdSwitch}
                                        value={touchIDEnabled}
                                    />
                                </View>
                            </View>
                        </View>
                    </React.Fragment>
                }


                {errMsg &&
                    <Text style={styles.errMsg}>{errMsg}</Text>
                }

                <Button
                    key='editBtn'
                    upperCase
                    label={this.state.editMode ? 'Save' : 'Edit'}
                    action={() => this.state.editMode ? this.handleSave() : this.handleEdit()}
                />
                <Button
                    logout
                    key='logoutBtn'
                    upperCase
                    label={this.state.editMode ? 'Cancel' : 'Log out'}
                    action={() => this.state.editMode ? this.setState({ editMode: false }) : this.handleLogout()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileWrapper: {
        ...flex.centered
    },
    imageWrapper: {
        ...flex.centered,
        height: 120,
        borderRadius: 60,
        width: 120,
        position: 'relative'
    },
    iconWrapper: {
        position: 'absolute',
        zIndex: 2
    },
    image: {
        borderRadius: 60,
        borderWidth: 1,
        borderColor: colors.grey,
        height: 120,
        width: 120,
        resizeMode: 'cover',
        overflow: 'hidden'
    },
    profileDataWrapper: {
        backgroundColor: colors.white,
        marginVertical: 20,
        width: width['100'],
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        borderTopWidth: 1,
        borderTopColor: colors.grey
    },
    profileDataItem: {
        marginLeft: 15,
        marginRight: 15,
        ...flex.horizontal,
        ...flex.remote,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey
    },
    itemUnbordered: {
        borderBottomWidth: 0
    },
    itemLabel: {
        color: colors.grey,
        fontWeight: weight.semibold,
        fontSize: 15
    },
    itemValue: {
        fontSize: 15
    },
    radioWrapper: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
        // flex:
    },
    errMsg: {
        color: colors.red,
        marginVertical: 10
    },
    rowView: {
        ...flex.horizontal,
        justifyContent: 'center',
        alignItems: 'center'
    },
    settingsHeader: {
        width: width['100'],
        fontSize: 18,
        marginLeft: 15
    }
});

const mapStateToProps = ({ addresses, creditCards }) => ({
    addresses: addresses.existingAddresses,
    creditCards: creditCards.cards
});

export default connect(mapStateToProps, { getUserAddresses, getUserCards })(ProfileData);
