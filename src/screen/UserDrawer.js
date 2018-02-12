import React, { Component } from 'react'

import { 
    Text,
    StyleSheet,
    View,
    Dimensions,
    Button
 } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const winheight = Dimensions.get('window').height

export default class UserDrawer extends Component{


    render(){
        return (
            <View style={styles.contentWarpper}>    

                <View style={styles.header}>
                

                </View>

                <Button title='登录' onPress={()=> this.props.navigation.navigate('login')} />
            </View>
        )
    }

}


const styles = StyleSheet.create({


    contentWarpper:{
        flex: 1,
    },
    header:{
        height:winheight*0.3,
        backgroundColor: 'rgba(52,52,52,0.7)',
    }


})

