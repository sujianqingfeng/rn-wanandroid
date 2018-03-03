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
      isCheck:props.item.item.check,
      orgColor:props.item.item.color,
      background:'white',
      checkColor:props.item.item.color
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
    console.log(this.props)
    const {changeIndex,chenkIndex} = this.props
    const index = this.props.item.index
    changeIndex(index)

    // if(index == changeIndex){
    //     console.log(1111)
    // }else{
    //   console.log(2222)
    //   changeIndex(index)
    //   this.setState({
    //     isCheck:!this.state.isCheck,
    //     background:this._getColor(!this.state.isCheck),
    //     checkColor:this._getColor(this.state.isCheck)
    //   })
    // }    
  }

  render() {
    const {item} = this.props.item
   
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)",true)}
        onPress={this._chooseTheme}>
        <View style={{ height: windowWidth/3-25, width: windowWidth/3-25,margin:10,borderRadius: (windowWidth/3-25)/2,justifyContent:'center',alignItems:'center',backgroundColor:item.check?item.color:'white'}}>
          <Icon
            name='md-rose'
            size={50} color={item.check?'white':item.color}/>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({

});


export default ThemeItemView
