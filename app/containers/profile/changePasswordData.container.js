import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Input from "../layout/input.container";
import { connect } from 'react-redux';
import { changePassword, paswordChangeTriger } from '../../actions/auth.actions';
import { Button } from '../layout';
import { colors, weight, flex } from "../../theme/consts.theme";
import { goBack } from '../../utils/navigation.util';

class ChangePasswordData extends PureComponent {
    state = {
        formValid: false,
        old_password: '',
        new_password: '',
        confirm: '',
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.changed !== this.props.changed) {
            goBack()
            this.props.paswordChangeTriger()
        }
    }

    handleItem = (type, value) => {
        this.setState({
            ...this.state,
            [type]: value

        }, () => this.validation())
    };

    confirmButtonPressed = () => {
        const { new_password, old_password } = this.state;
        let data = {
            new_password,
            old_password
        };
        if (new_password.length < 8) {
            return alert('New password must be at least 8 characters.')
        }
        this.props.changePassword(data)
    };

    validation = (values) => {
        const { confirm, new_password, old_password } = this.state;
        let validator = confirm && confirm === new_password && new_password !== old_password;
        this.setState({formValid: validator});
    };

    render() {
        const cardDetails = ['old_password', 'new_password', 'confirm'];
        return (
            <View>
                <View style={styles.formWraper}>
                    <View style={styles.deliverySection} />

                    <View style={styles.deliverySection}>
                        <View style={styles.sectionItemsWrapper}>
                            {cardDetails.map((item, index) =>
                                <View key={index} style={[styles.sectionItem,
                                index + 1 === cardDetails.length && styles.sectionUnBordered]}>
                                    <Input
                                        checkout
                                        callbackChange={(value) => this.handleItem(item, value)}
                                        type={item}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button
                        disabled={!this.state.formValid}
                        upperCase
                        label='Confirm'
                        action={this.confirmButtonPressed}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formWraper: {
        marginBottom: 20
    },
    deliverySection: {
        marginVertical: 20
    },
    sectionHeader: {
        fontWeight: weight.semibold,
        margin: 15
    },
    sectionItem: {
        ...flex.remote,
        ...flex.horizontal,
        marginHorizontal: 15,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1
    },
    itemLabel: {
        color: colors.grey,
        fontWeight: weight.semibold
    },
    sectionUnBordered: {
        borderBottomWidth: 0
    },
    sectionItemsWrapper: {
        borderTopWidth: 1,
        borderTopColor: colors.grey,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        backgroundColor: colors.white
    }
});

const mapStateToProps = ({ auth }) => ({
    changed: auth.passwordChanged
});

export default connect(mapStateToProps, { changePassword, paswordChangeTriger })(ChangePasswordData);