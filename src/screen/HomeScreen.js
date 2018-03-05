import * as userActions from "../actions/userActions"
import HeaderBar from './HeaderBar'
import Homeview from './HomeView'
import LikeView from './LikeView'
import ProjeceView from './ProjectView'
import SystemView from './SystemView'
import React, { Component } from 'react'
import {
    Button,
    Dimensions,
    Image,
    StatusBar,
    Text,
    View
} from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from "react-redux";

const windowWidth = Dimensions.get('window').width;

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            title: '首页'
        }
    }

    componentWillMount(){
        this.props.getIsLogin()
    }


    _message = (message)=>{
       this.refs.toast.show(message, DURATION.LENGTH_SHORT);
    }

    render() {

        const {navigation,isLogin,backgroundColor} = this.props
        return (
            <View style={{flex: 1,}} >
                <HeaderBar backgroundColor={backgroundColor} navigation={navigation} rightIcon='md-search' rightAction={()=>navigation.navigate('search')} title={this.state.title} leftIcon='md-menu' isGoBank={false} screenName='DrawerToggle' />
                <TabNavigator  >
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Icon name='md-list' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-list' size={25} color={backgroundColor} />}
                        onPress={() => this.setState({ selectedTab: 'home',title: '首页'  })}>
                        <Homeview  backgroundColor={backgroundColor}  navigation={navigation} isLogin={isLogin} message={this._message} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'system'}
                        renderIcon={() => <Icon name='md-book' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-book' size={25} color={backgroundColor} />}
                        onPress={() => this.setState({ selectedTab: 'system',title: '体系' })}>
                        <SystemView  backgroundColor={backgroundColor}  navigation={navigation} />
                    </TabNavigator.Item>


                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'project'}
                        renderIcon={() => <Icon name='md-flame' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-flame' size={25} color={backgroundColor} />}
                        onPress={() => this.setState({ selectedTab: 'project',title: '项目'  })}>
                        <ProjeceView navigation={navigation} isLogin={isLogin}/>
                    </TabNavigator.Item>


                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'like'}
                        renderIcon={() => <Icon name='md-bookmarks' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-bookmarks' size={25} color={backgroundColor} />}
                        onPress={() => this.setState({ selectedTab: 'like',title: '收藏' })}>
                        <LikeView  backgroundColor={backgroundColor}  navigation={navigation} isLogin={isLogin} />
                    </TabNavigator.Item>

                </TabNavigator>

                <View style={{
                  width:windowWidth,
                  position: "absolute",
                  left: 0,
                  top:0}}>
                  <Toast ref="toast" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
                </View>
            </View>


        )


    }

}

const mapState = state => ({
  isLogin: state.user.isLogin,
  backgroundColor:state.theme.color
});

const dispatchAction = dispatch => ({
  getIsLogin: () => dispatch(userActions.isLogin())
});

export default connect(mapState, dispatchAction)(HomeScreen);
