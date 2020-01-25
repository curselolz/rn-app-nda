import React, { PureComponent } from 'react'
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, RefreshControl } from 'react-native'
import { colors, weight, width, height } from '../../theme/consts.theme'
import { navigate } from '../../utils/navigation.util'
import { NoData } from '../../containers/layout/index'
import store from '../../utils/store.util'
import { FILL_PRODUCT_LIST } from '../../actions/constants/index.constants'
import withDebounce from '../../utils/debounce.util'
import { DEFAULT_URL } from '../../utils/config.util';
import LoaderComponent from '../../containers/loader/loader.container';
import { pathParser } from '../../utils/pathParser.util';
import ImageLoader from '../../containers/layout/imageLoader.container';

const TouchableOpacityEx = withDebounce(TouchableOpacity);

class CatalogList extends PureComponent {

    handleListItem = (item) => {
        pathParser(item.path) === 2
            ? navigate('CatalogProducts', { name: item.name, prevPath: this.props.path, id: item.id })
            : navigate('SubCatalog', { path: item.path, name: item.name, prevPath: this.props.path, id: item.id })
    };
    render() {
        const { data, refreshing, getCatalogData, moreData} = this.props;
        return (
            <View>
                {data === null && <LoaderComponent />}
                {data !== null && data.length === 0 && <NoData />}
                {data !== null && data.length > 0 &&
                    <FlatList
                        data={data}
                        refreshControl={
                            <RefreshControl
                                tintColor={colors.red}
                                refreshing={refreshing}
                                onRefresh={() => getCatalogData(moreData, true)}
                            />
                        }
                        keyExtractor={(item, index) => `${item}${index}`}
                        renderItem={({ item }) =>
                            <TouchableOpacityEx
                                onPress={() => this.handleListItem(item)}
                                style={styles.listItemBody}>
                                <ImageLoader
                                    style={styles.listItemImage}
                                    source={item.photo !== null && {
                                        uri: `${DEFAULT_URL}/photos/${item.images ? item.images[0] : item.photo}`
                                    }}
                                />
                                <Text style={styles.listItemName}>{item.name.toUpperCase()}</Text>
                            </TouchableOpacityEx>
                        }
                        onEndReached={() => getCatalogData(moreData, false, true)}
                        onEndReachedThreshold={0.7}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItemBody: {
        margin: 10,
        width: width['100'] - 20,
        height: width['100'] / 2 - 20,
        justifyContent: 'center'
    },
    listItemImage: {
        width: width['100'] - 20,
        height: width['100'] / 2 - 20,
        backgroundColor: colors.grey,
        position: 'absolute',
        top: 0,
        left: 0
    },
    listItemName: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
        color: colors.white,
        fontWeight: weight.semibold,
        position: 'absolute',
        fontSize: 18
    },
    noData: {
        alignSelf: 'center',
        marginVertical: 50
    }
})

export default CatalogList