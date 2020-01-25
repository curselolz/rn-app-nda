import React, { PureComponent } from 'react';
import { DEFAULT_URL } from '../../utils/config.util';
import { weight, flex, colors, width } from '../../theme/consts.theme';
import { TouchableOpacity, Dimensions, Image, Text, View, FlatList, StyleSheet } from 'react-native';
import ImageLoader from '../layout/imageLoader.container';

class ItemHeader extends PureComponent {

    componentWillUnmount() {
        console.log('COmponent wil unmount item header!')
    }

    render() {
        const { images, name, price, shopify_id } = this.props;
        const src = this.props.shopify_id ? this.props.images[0] : `${DEFAULT_URL}/photos/${this.props.images[0]}`;
        return (
            <React.Fragment>
                <ImageLoader
                    style={styles.imageMain}
                    source={{ uri: src }}
                />
                <View style={[styles.itemSection, styles.itemDetailsWrapper]}>
                    <Text
                        numberOfLines={2}
                        style={styles.itemName}
                    >
                        {name}
                    </Text>
                    <Text style={styles.itemPrice}>
                        ${price}
                    </Text>
                </View>
                <FlatList
                    horizontal
                    keyExtractor={(item, index) => `${item}${index}`}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            onPress={() => this.setState({ selected: `${DEFAULT_URL}/photos/${item}` })}
                        >
                            <ImageLoader
                                style={[styles.listImage, index === 0 && styles.listImageFirst]}
                                source={{
                                    uri: shopify_id ? item : `${DEFAULT_URL}/photos/${item}`
                                }}
                            />
                        </TouchableOpacity>
                    }
                    data={images}
                />
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    itemSection: {
        padding: 15,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1
    },
    imageMain: {
        width: width['100'],
        height: width['100'] / 3 * 2
    },
    itemDetailsWrapper: {
        ...flex.remote,
        ...flex.horizontal,
    },
    itemPrice: {
        fontWeight: weight.semibold
    },
    listImage: {
        width: width['100'] / 2 - 30,
        height: width['100'] / 2 - 30,
        marginVertical: 15,
        marginRight: 15
    },
    listImageFirst: {
        marginLeft: 15
    },
    itemName: {
        width: width['100']*0.75,
    }
});

export default ItemHeader;