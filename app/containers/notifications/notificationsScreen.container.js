import React, {PureComponent} from 'react';
import {View, Text, ScrollView} from 'react-native';
import ArrowBack from '../layout/arrowBack.container';
import {connect} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {getNotifications, deleteNotification, resetNotificationsCount} from '../../actions/notification.actions';
import {colors, flex, icons, weight, width} from "../../theme/consts.theme";
import { timeToDisplay } from '../../utils/moment.util';

class NotificationsScreen extends PureComponent {
    static navigationOptions = {
        headerLeft: <ArrowBack/>,
        title: 'My Notifications'
    };

    componentWillMount() {
        this.props.getNotifications()
    }

    componentDidMount() {
        setTimeout(this.renewNotifications, 3000)
    }
    renewNotifications = () => {
        this.props.getNotifications();
        this.props.resetNotificationsCount()
    };

    render() {
        const {notifications} = this.props,
            swipeOutBtns = (id) =>
                [{
                    text: 'Delete',
                    backgroundColor: colors.red,
                    onPress: () => this.props.deleteNotification(id)
                }];
        return (
            <ScrollView>
                <View style={styles.profileDataWrapper}>
                    {notifications !== null && notifications.map((item, index) =>
                        <Swipeout
                            autoClose
                            backgroundColor='transparent'
                            right={swipeOutBtns(item.id)}
                            key={index.toString()}>
                            <View
                                key={index.toString()}
                                style={[styles.profileDataItem, index === notifications.length - 1 && styles.itemUnbordered]}>
                                <View style={styles.rowView}>
                                    {item.is_unread === true
                                        ? <View style={styles.orangeIndicator}/>
                                        : icons.checkedBlack}
                                    <Text style={styles.dataText}>{timeToDisplay(item.created_at)}</Text>
                                </View>

                                <Text style={styles.bodyText}>{item.text}</Text>
                            </View>
                        </Swipeout>
                    )}
                </View>
            </ScrollView>
        )
    }
}

const styles = {
    profileDataWrapper: {
        backgroundColor: colors.white,
        marginVertical: 20,
        width: width['100'],
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        borderTopWidth: 1,
        borderTopColor: colors.grey
    },
    profileDataItem: {
        paddingLeft: 15,
        paddingRight: 15,
        ...flex.horizontal,
        ...flex.remote,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        height: 50,
    },
    itemUnbordered: {
        borderBottomWidth: 0
    },
    itemLabel: {
        color: colors.grey,
        fontWeight: weight.semibold,
        fontSize: 15
    },
    dataText: {
        width: 100,
        color: colors.gray,
        marginLeft: 5
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3
    },
    bodyText: {
        // width: 150,
        flex: 5
    },
    orangeIndicator: {
        width: 14,
        height: 14,
        backgroundColor: colors.orange,
        borderRadius: 7,
        shadowColor: '#010101',
        shadowRadius: 3,
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: .4
    }
};

const mapStateToProps = ({notifs}) => ({
    notifications: notifs.notifications
});

export default connect(mapStateToProps, {getNotifications, deleteNotification, resetNotificationsCount})(NotificationsScreen);