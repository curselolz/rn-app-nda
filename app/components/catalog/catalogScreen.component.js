import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import ShopBag from '../../containers/layout/shopBag.container'
import CatalogNav from '../../containers/catalog/catalogNav.container'
import CatalogList from './catalogList.component'
import { getCatalogData } from '../../actions/catalog.actions'
import { colors } from '../../theme/consts.theme';

class CatalogScreen extends PureComponent {
    static navigationOptions = {
        headerLeft: <View />,
        headerRight: <ShopBag />,
        title: 'Catalog'
    }

    componentWillMount() {
        const { getCatalogData, gender } = this.props;
        getCatalogData(gender);
    }
       
    render() {
        const { getCatalogData, gender, data, refreshing, catalogGender } = this.props;
        return (
            <View style={{ paddingBottom: 100 }}>
                <CatalogNav action={getCatalogData} gender={gender} />
                <CatalogList
                    path='main' data={data}
                    refreshing={refreshing}
                    getCatalogData={getCatalogData}
                    moreData={catalogGender}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.catalog.main,
        gender: state.auth.gender,
        catalogGender: state.catalog.catalogGender,
        refreshing: state.layout.refreshing
    }
}

export default connect(mapStateToProps, { getCatalogData })(CatalogScreen)