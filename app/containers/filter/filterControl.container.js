import React, { Component } from 'react'
import { View, Picker, Slider, Text, Animated, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { colors, flex, weight, height } from '../../theme/consts.theme'
import MultiSlider from '@ptomasroos/react-native-multi-slider'


class FilterControl extends Component {
    componentDidMount() {
        Animated.timing(this.props.offSet, {
            duration: 300,
            toValue: 0
        }).start()
    }

    closeModal = () => {
        Animated.timing(this.props.offSet, {
            duration: 300,
            toValue: Dimensions.get('window').height
        }).start(this.props.closeModal);
    };

    render() {

        const { values, controlType, selected, minValue, maxValue } = this.props.data,
        {filtersScreen} = this.props
        return (
            <Animated.View style={{ transform: [{ translateY: this.props.offSet }] }}>
                <View style={styles.closeButtonContainer}>
                    {/* <Text style={styles.controlHeader}>
                        {this.props.selected.toUpperCase()}
                    </Text> */}
                    <TouchableOpacity onPress={this.closeModal} underlayColor="transparent" style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Choose</Text>
                    </TouchableOpacity>
                </View>
                {controlType === 'picker' &&
                    <View style={filtersScreen && {marginTop: 100}}>
                        <Picker
                            selectedValue={selected.toString()}
                            onValueChange={(item) => this.props.onChange(item.value ? item.value : item)}>
                            {values.map((item, index) =>
                                <Picker.Item
                                    key={index}
                                    label={item.label ? item.label.toString() : item.toString()}
                                    value={item.value ? item.value.toString() : item.toString()}
                                />
                            )}
                        </Picker>
                    </View>

                }
                {controlType === 'slider' &&
                    <View style={styles.sliderWrapper}>
                        <View style={styles.valuesWrapper}>
                            <Text>${selected[0]}</Text>
                            <Text>${selected[1]}</Text>
                        </View>
                        <MultiSlider
                            values={[selected[0], selected[1]]}
                            sliderLength={Dimensions.get('window').width * 0.8}
                            onValuesChange={value => this.props.onChange(value)}
                            min={minValue}
                            max={maxValue}
                            step={10}
                            allowOverlap
                            snapped
                        />
                    </View>
                }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    showtimeContainer: {
        borderTopColor: '#ededed',
        borderTopWidth: 1
    },
    showtime: {
        padding: 20,
        textAlign: 'center'
    },
    button: {
        marginTop: 25,
        marginBottom: 25
    },
    closeButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopColor: colors.grey,
        position: 'relative',
        borderTopWidth: 1,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1
    },
    controlHeader: {
        position: 'absolute',
        left: Dimensions.get('window').width / 2 - 50,
        width: 150,
        fontWeight: weight.semibold,
        backgroundColor: '#fff'
    },
    closeButton: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonText: {
        textAlign: 'center'
    },
    closeButtonText: {
        color: colors.red
    },
    sliderWrapper: {
        alignItems: 'center',
        paddingTop: 30
    },
    valuesWrapper: {
        width: Dimensions.get('window').width * 0.8,
        ...flex.horizontal,
        ...flex.remote,
        marginBottom: 25
    }

});

export default FilterControl