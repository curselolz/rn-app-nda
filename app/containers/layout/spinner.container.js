import React, { Component } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import { colors } from '../../theme/consts.theme'

class Spinner extends Component {
    render() {
        const { search } = this.props;

        return <ActivityIndicator
            style={!search && {
                marginVertical: Dimensions.get('window').height / 3
            }}
            size={search ? 'small' : 'large'}
            color={colors.red}
        />
    }
}
export default Spinner
