import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { colors, weight, icons, shadows } from '../../theme/consts.theme'
import { goBack, navigate, resetAction } from '../../utils/navigation.util'
import { connect } from 'react-redux'
import { getSubCatalogData } from '../../actions/catalog.actions'
import {signUpOnCheckout} from '../../actions/auth.actions';


class arrowBack extends Component {
    handleBack = () => {
        const { prevPath, goto, pop, navigation,signed, signUpOnCheckout } = this.props
        // prevPath && this.props.getSubCatalogData(prevPath)
        signed ? (navigate('HomeTab') ,signUpOnCheckout())
        :goto
            ? navigation.navigate(goto)
            : pop
                ? navigation.goBack()
                : goBack()
    }
    render() {
        return (
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 15 }} style={styles.shopItemsWrapper} onPress={() => this.handleBack()}>
                {icons.arrowBack}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    shopItemsWrapper: {
        position: 'relative',
        padding: 7.5,
        paddingLeft: 15
    }
})

const mapStateTProps = (state) => ({
    signed: state.auth.returnToCheckout
})

export default connect(mapStateTProps, { getSubCatalogData, signUpOnCheckout })(arrowBack)
