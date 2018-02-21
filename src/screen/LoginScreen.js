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
import Icon from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-banner-carousel";
import DropdownAlert from "react-native-dropdownalert";

import LoginView from "./LoginView";
import RegisterView from "./RegisterView";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class LoginScreen extends Component {
  static navigationOptions = {
    title: "登录",
    header: null,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#e91e63"
    },

    headerTitleStyle: {
      color: "white"
    }
  };

  render() {
    return (
      <View style={styles.contentWarpper}>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
        <View style={styles.closeWarpper}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              "rgba(52,52,52,0.5)",
              true
            )}
            onPress={() => this.props.navigation.goBack()}
          >
            <View style={{height:40,width:40,borderRadius:20}}>
            <Icon
              style={{ marginHorizontal: 8 }}
              name="md-close"
              size={40}
              color="#e91e63"
              backgroundColor="#00000000"
            />

            </View>
            
          </TouchableNativeFeedback>
        </View>

        <View style={styles.carouselWarpper}>
          <Carousel
            activePageIndicatorStyle={{ backgroundColor: "#e91e63" }}
            autoplay={false}
            index={0}
            pageSize={windowWidth * 0.8}
          >
            <View key="login" style={styles.content}>
              <LoginView />
            </View>

            <View key="register" style={styles.content}>
              <RegisterView />
            </View>
          </Carousel>
        </View>
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

export default LoginScreen;
