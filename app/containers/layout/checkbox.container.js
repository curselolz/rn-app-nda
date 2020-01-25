import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { colors, icons } from '../../theme/consts.theme'

class Checkbox extends Component {
    state = {
        valid: true
    }
    render() {
        return (
            <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} onPress={this.props.action}>
                <View style={[styles.checkboxOutside, !this.state.valid && styles.checkboxOutsideRequired]}>
                    {this.props.selected && icons.checkedBlack}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    checkboxOutside: {
        borderColor: colors.black,
        borderWidth: 1,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxOutsideRequired: {
        borderColor: colors.red
    },
    checkboxInside: {
        height: 10,
        width: 10,
        backgroundColor: colors.black
    }
})

export default Checkbox