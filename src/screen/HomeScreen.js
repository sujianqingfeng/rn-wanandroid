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


const windowWidth = Dimensions.get('window').width;

class HomeScreen extends Component {



    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
        this.props.navigation.setParams({ title: '首页' })
    }

    static navigationOptions = ({ navigation }) => {

        const params = navigation.state.params || {}


        return {
            title: params.title,
            headerRitht: (<Button onPress={() => navigation.navigate('DrawerToggle')} title='fff' />),
            headerLeft: (
                <Icon.Button
                    style={{ marginHorizontal: 8 }}
                    onPress={() => navigation.navigate('DrawerToggle')}
                    name='md-menu'
                    size={40}
                    color='white'
                    backgroundColor='#00000000'>

                </Icon.Button>
            ),
            headerStyle: {
                backgroundColor: '#e91e63'
            },

            headerTitleStyle: {
                marginRight: 72,
                color: 'white',
                alignSelf: 'center',
            }
        }

    }


    render() {

        return (
             
                <TabNavigator >
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Icon name='md-list' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-list' size={25} color='#e91e63' />}
                        onPress={() => {
                            this.setState({ selectedTab: 'home' })
                            this.props.navigation.setParams({ title: '首页' })
                        }}>
                        <Homeview />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'system'}
                        renderIcon={() => <Icon name='md-book' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-book' size={25} color='#e91e63' />}
                        onPress={() => {
                            this.setState({ selectedTab: 'system' })
                            this.props.navigation.setParams({ title: '体系' })
                        }}>
                        <SystemView navigation={this.props.navigation}/>
                    </TabNavigator.Item>


                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'project'}
                        renderIcon={() => <Icon name='md-flame' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-flame' size={25} color='#e91e63' />}
                        onPress={() => {
                            this.setState({ selectedTab: 'project' })
                            this.props.navigation.setParams({ title: '项目' })
                        }}>
                        <ProjeceView/>
                    </TabNavigator.Item>


                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'like'}
                        renderIcon={() => <Icon name='md-bookmarks' size={25} color='gray' />}
                        renderSelectedIcon={() => <Icon name='md-bookmarks' size={25} color='#e91e63' />}
                        onPress={() => {
                            this.setState({ selectedTab: 'like' })
                            this.props.navigation.setParams({ title: '收藏' })
                        }}>
                        <Text>like</Text>
                    </TabNavigator.Item>

                </TabNavigator>
           
        )


    }

}

export default HomeScreen;