import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors, weight, flex, width } from '../../theme/consts.theme';

class NoDataInRadius extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <Image
                    style={styles.img}
                    source={require('../../theme/images/no-items-placeholder.png')}
                />
                <Text style={styles.text}>
                    No products in your area, try to pick a larger distance in filter!
                </Text>
            </View>
        );
    }
}
const imgScale = width['60'];

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50,
        ...flex.centered
    },
    img: {
        width: width['60'],
        height: width['60'],
    },
    text: {
        fontSize: 16,
        marginTop: 50,
        textAlign: 'center',
        color: colors.black,
        fontWeight: weight.semibold,
        marginBottom: 50,
        width: width['80']
    }
})

export default NoDataInRadius;