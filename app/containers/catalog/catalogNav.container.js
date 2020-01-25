import React, {Component} from 'react'
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import {colors, flex, weight} from '../../theme/consts.theme'
import {capitalize} from '../../utils/string.util'

class CatalogNav extends Component {
    state = {
        routes: [{
            title: 'Men',
            value: 'man'
        }, {
            title: 'Women',
            value: 'woman'
        }, {
            title: 'Kids',
            value: 'kid'
        }],
        selectedRoute: this.props.gender !== undefined
            ? this.props.gender.toLowerCase()
            : 'man'
    }
    selectGender = (gender) => {
        this.props.action(gender)
        this.setState({selectedRoute: gender})
    }

    render() {
        return (
            <View style={styles.navWrapper}>
                {this.state.routes.map((item, index) =>
                    <TouchableOpacity style={styles.navItemWrapper} onPress={() => this.selectGender(item.value)}
                                      key={index}>
                        <View style={[styles.navItem, this.state.selectedRoute === item.value && styles.navItemActive]}>
                            <Text
                                style={[styles.navItemText, this.state.selectedRoute === item.value && styles.navItemTextActive]}>
                                {item.title.toUpperCase()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navWrapper: {
        ...flex.horizontal,
        justifyContent: 'center'
    },
    navItemWrapper: {
        flex: 0.333
    },
    navItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey
    },
    navItemActive: {
        borderBottomColor: colors.red,
        borderBottomWidth: 3
    },
    navItemText: {
        textAlign: 'center',
        color: colors.black
    },
    navItemTextActive: {
        fontWeight: weight.semibold
    }
})


export default CatalogNav