import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native'
import { getFilterDetails } from '../../actions/catalog.actions'
import { colors } from '../../theme/consts.theme';

class ClearButton extends Component {
    render() {
        const {category} = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.props.getFilterDetails(category || null)}
            >
                <Text style={styles.title}>Clear</Text>

            </TouchableOpacity>
        );
    }
}

const styles = {
    title: {
        color: colors.white,
        marginRight: 20
    }
}

export default connect(
   null, {getFilterDetails}
)(ClearButton);