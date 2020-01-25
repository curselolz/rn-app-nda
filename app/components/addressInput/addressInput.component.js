import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Input from "../../containers/layout/input.container";
import Geocoder from 'react-native-geocoder';

class AddressInput extends Component {
    state = {
        mapBoxClient: null,
        results: [],
        edit: true,
        selectedAddress: {}
    };

    componentWillMount() {
        const {selected} = this.props;
        if (selected.address) {
            this.setState({edit: false, selectedAddress: selected})
        }
    }

    handleItem = (value) => {
        if (value !== '' && value.length > 5) {
            Geocoder.geocodeAddress(value).then(res => {
                console.log('res from geocoder :' , res)
                this.setState({results: res})
            })
        }
    };

    handlePress = (index) => {
        if (this.state.results[0].postalCode){
            this.setState({edit: false, selectedAddress: this.state.results[index]}, ()=> {
                this.props.callback(this.state.selectedAddress)
            })
        }else{
            alert('Invalid address, please enter a valid address.')
        }

    };

    render() {
        const {results, edit, selectedAddress} = this.state;
        let color = '#ff9ebd';

        if (this.state.results[0]
            && this.state.results[0].postalCode
            && this.state.results[0].adminArea
            && this.state.results[0].streetName
        ) {
            color = '#a2ffbd'
        }

        const autoCompleteColor = {
            backgroundColor: color
        };


        return (
            <View>
                {
                    edit
                        ? <View>
                            <Input
                                checkout
                                callbackChange={(value) => this.handleItem(value)}
                                type='address'
                            />
                            {results.map((item, index) =>
                                    <TouchableOpacity
                                        key={item.formattedAddress}
                                        style={[styles.variants, autoCompleteColor]}
                                        onPress={() => this.handlePress(index)}
                                    >
                                        <Text>
                                            {item.formattedAddress}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                        </View>
                        :
                        <TouchableOpacity
                            onPress={() => this.setState({edit: true, results: [], selectedAddress: {}})}
                            style={styles.textView}
                        >
                            <Text>
                                {(selectedAddress && selectedAddress.formattedAddress) || (selectedAddress &&  selectedAddress.address)}
                            </Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = {
    variants: {
        padding: 20,
        height: 60,
        justifyContent: 'center'

    },
    textView: {
        padding: 20,
        height: 60,
        justifyContent: 'center',
    }
};

export default AddressInput;