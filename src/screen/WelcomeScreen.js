import React, { Component } from 'react'

import { 
    Text,
    StyleSheet,
    View,
    Dimensions
 } from 'react-native'

 const windowHeight = Dimensions.get('window').height;

class 　WelcomeScreen extends Component {


    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('home')
        }, 3000)

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        return (
        <View style={styles.textWarpper}> 
            <Text style={styles.text}>WAndroid</Text>
        </View>)
    }


}

const styles = StyleSheet.create({
    text:{
        textAlign:'center',
        fontSize:50
    },
    textWarpper:{
        height:windowHeight,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default WelcomeScreen;