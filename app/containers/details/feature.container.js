import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, flex, weight } from '../../theme/consts.theme';
import Option from '../../components/details/option.component';

class Feature extends Component {
    render() {
        const { label, data, selected, action } = this.props;
        return (
            <View style={styles.itemSection}>
                <Text style={styles.itemSectionHeader}>
                    Available {label.toLowerCase()}
                </Text>
                <View style={styles.itemSizesList}>
                    <FlatList
                        horizontal
                        data={data}
                        keyExtractor={(item, index) => `${item}${index}`}
                        renderItem={({ item, index }) =>
                            <Option
                                key={index}
                                item={item}
                                selected={selected.filter(option => option.id === item.id).length !== 0}
                                action={item => action(item)}
                            />}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemSection: {
        padding: 15,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1
    },
    itemSectionHeader: {
        fontWeight: weight.semibold,
        marginBottom: 10
    },
    itemSizesList: {
        ...flex.horizontal
    },
})

export default Feature;