import React, {Component} from 'react';
import { KeyboardAvoidingView} from 'react-native';
import ArrowBack from '../../containers/layout/arrowBack.container';
import AddressAdding from "../../containers/addresses/addressAdding.container";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {flex} from "../../theme/consts.theme";

class AddressesScreen extends Component {
    static navigationOptions = {
        title: 'My Addresses',
        headerLeft: <ArrowBack />,
    };

    render() {
        return (
            <KeyboardAvoidingView style={flex.full}>
                <KeyboardAwareScrollView
                
                >
                    <AddressAdding/>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
        )
    }
}

export default AddressesScreen;