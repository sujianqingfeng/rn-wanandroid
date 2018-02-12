import { StackNavigator, DrawerNavigator } from 'react-navigation';


import WelcomeScreen from '../screen/WelcomeScreen'
import HomeScreen from '../screen/HomeScreen'
import LoginScreen from '../screen/LoginScreen'
import UserDrawer from '../screen/UserDrawer'
import SystemDetailScreen from '../screen/SystemDetailScreen'
import SystemView from '../screen/SystemView'
import ArticleDetailSceen from '../screen/ArticleDetailSceen'


const NavHome = StackNavigator({
    welcome: {
        screen: WelcomeScreen,
        navigationOptions: ({ navigation }) => ({
            header: null,
        })
    },
    home: {
        screen: HomeScreen,
    },
    login: {
        screen: LoginScreen
    },
    system_datail: {
        screen: SystemDetailScreen
    },
    article_detail:{
        screen:ArticleDetailSceen
    }
}, {
        header: null,
        headerStyle: {
            backgroundColor: '#fff'
        },

        headerTitleStyle: {
            color: 'blue',
            alignSelf: 'center',
        }
    }
);


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
