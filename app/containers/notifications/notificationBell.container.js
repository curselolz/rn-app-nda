import React, {PureComponent} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {navigate} from "../../utils/navigation.util";
import {colors, icons} from "../../theme/consts.theme";

class NotificationBell extends PureComponent {

    handlePress = () => {
        navigate('Notifications')
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.handlePress}
                style={styles.container}
            >
                <Image style={styles.icon}
                       source={require('../../theme/images/Bell.png')}
                />
                {this.props.count && this.props.count > 0 &&
                <View
                    style={styles.orangeIndicator}
                />
                }

            </TouchableOpacity>
        )
    }
}

const styles = {
    container: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    orangeIndicator: {
        width: 14,
        height: 14,
        backgroundColor: colors.orange,
        borderRadius: 7,
        position: 'absolute',
        top: 0,
        right: 0,
        shadowColor: '#010101',
        shadowRadius: 3,
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: .4
    }
};

export default NotificationBell;