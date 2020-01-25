import React, { Component } from 'react';
import { colors, shadows } from '../../theme/consts.theme';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

class Option extends Component {
    render() {
        const { item, selected, action } = this.props;
        return (
            <React.Fragment>
                {item.feature.name == 'Colors'
                    ? <TouchableOpacity
                        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                        onPress={() => action(item)}
                    >
                        <View
                            style={[styles.color,
                            item.disabled && styles.disabled,
                            selected && styles.colorSelected,
                            {
                                backgroundColor: item.name.toLowerCase()
                            }]}
                        >
                        </View>
                    </TouchableOpacity>
                    : <TouchableOpacity
                        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }
                        }
                        onPress={() => action(item)}
                    >
                        <View
                            style={[styles.item,
                            item.disabled && styles.disabled,
                            selected && styles.itemSelected]}
                        >
                            <Text
                                style={{
                                    color: selected
                                        ? colors.white
                                        : colors.black
                                }}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity >
                }
            </React.Fragment>
        )
    }
}
const styles = StyleSheet.create({
    color: {
        height: 25,
        width: 25,
        marginRight: 15,
        marginVertical: 5,
        marginLeft: 5,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    colorSelected: {
        ...shadows.default
    },
    item: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 15
    },
    disabled: {
        opacity: 0.5
    },
    itemSelected: {
        backgroundColor: colors.red
    },
})

export default Option;