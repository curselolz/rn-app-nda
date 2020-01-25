import React, { Component } from 'react'
import { Input } from './index'
import { searchByName } from '../../actions/catalog.actions'
import { connect } from 'react-redux';
import { navigate } from '../../utils/navigation.util'
import { colors, icons, width } from '../../theme/consts.theme'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Spinner from './spinner.container';

class SearchRibbon extends Component {
    state = {
        searchValue: null
    }
    handleSearch = (value) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { searchByName, category, catalogSearch } = this.props,
                    coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }

                searchByName(this.state.searchValue, category, catalogSearch, coords);
            },
            error => console.log(error),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    }
    render() {
        const { category, searchSpinnerVisible, catalogSearch, refreshing } = this.props;
        return (
            <View style={styles.ribbonWrapper}>
                <View style={styles.searchWrapper}>
                    {searchSpinnerVisible
                        ? <Spinner search />
                        : <TouchableOpacity>
                            {icons.search}
                        </TouchableOpacity>
                    }
                    {!refreshing ? <Input
                        callbackChange={searchValue => this.setState({ searchValue })}
                        inputStyle={styles.searchInput}
                        searchFunc={() => this.handleSearch()}
                        type='search'
                    /> :<View style={{height: 45}}></View>}
                </View>
                <View style={styles.filterWrapper}>
                    <TouchableOpacity
                        onPress={() => navigate('Filter', { category: category })}
                        style={styles.filterButton}>
                        {icons.filter}
                        <Text>
                            FILTER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ribbonWrapper: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
    },
    searchWrapper: {
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        borderRightWidth: 1,
        borderRightColor: colors.grey
    },
    searchInput: {
        color: colors.black,
        borderBottomWidth: 0,
        width: width['100']*0.65
    },
    filterWrapper: {
        flex: 0.2,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
    }

})

const mapStateToProps = state => {
    return {
        searchSpinnerVisible: state.layout.searchSpinnerVisible,
        refreshing: state.layout.refreshing,
    }
}

export default connect(mapStateToProps, { searchByName })(SearchRibbon);