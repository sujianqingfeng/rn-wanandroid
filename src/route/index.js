import ArticleDetailSceen from '../screen/ArticleDetailSceen'
import HomeScreen from '../screen/HomeScreen'
import SearchResultScreen from '../screen/SearchResultScreen'
import SearchScreen from '../screen/SearchScreen'
import SystemDetailScreen from '../screen/SystemDetailScreen'
import ThemeScreen from '../screen/ThemeScreen'
import UserDrawer from '../screen/UserDrawer'
import LoginScreen from '../screen/UserScreen'
import WelcomeScreen from '../screen/WelcomeScreen'
import AboutScreen from '../screen/AboutScreen'
import { DrawerNavigator, StackNavigator } from 'react-navigation';



const homeDrawer = DrawerNavigator(
    {
        home: {
            screen: HomeScreen,
        }
       
    },
    {
        drawerWidth: 260,
        drawerPosition: 'left',
        contentComponent: UserDrawer,
        contentOptions:{
            initialRouteName:'home'
        }
    }
)


const NavHome = StackNavigator({
    welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null
        }

    },
    home: {
        screen: homeDrawer,
        navigationOptions: {
            header: null
        }
    },
    login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    system_datail: {
        screen: SystemDetailScreen,
        navigationOptions: {
            header: null
        }
    },
    article_detail: {
        screen: ArticleDetailSceen,
        navigationOptions: {
            header: null
        }
    },
    search: {
        screen: SearchScreen,
        navigationOptions: {
            header: null
        }
    },
    search_result: {
        screen: SearchResultScreen,
        navigationOptions: {
            header: null
        }
    },
    theme: {
        screen: ThemeScreen,
        navigationOptions: {
            header: null
        }
    },
    about: {
        screen: AboutScreen,
        navigationOptions: {
            header: null
        }
    }
},{
    initialRouteName: 'welcome',
    navigationOptions: ({navigation, screenProps}) => ({
        gesturesEnabled: true,
    }),
}
)


export default NavHome
