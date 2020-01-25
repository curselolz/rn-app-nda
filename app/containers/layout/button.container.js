import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { colors, weight, flex } from '../../theme/consts.theme'
import { connect } from 'react-redux'

class Button extends Component {
    render() {
        let {
            state,
            facebook,
            transparent,
            disabled,
            filter,
            upperCase,
            label,
            action,
            logout
        } = this.props
        return (
            <TouchableOpacity
                onPress={disabled ? null : action}
                disabled={state.spinnerVisible || disabled}
                style={[styles.button,
                transparent && styles.buttonTransparent,
                disabled && styles.buttonDisabled,
                facebook && styles.buttonFacebook,
                filter && styles.buttonFilter]}
            >
                {state.spinnerVisible && !facebook && !logout
                    ? <ActivityIndicator size='large' color='#fff' />
                    : <Text style={styles.buttonText}>
                        {upperCase
                            ? label.toUpperCase()
                            : label
                        }
                    </Text>
                }

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.red,
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 5,
        alignSelf: 'center',
        height: 50,
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'center'
    },
    buttonText: {
        color: colors.white,
        fontWeight: weight.default
    },
    buttonTransparent: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
        borderColor: colors.white
    },
    buttonFacebook: {
        backgroundColor: '#334F8D'
    },
    buttonDisabled: {
        backgroundColor: colors.grey
    },
    buttonFilter: {
        position: 'absolute',
        bottom: 10
    }
})

const mapStateToProps = state => {
    return {
        state: state.layout
    }
}

export default connect(mapStateToProps, null)(Button)