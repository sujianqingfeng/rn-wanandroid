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
      orgColor:props.item.item,
      background:'white',
      checkColor:props.item.item
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

    const {index,changeIndex,chenkIndex} = this.props

    if(index == changeIndex){

    }else{
      changeIndex(index)
      this.setState({
        isCheck:!this.state.isCheck,
        background:this._getColor(!this.state.isCheck),
        checkColor:this._getColor(this.state.isCheck)
      })
    }
  

    
  }

  render() {
    const {index,chenkIndex} = this.props

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)",true)}
        onPress={this._chooseTheme}>
        <View style={{ height: windowWidth/3-25, width: windowWidth/3-25,margin:10,borderRadius: (windowWidth/3-25)/2,justifyContent:'center',alignItems:'center',backgroundColor:index!=chenkIndex?this.state.background:'white'}}>
          <Icon
            name='md-rose'
            size={50} color={index!=chenkIndex?this.state.checkColor:this.state.orgColor}/>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({

});


export default ThemeItemView
