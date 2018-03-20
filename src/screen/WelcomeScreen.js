import React, { Component } from 'react'

import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    StatusBar
} from 'react-native'

import { connect } from 'react-redux'


import * as themeActions from '../actions/themeActions'
import RealmUtil from '../utils/RealmUtil'

const windowHeight = Dimensions.get('window').height

class WelcomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            color: '#E91E63'
        }
    }
    componentWillMount(){
        const color = RealmUtil.getThemeColor()
        this.props.changeTheme(color)
        this.setState({ color })
    }

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
                <StatusBar translucent ={true}  />
                <Text style={[styles.text, { color: this.state.color }]}>WAndroid</Text>
            </View>)
    }


}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 50
    },
    textWarpper: {
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


const mapStateToProps = (state) =>  ({
   
})

const mapDispatchToProps = (dispatch) => ({
    changeTheme: color => dispatch(themeActions.changeTheme(color))
})

export default connect(mapStateToProps,mapDispatchToProps)(WelcomeScreen)

