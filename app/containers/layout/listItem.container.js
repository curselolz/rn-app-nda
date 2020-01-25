import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, weight, width } from '../../theme/consts.theme';
import { navigate } from '../../utils/navigation.util';
import withDebounce from '../../utils/debounce.util';
import { capitalize } from '../../utils/string.util';
import { DEFAULT_URL } from '../../utils/config.util';
import ImageLoader from '../../containers/layout/imageLoader.container';

const TouchableOpacityEx = withDebounce(TouchableOpacity)

class ListItem extends Component {

    goToDetails = () => {
        console.log('go to details screen with props: ', this.props)
        navigate('ItemDetails', this.props)
    }

    render() {
        const { price, images, name, home, shopify_id } = this.props
        return (
            <TouchableOpacityEx
                onPress={this.goToDetails}
                style={styles.listItem}
            >
                <View>
                    <ImageLoader
                        style={styles.listItemImage}
                        source={{ uri: shopify_id ? images[0] : `${DEFAULT_URL}/photos/${images[0]}` }}
                    />
                    <Text
                        style={styles.listItemName}
                        numberOfLines={2}
                    >
                        {capitalize(name)}
                    </Text>
                    <Text style={styles.listItemPrice}>${price}</Text>
                </View>
            </TouchableOpacityEx>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        margin: 10,
        width: width['100'] / 2 - 20
    },
    listItemImage: {
        width: width['100'] / 2 - 20,
        height: width['100'] / 2 - 20,
        backgroundColor: colors.grey
    },
    listItemName: {
        marginTop: 10,
        paddingHorizontal: 10,
        maxHeight: 46,
        textAlign: 'center',
        alignSelf: 'center',
    },
    listItemPrice: {
        marginTop: 5,
        alignSelf: 'center',
        fontWeight: weight.semibold,
    }
})

export default ListItem