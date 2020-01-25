import React, {Component} from 'react';
import { KeyboardAvoidingView} from 'react-native';
import ArrowBack from '../../containers/layout/arrowBack.container';
import CreditCardAdding from "../../containers/creditCards/creditCardsAdding.container";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {flex} from "../../theme/consts.theme";

class CreditCardsScreen extends Component {
    static navigationOptions = {
        title: 'My Cards',
        headerLeft: <ArrowBack/>,
    };

    render() {
        return (
            <KeyboardAvoidingView style={flex.full}>
                <KeyboardAwareScrollView>
                    <CreditCardAdding/>
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
        )
    }
}

export default CreditCardsScreen;