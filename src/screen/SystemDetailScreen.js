import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native'

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view'
import Toast, { DURATION } from 'react-native-easy-toast'
import { connect } from 'react-redux'

import SystemDItemView from './SystemDItemView'
import HeaderBar from './HeaderBar'
import GlobalStyles from '../../res/styles/GlobalStyles'


class SystemDetailScreen extends Component {


  _message = (message) => {
    this.refs.toast.show(message, DURATION.LENGTH_SHORT);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress',()=>{
      this.props.navigation.goBack()
      return true
    })
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar  backgroundColor={this.props.themeColor} navigation={this.props.navigation} title={this.props.navigation.state.params.name} />
        <ScrollableTabView
          tabBarBackgroundColor={this.props.themeColor}
          tabBarUnderlineStyle={{ backgroundColor: 'white' }}
          tabBarActiveTextColor='#fff'
          renderTabBar={() => <ScrollableTabBar />}
          tabBarInactiveTextColor='#fce4ec'>
          {this.props.navigation.state.params.children.map((item, index) => <SystemDItemView  message={this._message} navigation={this.props.navigation} tabLabel={item.name} key={index} item={item} />)}
        </ScrollableTabView>
        <View style={GlobalStyles.toast}>
          <Toast ref="toast" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
        </View>
      </View>

    )
  }
}


const mapStateToProps = (state) =>  ({
  themeColor:state.theme.color
})
export default connect(mapStateToProps)(SystemDetailScreen)


