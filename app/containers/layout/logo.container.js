import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'

class Logo extends Component {
    render() {
        return (
            <Image
                style={styles.logo}
                source={require('../../theme/images/stocklist-logo.png')}
            />
        );
    }
}
const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80
    }
})

export default Logo