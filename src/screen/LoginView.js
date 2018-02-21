import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { Hideo } from 'react-native-textinput-effects'
import Icon from 'react-native-vector-icons/Ionicons'


import * as userActions from '../actions/userActions'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class LoginView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: ''
        }
    }


    componentWillReceiveProps(props) {

        if (props.isSucc) {

        } else {
            // this.dropdown.alertWithType('error', 'Error', '1111');
        }

    }

    render() {
        return (
            <View style={styles.contentWarpper}>
               
                <View style={styles.inputWarpper}>

                    <Hideo
                        iconClass={Icon}
                        iconName={'md-person'}
                        iconColor={'white'}
                        value={this.state.user}
                        onChangeText={(user) => this.setState({ user })}
                        iconBackgroundColor={'#e91e63'}
                        selectionColor='#e91e63'
                        inputStyle={styles.inputStyle}
                    />

                    <Hideo
                        iconClass={Icon}
                        iconName={'md-key'}
                        iconColor={'white'}
                        value={this.state.pwd}
                        secureTextEntry={true}
                        onChangeText={(pwd) => this.setState({ pwd })}
                        iconBackgroundColor={'#e91e63'}
                        selectionColor='#e91e63'
                        inputStyle={styles.inputStyle}
                    />
                </View>

                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(52,52,52,0.5)', true)}  onPress={() => this.props.login(this.state.user, this.state.pwd)}>

                    <View style={styles.loginWarpper}>
                    <Text style={styles.loginText}>登 录</Text>
                    </View>
                   
                </TouchableNativeFeedback>

            </View>

        )
    }
}


const styles = StyleSheet.create({
    contentWarpper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputWarpper: {
        marginTop:32,
        height: 150,
        width:windowWidth*0.7
    },
    inputStyle: {
        color: '#464949',
        borderBottomColor:'#e91e63',
        borderBottomWidth: 2,
        marginLeft: 8,
    },
    loginWarpper: {
        borderRadius: windowWidth * 0.2,
        marginTop: 48,
        height: windowWidth * 0.4,
        width: windowWidth * 0.4,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 32,
        color: 'white'
    }
})



const mapState = (state) => ({
    isSucc: state.user.isSucc,
    data: state.user.data
})

const dispatchAction = (dispatch) => ({
    login: (user, pwd) => dispatch(userActions.login(user, pwd))
})


export default connect(mapState, dispatchAction)(LoginView)

