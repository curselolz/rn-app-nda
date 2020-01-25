import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {connect} from 'react-redux';
import {filterPicked} from '../../actions/filter.actions';
import { flex, colors, weight } from '../../theme/consts.theme'
import { DISTANCE_SORTING } from '../../actions/constants/index.constants';

class DistanceSorting extends PureComponent {

    showControl = (type) => {
        this.props.filterPicked(type)
    }

    render() {
        const {data} =this.props;
        return (
            <View style={styles.filterSection}>
                <TouchableOpacity style={styles.filterItem} onPress={() => this.showControl('sorting')}>
                    <Text style={styles.filterItemLabel}>
                          
                        </Text>
                    <Text style={styles.filterItemValue}>
                        {data.selected}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    filterSection: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: colors.grey,
        borderBottomColor: colors.grey,
        backgroundColor: colors.white
    },
    filterItem: {
        ...flex.horizontal,
        ...flex.remote,
        marginHorizontal: 15,
        marginVertical: 7.5,
        paddingVertical: 7.5
    },
    filterItemValue: {
        fontWeight: weight.semibold
    },
    filterItemLabel: {
        color: colors.grey
    },
}
const mapStateToProps = ({filters}) => ({
    data: filters.sorting
})

export default connect(mapStateToProps, {filterPicked})(DistanceSorting);