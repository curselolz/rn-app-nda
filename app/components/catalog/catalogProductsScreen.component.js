import { connect } from 'react-redux'
import {getCategoryProducts} from '../../actions/catalog.actions';
import React, { PureComponent } from 'react'
import { ScrollView } from 'react-native'
import ShopBag from '../../containers/layout/shopBag.container'
import ArrowBack from '../../containers/layout/arrowBack.container'
import { ItemsList, SearchRibbon, NoData } from '../../containers/layout'
import LoaderComponent from '../../containers/loader/loader.container';

class CatalogProductsScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
        headerLeft: <ArrowBack prevPath={navigation.state.params.prevPath} />,
        headerRight: <ShopBag />
    })

    componentWillMount() {
        console.log('Products screen load!')
        const {id} = this.props.navigation.state.params
        this.props.getCategoryProducts(id)
    }
    render() {
        const { id } = this.props.navigation.state.params,
            { data } = this.props;

        return (
            <ScrollView>
                <SearchRibbon catalogSearch category={id} />
                {data === null && <LoaderComponent />}
                {data !== null && data.length === 0 && <NoData />}
                {data !== null && data.length > 0 &&
                    <ItemsList data={data} />
                }
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.catalog.products
    }
}

export default connect(mapStateToProps, {getCategoryProducts})(CatalogProductsScreen)