import React, { Component } from 'react'
import { Text } from 'react-native'
import { weight } from '../../theme/consts.theme'

class NoData extends Component {
    render() {
        return <Text
            style={{
                marginVertical: 50,
                alignSelf: 'center',
                fontWeight: weight.semibold
            }}>
            NO DATA
            </Text>
    }
}

export default NoData