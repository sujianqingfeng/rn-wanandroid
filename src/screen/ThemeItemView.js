import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"

const windowWidth = Dimensions.get("window").width

class ThemeItemView extends React.PureComponent {
  static PropTypes = {

  };


  static defaultProps = {

  }

  constructor(props){
    super(props)
    this.state = {
      isCheck:props.isCheck,
      orgColor:props.item,
      background:'white',
      checkColor:props.item
    }
  }

  _getColor = (check)=>{
    if (check){
      return this.state.orgColor
    }
     else {
       return 'white'
     }
  }

  _chooseTheme= ()=>{
    this.setState({
      isCheck:!this.state.isCheck,
      background:this._getColor(!this.state.isCheck),
      checkColor:this._getColor(this.state.isCheck)
    })
  }

  render() {



    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)",true)}
        onPress={this._chooseTheme}>
        <View style={{ height: 50, width: 50, borderRadius: 25,justifyContent:'center',alignItems:'center',backgroundColor:this.state.background }}>
          <Icon
            name='md-rose'
            size={50} color={this.state.checkColor}/>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({

});


export default ThemeItemView
