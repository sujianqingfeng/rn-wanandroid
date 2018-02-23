import ArticleDetailSceen from '../screen/ArticleDetailSceen'
import HomeScreen from '../screen/HomeScreen'
import SearchResultScreen from '../screen/SearchResultScreen'
import SearchScreen from '../screen/SearchScreen'
import SystemDetailScreen from '../screen/SystemDetailScreen'
import ThemeScreen from '../screen/ThemeScreen'
import UserDrawer from '../screen/UserDrawer'
import LoginScreen from '../screen/UserScreen'
import WelcomeScreen from '../screen/WelcomeScreen'
import { DrawerNavigator, StackNavigator } from 'react-navigation';

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
    },
    theme:{
        screen:ThemeScreen,
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
