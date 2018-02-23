import React, { Component } from 'react'
import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    View
 } from 'react-native'

const winheight = Dimensions.get('window').height

export default class UserDrawer extends Component{


    render(){
        return (
            <View style={styles.contentWarpper}>

                <View style={styles.header}>


                </View>

                <Button title='登录' onPress={()=> this.props.navigation.navigate('login')} />

                    <Button title='主题' onPress={()=> this.props.navigation.navigate('theme')} />
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
