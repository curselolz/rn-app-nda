import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { colors } from '../../theme/consts.theme'

class Radio extends Component {
    state = {
        valid: true
    }
    render() {
        const { label, selected } = this.props
        return (
            <TouchableOpacity
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                onPress={this.props.action}
                style={styles.radioWrapper}
            >
                <View style={[styles.radioOutside, !this.state.valid && styles.radioOutsideRequired]}>
                    {selected &&
                        <View style={styles.radioInside} />
                    }
                </View>
                {label &&
                    <Text style={styles.radioLabel}>
                        {label}
                    </Text>
                }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    radioWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 5
        // width: 150
    },
    radioOutside: {
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 50,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioOutsideRequired: {
        borderColor: colors.red
    },
    radioInside: {
        backgroundColor: colors.black,
        borderRadius: 50,
        width: 10,
        height: 10
    },
    radioLabel: {
        marginLeft: 10,
        color: colors.black
    }
})

export default Radio