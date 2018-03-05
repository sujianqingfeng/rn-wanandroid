import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  StatusBar
} from "react-native";
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-banner-carousel";
import Toast, { DURATION } from 'react-native-easy-toast'

import LoginView from "./LoginView";
import RegisterView from "./RegisterView";
import * as userActions from '../actions/userActions'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class UserScreen extends React.PureComponent {



  componentWillReceiveProps(props) {

    if (props.isLoginLable) {

      if (props.isLoginSucc) {
        this.refs.toast.show('登陆成功', DURATION.LENGTH_SHORT);
        this._goBack()
      } else if (props.loginComplate) {
        this.refs.toast.show(props.loginData, DURATION.LENGTH_SHORT);

      }
    } else {

      if (props.isRegisterSucc) {
        this.refs.toast.show('注册成功', DURATION.LENGTH_SHORT);
      } else if (props.registerComplate) {
        this.refs.toast.show(props.registerData, DURATION.LENGTH_SHORT);
      }
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }



  _goBack = () => this.props.navigation.goBack()


  render() {

    const { themeColor } = this.props

    return (
      <View style={styles.contentWarpper}>

        <View style={styles.closeWarpper}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)", true)}
            onPress={this._goBack}>
            <View style={{ height: 40, width: 40, borderRadius: 20 }}>
              <Icon
                style={{ marginHorizontal: 8 }}
                name="md-close"
                size={40}
                color={themeColor}
                backgroundColor="#00000000"
              />

            </View>

          </TouchableNativeFeedback>
        </View>

        <View style={styles.carouselWarpper}>
          <Carousel
            activePageIndicatorStyle={{ backgroundColor: themeColor}}
            autoplay={false}
            index={0}
            pageSize={windowWidth * 0.8}
          >
            <View key="login" style={styles.content}>
              <LoginView {...this.props} />
            </View>

            <View key="register" style={styles.content}>
              <RegisterView {...this.props} />
            </View>
          </Carousel>
        </View>

        <Toast ref="toast" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentWarpper: {
    alignItems: "center",
    flex: 1
  },
  closeWarpper: {
    marginTop: StatusBar.currentHeight,
    height: windowHeight * 0.1
  },
  carouselWarpper: {
    borderRadius: 5,
    backgroundColor: "white",
    width: windowWidth * 0.8
  },
  content: {
    height: windowHeight * 0.7,
    borderRadius: 5,
    backgroundColor: "white",
    width: windowWidth * 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16
  },

  inputStyle: {
    marginHorizontal: 32,
    height: 50,
    width: windowWidth * 0.9,
    borderBottomColor: "#e91e63",
    borderBottomWidth: 2
  },
  loginWarpper: {
    borderRadius: 10,
    marginTop: 16,
    height: 50,
    width: windowWidth * 0.6,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center"
  },
  loginText: {
    fontSize: 15,
    color: "white"
  },
  registerStyle: {
    marginTop: 32,
    color: "#e91e63"
  }
});



const mapState = (state) => ({
  isLoginLable: state.user.isLoginLable,
  isRegisterSucc: state.user.isRegisterSucc,
  registerData: state.user.registerData,
  isLoginSucc: state.user.isLoginSucc,
  loginData: state.user.loginData,
  loginComplate: state.user.loginComplate,
  registerComplate: state.user.registerComplate,
  themeColor: state.theme.color
})

const dispatchAction = (dispatch) => ({
  register: (user, pwd) => dispatch(userActions.register(user, pwd, pwd)),
  login: (user, pwd) => dispatch(userActions.login(user, pwd))
})




export default connect(mapState, dispatchAction)(UserScreen)




