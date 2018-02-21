import { StackNavigator, DrawerNavigator } from 'react-navigation';


import WelcomeScreen from '../screen/WelcomeScreen'
import HomeScreen from '../screen/HomeScreen'
import LoginScreen from '../screen/LoginScreen'
import UserDrawer from '../screen/UserDrawer'
import SystemDetailScreen from '../screen/SystemDetailScreen'
import SystemView from '../screen/SystemView'
import ArticleDetailSceen from '../screen/ArticleDetailSceen'
import SearchScreen from '../screen/SearchScreen'
import SearchResultScreen from '../screen/SearchResultScreen'


const NavHome = StackNavigator({
    welcome: {
        screen: WelcomeScreen,
        navigationOptions:{
            header:null
        }
       
    },
    home: {
        screen: HomeScreen,
        navigationOptions:{
            header:null
        }
    },
    login: {
        screen: LoginScreen,
        navigationOptions:{
            header:null
        }
    },
    system_datail: {
        screen: SystemDetailScreen,
        navigationOptions:{
            header:null
        }
    },
    article_detail:{
        screen:ArticleDetailSceen,
        navigationOptions:{
            header:null
        }
    },
    search:{
        screen:SearchScreen,
        navigationOptions:{
            header:null
        }
    },
    search_result:{
        screen:SearchResultScreen,
        navigationOptions:{
            header:null
        }
    }
}
)


const RootNavigator = DrawerNavigator({

    home: {
        screen: NavHome,
    }

}, {
        drawerWidth: 260,
        drawerPosition: 'left',
        contentComponent: UserDrawer
    })





export default RootNavigator;
