import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Animated, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Button } from '../../containers/layout/index'
import ArrowBack from '../../containers/layout/arrowBack.container'
import { flex } from '../../theme/consts.theme'
import FilterControl from './filterControl.container'
import { filterCatalogData, getFilterDetails } from '../../actions/catalog.actions'
import { closePicker, changeFilterValue } from '../../actions/filter.actions';
import GenderFilter from '../../components/filters/genderFilter.component';
import PriceFilter from '../../components/filters/priceFilter.component';
import DistanceFilter from '../../components/filters/distanceFilter.component';
import Sorting from '../../components/filters/distanceSorting.component';
import FeaturesFilter from '../../components/filters/featureFilter.component';
import get from 'lodash.get';
import ClearButton from '../layout/clearButton.container';

class FilterScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Filter',
        headerLeft: <ArrowBack />,
        headerRight: <ClearButton category={navigation.state.params.category}/>
    });

    state = {
        offSet: new Animated.Value(Dimensions.get('window').height)
    };

    componentWillMount() {
        const { category } = this.props.navigation.state.params
        const {price, loaded} = this.props.data;
        if (price.selected && price.selected[1] === 10000 || category&&!loaded) {
            this.props.getFilterDetails(category || null)
        }
        
    }

    handleChange = (value) => {
        this.props.changeFilterValue(value)
    };

    handleFilter = () => {
        const { navigation, filterCatalogData, data } = this.props,
                 { category } = this.props.navigation.state.params
        navigator.geolocation.getCurrentPosition(
            position => {
                    payLoad = {
                        price: data.price.selected,
                        coords: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        distance: [0, data.distance.selected],
                        path: category,
                        gender: category ? '' : data.gender.selected,
                        sorting: data.sorting.selected,
                    };
                    data.features.map(item => {
                    if(category) {
                        payLoad[item] = { id: data[item].selected, feature: data[item].feature}
                        payLoad['category'] = true
                    }
                })
                filterCatalogData(payLoad);
            },
            error => console.log(error),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    };

    closeFilter = () => {
        this.props.closePicker()
    }

    render() {
        const { category } = this.props.navigation.state.params,
            { visibleControl, selectedControl, data } = this.props;
        return (
            <View style={styles.filterWrapper}>
                {visibleControl
                    ? <FilterControl
                        filtersScreen
                        selected={selectedControl}
                        ref='filterControl'
                        closeModal={this.closeFilter}
                        onChange={this.handleChange}
                        data={get(data, selectedControl)}
                        offSet={this.state.offSet}
                    />
                    :
                    <React.Fragment>
                        <Text style={styles.titleText}>FILTER BY</Text>
                        <PriceFilter />
                        {!category && <GenderFilter />}
                        <DistanceFilter />
                        { category && <FeaturesFilter />}
                        <Text style={styles.titleText}>SORT BY</Text>
                        <Sorting />

                        <Button label='Apply' action={this.handleFilter} upperCase filter />
                    </React.Fragment>

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    filterWrapper: {
        ...flex.full,
        backgroundColor: 'rgb(240,240,240)'
    },
    titleText: {
        padding: 15,
        fontWeight: 'bold',
    }
});

const mapStateToProps = ({ filters }) => {
    return {
        selectedControl: filters.type,
        visibleControl: filters.pickerVisible,
        data: filters
    }
};

export default connect(mapStateToProps, {
    filterCatalogData,
    getFilterDetails,
    closePicker,
    changeFilterValue
})(FilterScreen);