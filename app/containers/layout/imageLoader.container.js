import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Circle';
import { colors, icons } from '../../theme/consts.theme';



class ImageLoader extends Component {
    render() {
        const { uri } = this.props.source
        if (!uri) {
            return <View
                style={[this.props.style]}
            />
        }
        return (
            <Image
                source={uri ? { uri } : icons.logo}
                indicator={Progress}
                style={[this.props.style]}
                indicatorProps={{
                    size: 60,
                    borderWidth: 3,
                    color: colors.red,
                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                }}
            />
        );
    }
}

const mapStateToProps = (state) => ({

})

export default connect(
    mapStateToProps,
)(ImageLoader);