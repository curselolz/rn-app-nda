import { connect } from 'react-redux'
import React, { Component } from 'react'
import { View} from 'react-native'
import CatalogList from './catalogList.component'
import ShopBag from '../../containers/layout/shopBag.container'
import ArrowBack from '../../containers/layout/arrowBack.container'
import { getSubCatalogData } from '../../actions/catalog.actions'
import { flex } from '../../theme/consts.theme';

class SubCatalogScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.name,
        headerLeft: <ArrowBack prevPath={navigation.state.params.prevPath} />,
        headerRight: <ShopBag />
    })
    componentWillMount() {
        
        let { path } = this.props.navigation.state.params

        this.props.getSubCatalogData(path)
    }
    render() {
        let { path } = this.props.navigation.state.params
        const {getSubCatalogData, refreshing} =this.props;

        return (
            <View style={{...flex.full}}>
                <CatalogList 
                path={path} 
                data={this.props.data}
                getCatalogData={getSubCatalogData}
                refreshing={refreshing}
                moreData={path}
                />
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        data: state.catalog.subCatalog,
        refreshing: state.layout.refreshing
    }
}

export default connect(mapStateToProps, { getSubCatalogData })(SubCatalogScreen)