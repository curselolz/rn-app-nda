import {
    NavigationActions,
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import CatalogScreen from '../components/catalog/catalogScreen.component'
import OrdersScreen from '../components/orders/ordersScreen.component'
import ProfileScreen from '../components/profile/profileScreen.component'
import { icons, colors, weight, width } from '../theme/consts.theme'
import SubCatalogScreen from '../components/catalog/subCatalogScreen.component';
import CatalogProductsScreen from '../components/catalog/catalogProductsScreen.component';
import CreditCardsScreen from '../components/creditCards/creditCardsScreen.component';
import ItemDetailsScreen from '../containers/details/itemDetailsScreen.container';
import ShopScreen from '../components/shop/shopScreen.component';
import CartScreen from '../components/cart/cartScreen.component';
import CheckOutScreen from '../containers/checkOut/checkOutScreen.container';
import OrderDetailsScreen from '../components/orders/orderDetailsScreen.component';
import AddressesScreen from "../components/addresses/addressesScreen.component";
import ChangePasswordScreen from "../components/profile/changePaswordScreen.component";
import FlatListHome from '../containers/home/flatListHomeScreen.container';

let navigator;

const setTopLevelNavigator = function (nav) {
    navigator = nav
};

const navigate = (routeName, params) =>  {
   navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params
    })
   )
};

const goBack = () => {
  navigator.dispatch(NavigationActions.back({}))
};

const HomeStack = createStackNavigator({
    Home: {
    screen: FlatListHome,
    },
    ItemDetails: {
        screen: ItemDetailsScreen
    },
    ShopDetails: {
        screen: ShopScreen
    },

},
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.red
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: colors.white,
                fontWeight: weight.default
            },
        }
    });

const CatalogStack = createStackNavigator({
    Catalog: {
        screen: CatalogScreen,
        navigationOptions: {
        navigationBarHidden: true
        }
    },
    SubCatalog: {
        screen: SubCatalogScreen
    },
    CatalogProducts: {
        screen: CatalogProductsScreen
    },
    ItemDetails: {
        screen: ItemDetailsScreen
    },
    ShopDetails: {
        screen: ShopScreen
    },

},
    {
        initialRouteName: 'Catalog',
        navigationOptions: {
            headerStyle: {
                backgroundColor: colors.red
            },
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                color: colors.white,
                fontWeight: weight.default
            },
        }
    });

const OrderStack = createStackNavigator({
    Order: {
        screen: OrdersScreen
    },
    OrderDetails: {
        screen: OrderDetailsScreen
    },
}, {
    initialRouteName: 'Order',
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.red
        },
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            color: colors.white,
            fontWeight: weight.default
        },
    }
});

const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
    },
    Addresses: {
        screen: AddressesScreen
    },
    CreditCards: {
        screen: CreditCardsScreen
    },
    ChangePassword: {
        screen: ChangePasswordScreen
    }
}, {
    initialRouteName: 'Profile',
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.red
        },
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            color: colors.white,
            fontWeight: weight.default
        },
    }
});

const tabNavigator = createBottomTabNavigator({
    HomeTab: {
    //   screen: HomeScreen,
    screen: HomeStack,
      navigationOptions: {
        header: null,
        title: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: params => {
          return params.focused
            ? icons.homeTabFocused
            : icons.homeTab
        }
      }
    },
    CatalogTab: {
      screen: CatalogStack,
      navigationOptions: {
        header: null,
        title: 'Catalog',
        tabBarLabel: 'Catalog',
        tabBarIcon: params => {
          return params.focused
            ? icons.catalogTabFocused
            : icons.catalogTab
        }
      }
    },
    OrdersTab: {
      screen: OrderStack,
      navigationOptions: {
        header: null,
        title: 'My Orders',
        tabBarLabel: 'My Orders',
        tabBarIcon: params => {
          return params.focused
            ? icons.ordersTabFocused
            : icons.ordersTab
        }
      }
    },
    ProfileTab: {
      screen: ProfileStack,
      navigationOptions: {
        header: null,
        title: 'My Profile',
        tabBarLabel: 'My Profile',
        tabBarIcon: params => {
          return params.focused
            ? icons.profileTabFocused
            : icons.profileTab
        }
      }
    }
  }, {
    tabBarOptions: {
      activeTintColor: colors.darkBlue,
    }
  });

export {
  navigate,
  goBack,
  setTopLevelNavigator,
  tabNavigator
};
