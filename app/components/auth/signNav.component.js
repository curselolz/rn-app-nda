import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, weight, width } from '../../theme/consts.theme'
import { navigate } from '../../utils/navigation.util'


class SignNav extends PureComponent {
    render() {
        let {route, action} = this.props

        return (
            <View style={styles.nav}>
                <TouchableOpacity
                    style={[styles.navItem, route === 'Sign In' && styles.navItemSelected]}
                    onPress={() => route === 'Sign Up' && action('Sign In')}
                >
                    <Text style={[styles.navItemText, route === 'Sign In' && styles.navItemTextSelected]}>
                        {'Sign In'.toUpperCase()}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.navItem, route === 'Sign Up' && styles.navItemSelected]}
                    onPress={() => route === 'Sign In' && action('Sign Up')}
                >
                    <Text style={[styles.navItemText, route === 'Sign Up' && styles.navItemTextSelected]}>
                        {'Sign Up'.toUpperCase()}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nav: {
        width: width['80'],
        flexDirection: 'row',
        justifyContent: 'center'
    },
    navItem: {
        flex: 0.5,
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    navItemSelected: {
        borderBottomWidth: 3
    },
    navItemTextSelected: {
        fontWeight: weight.semibold
    },
    navItemText: {
        textAlign: 'center',
        color: colors.black,
        fontWeight: weight.default
    }
})

export default SignNav