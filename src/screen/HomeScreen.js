import React, { Component } from 'react'
import {
    Image,
    Text,
    Button,
    Dimensions,
    StatusBar,
    View
} from 'react-native'


import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Ionicons'



import Homeview from './HomeView'
import SystemView from './SystemView'
import ProjeceView from './ProjectView'
import LikeView from './LikeView'
import HeaderBar from './HeaderBar'

const windowWidth = Dimensions.get('window').width;

class HomeScreen extends Component {



    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            title: '首页'
        }

    }

    static navigationOptions = ({ navigation }) => {

    
        return {
            header: null
        }

    }


    render() {

        return (
            <View style={{flex: 1,}} >
                <HeaderBar navigation={this.props.navigation} rightIcon='md-search' rightAction={()=>this.props.navigation.navigate('search')} title={this.state.title} leftIcon='md-menu' isGoBank={false} screenName='DrawerToggle' />
                <TabNavigator  >
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Icon name='md-list' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-list' size={25} color='#e91e63' />}
                        onPress={() => {
                            this.setState({ selectedTab: 'home',title: '首页'  })
                          
                        }}>
                        <Homeview navigation={this.props.navigation} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'system'}
                        renderIcon={() => <Icon name='md-book' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-book' size={25} color='#e91e63' />}
                        onPress={() => {
                            this.setState({ selectedTab: 'system',title: '体系' })
                        }}>
                        <SystemView navigation={this.props.navigation} />
                    </TabNavigator.Item>


                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'project'}
                        renderIcon={() => <Icon name='md-flame' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-flame' size={25} color='#e91e63' />}
                        onPress={() => {
                            this.setState({ selectedTab: 'project',title: '项目'  })
                        
                        }}>
                        <ProjeceView navigation={this.props.navigation}/>
                    </TabNavigator.Item>


                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'like'}
                        renderIcon={() => <Icon name='md-bookmarks' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-bookmarks' size={25} color='#e91e63' />}
                        onPress={() => {
                            this.setState({ selectedTab: 'like',title: '收藏' })
                        }}>
                        <LikeView navigation={this.props.navigation}/>
                    </TabNavigator.Item>

                </TabNavigator>
            </View>


        )


    }

}

export default HomeScreen;