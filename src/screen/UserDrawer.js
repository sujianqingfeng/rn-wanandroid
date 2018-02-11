import React, { Component } from 'react'

import { 
    Text,
    StyleSheet,
    View,
    Dimensions,
    Button
 } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export default class UserDrawer extends Component{


    render(){
        return (
            <View>            
                <Button title='登录' onPress={()=> this.props.navigation.navigate('login')} />
            </View>
        )
    }

}


