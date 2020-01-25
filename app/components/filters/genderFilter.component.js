import React, {PureComponent} from 'react';
import {View, TouchableOpacity,Text} from 'react-native';
import {connect} from 'react-redux';
import {filterPicked} from '../../actions/filter.actions';
import {flex, colors, weight} from '../../theme/consts.theme'
import { GENDER_FILTER } from '../../actions/constants/index.constants';

class GenderFilter extends PureComponent {

    showControl = (type) => {
        this.props.filterPicked(type)
    }

    render() {
        const {filterData} = this.props;
        return(
            <View style={styles.filterSection}>
                    <TouchableOpacity style={styles.filterItem} onPress={() => this.showControl('gender')}>
                        <Text style={styles.filterItemLabel}>
                            Gender
                        </Text>
                        <Text style={styles.filterItemValue}>
                            {filterData.selected}
                        </Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    filterSection: {
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
    filterData: filters.gender
})

export default connect(mapStateToProps, {filterPicked})(GenderFilter);