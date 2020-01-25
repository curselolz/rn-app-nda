import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { View, ScrollView, RefreshControl, Platform, Linking, FlatList } from 'react-native';
import { navigate, stackNavOptions } from '../../utils/navigation.util';
import Collections from '../../components/home/collections.component'
import { SearchRibbon, ItemsList, NoDataInRadius, ListItem } from '../layout'
import ShopBag from '../layout/shopBag.container'
import { getHomeData } from '../../actions/home.actions'
import { getProfileData } from '../../actions/auth.actions';
import { colors, height } from '../../theme/consts.theme';
import LoaderComponent from '../loader/loader.container';
import { withNavigation } from 'react-navigation';

class HomeWithFlatList extends PureComponent {
    static navigationOptions = {
        title: 'Home',
        headerRight: <ShopBag />,
        headerLeft: <View />
    };

    componentWillMount() {
        this.getData(null, true);
        this.props.getProfileData();
    }

    getData = (refreshing, firstLoad) => {
        console.log('Get more data fired');
        const { search, coords } = this.props.data;
        if (search && !refreshing) {

        } else {
            if (coords) {
                this.props.getHomeData(coords, refreshing, firstLoad)
            }else{
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const coordsNew = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        this.props.getHomeData(coordsNew, refreshing, firstLoad)
                    },
                    error => console.log(error),
                    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
                );
            }
        }
    };

    render() {
        const { data, coords, refreshing, getMoreHomeData } = this.props,
            { unique_products, other_products } = data,
            noData = ((unique_products
                && unique_products.length === 0)
                && (other_products && other_products.length)) === 0;
        return (
            <View>
                <SearchRibbon />
                {other_products === null && <LoaderComponent />}
                {noData && <NoDataInRadius />}
                {data !== null &&
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                tintColor={colors.red}
                                refreshing={refreshing}
                                onRefresh={() => this.getData(true)}
                            />
                        }
                        ListHeaderComponent={() => <Collections data={unique_products} />}
                        data={other_products}
                        extraData={other_products}
                        style={{ marginBottom: 60 }}
                        keyExtractor={(item, index) => `${item}${index}`}
                        renderItem={({ item }) => <ListItem {...item} home={'Home'} />}
                        numColumns={2}
                        getItemLayout={(data, index) => (
                            { length: 180, offset: 200 * index, index }
                        )}
                        onEndReached={() => this.getData(false)}
                        onEndReachedThreshold={0.7}
                    />
                }
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.home,
        refreshing: state.layout.refreshing,
        returnToCheckout: state.auth.returnToCheckout,
        token: state.auth.token,
        coords: state.home.coords
    }
}


export default connect(mapStateToProps, { getHomeData, getProfileData })(withNavigation(HomeWithFlatList));
