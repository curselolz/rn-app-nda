import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { filterPicked } from '../../actions/filter.actions';
import { flex, colors, weight } from '../../theme/consts.theme'

class FeaturesFilters extends PureComponent {

    showControl = (type) => {
        this.props.filterPicked(type)
    }

    render() {
        const { data } = this.props;
        let featuresData = data.features
        return (
            <View>
                {featuresData.map((item, index) =>
                    <View
                        style={[styles.filterSection]}
                        key={index.toString()}
                    >
                        <TouchableOpacity style={styles.filterItem} onPress={() => this.showControl(item)}>
                            <Text style={styles.filterItemLabel}>
                                {item}
                            </Text>
                            <Text style={styles.filterItemValue}>
                                {item && data[item].values.map(i => {
                                    if (i.value == data[item].selected) {
                                        return i.label
                                    }
                                })}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        )
    }
}

const styles = {
    filterSection: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        backgroundColor: colors.white
    },
    filterItem: {
        ...flex.horizontal,
        ...flex.remote,
        marginHorizontal: 15,
        marginVertical: 7.5,
        paddingVertical: 7.5,

    },
    filterItemValue: {
        fontWeight: weight.semibold
    },
    filterItemLabel: {
        color: colors.grey
    },
}
const mapStateToProps = ({ filters }) => ({
    data: filters
})

export default connect(mapStateToProps, { filterPicked })(FeaturesFilters);