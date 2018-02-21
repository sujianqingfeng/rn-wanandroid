import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableNativeFeedback
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

const NAVBAR_HEIGHT_AMDROID = 50;
const NAVBAR_HEIGHT_IOS = 44;

const StatusBarShape = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.oneOf("default", "light-content", "dark-content"),
  translucent: PropTypes.bool
};

export default class componentName extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    titleView: PropTypes.func,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    screenName: PropTypes.string,
    isGoBank: PropTypes.bool,
    rightAction: PropTypes.func,
    statusStyle: PropTypes.shape(StatusBarShape),
    navigation: PropTypes.object.isRequired
  };

  static defaultProps = {
    title: "",
    statusStyle: {
      backgroundColor: "#00000000",
      barStyle: "light-content",
      translucent: true
    },
    leftIcon: "md-arrow-back",
    isGoBank: true
  };

  _leftClick(isGoBank, screenName) {
    console.log(this.props);
    if (isGoBank) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate(screenName);
    }
  }

  render() {
    const { rightIcon } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.statusWapper}>
          <StatusBar {...this.props.statusStyle} />
        </View>

        <View style={styles.headerWarpper}>
          <View style={styles.leftStyle}>
            <TouchableNativeFeedback
              onPress={() =>
                this._leftClick(this.props.isGoBank, this.props.screenName)
              }
              background={TouchableNativeFeedback.Ripple(
                "rgba(52,52,52,0.5)",
                true
              )}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon
                  style={styles.icon}
                  name={this.props.leftIcon}
                  size={30}
                  color="white"
                />
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.titleStyle}>
            {this.props.titleView ? (
              this.props.titleView()
            ) : (
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {this.props.title}
              </Text>
            )}
          </View>

          <View style={styles.rightStyle}>
            {rightIcon ? (
              <TouchableNativeFeedback
                onPress={this.props.rightAction}
                background={TouchableNativeFeedback.Ripple(
                  "rgba(52,52,52,0.5)",
                  true
                )}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    style={styles.icon}
                    name={this.props.rightIcon}
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableNativeFeedback>
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e91e63",

    height:
      (Platform.os === "ios" ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_AMDROID) +
      StatusBar.currentHeight
  },
  statusWapper: {
    // height: StatusBar.currentHeight
  },
  headerWarpper: {
    marginTop: StatusBar.currentHeight / 2 + 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  leftStyle: {
    margin: 8
  },
  titleStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    left: 40,
    right: 40
  },
  rightStyle: {
    margin: 8
  },
  title: {
    fontSize: 20,
    color: "white",
    margin: 16
  }
});
