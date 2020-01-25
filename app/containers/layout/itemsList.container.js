import React, { PureComponent } from 'react'
import { FlatList, View, Text } from 'react-native'
import { ListItem } from './index'

class ItemsList extends PureComponent {
    render() {
        let { data, home, action } = this.props
        return (
            <View>
                <FlatList
                    data={data}
                    extraData={data}
                    style={{ paddingBottom: 60 }}
                    keyExtractor={(item, index) => `${item}${index}`}
                    renderItem={({ item }) => <ListItem {...item} home={home} />}
                    numColumns={2}
                    getItemLayout={(data, index) => (
                        { length: 220, offset: 200 * index, index }
                    )}
                />
            </View>
        )
    }
}

export default ItemsList