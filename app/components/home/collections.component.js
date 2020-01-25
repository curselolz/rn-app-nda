import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { colors, weight, width } from '../../theme/consts.theme'
import { navigate } from '../../utils/navigation.util'
import { DEFAULT_URL } from '../../utils/config.util';
import { capitalize } from '../../utils/string.util';
import ImageLoader from '../../containers/layout/imageLoader.container';

class Collections extends Component {
    render() {
        return (
            <FlatList
                horizontal
                data={this.props.data}
                keyExtractor={(item, index) => `${item}${index}`}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigate('ItemDetails', item)}>
                        <View style={styles.collectionItem}>
                            <ImageLoader
                                style={styles.collectionItemImage}
                                source={{
                                    uri: item.shopify_id ? item.images[0] : `${DEFAULT_URL}/photos/${item.images[0]}`
                                }}
                            />
                            <Text
                                style={styles.collectionItemName}
                                numberOfLines={2}
                            >
                                {capitalize(item.name)}
                            </Text>
                            <Text style={styles.collectionItemPrice}>
                                ${item.price}
                            </Text>
                        </View>
                    </TouchableOpacity>}
            />
        )
    }
}

const styles = StyleSheet.create({
    collectionItem: {
        marginTop: 10,
        minHeight: 200,
        justifyContent: 'center'
    },
    collectionItemImage: {
        backgroundColor: colors.grey,
        width: Dimensions.get('window').width - 20,
        marginHorizontal: 10,
        height: Dimensions.get('window').width/3
    },
    collectionItemName: {
        marginTop: 10,
        alignSelf: 'center',
        width: width['100'] * 0.9
    },
    collectionItemPrice: {
        marginTop: 5,
        alignSelf: 'center',
        fontWeight: weight.semibold
    }
})

export default Collections