import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native'

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view'

import SystemDItemView from './SystemDItemView'
import HeaderBar from './HeaderBar'


class SystemDetailScreen extends Component {

  static navigationOptions = {

    header: null,

}


  render() {
    return (
      <View style={{flex:1}}>
        <HeaderBar navigation={this.props.navigation} title={this.props.navigation.state.params.name}/>
        <ScrollableTabView
          tabBarBackgroundColor='#e91e63'
          tabBarUnderlineStyle={{ backgroundColor: 'white' }}
          tabBarActiveTextColor='#fff'
          renderTabBar={() => <ScrollableTabBar />}
          tabBarInactiveTextColor='#fce4ec'>
          {this.props.navigation.state.params.children.map((item, index) => <SystemDItemView navigation={this.props.navigation}  tabLabel={item.name} key={index} item={item} />)}
        </ScrollableTabView>
      </View>

    )
  }
}

export default SystemDetailScreen;
