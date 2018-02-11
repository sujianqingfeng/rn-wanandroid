import { 
    View,
    Text
 } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SystemDItemView extends Component {


  render() {
    return (
        <View></View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemDItemView)

