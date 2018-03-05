import React from 'react'
import { SectionList,FlatList, Text , View,} from 'react-native'
import { connect } from 'react-redux'


import * as themeActions from '../actions/themeActions'
import HeaderBar from './HeaderBar'
import ThemeItemView from './ThemeItemView'
import * as ColorConst from '../constants/ColorConst'
import RealmUtil from '../utils/RealmUtil'


class ThemeScreen extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      chenkIndex:1,
      colors:ColorConst.getThemeColors(props.backgroundColor)
    }
  }


  _changeIndex =(index) =>{

    let colors =this.state.colors
    let themeColors = []
    for(const i=0;i<colors.length;i++){
      if(i==index){
        themeColors.push({color:colors[i].color,check:true})
        this.props.changeTheme(colors[i].color)
        RealmUtil.saveThemeColor(colors[i].color)
      }else{
        themeColors.push({color:colors[i].color,check:false})
      }

     
    }
    this.setState({colors:themeColors})
  } 

  render() {

    const {navigation,backgroundColor} = this.props
    return (
      <View>
          <HeaderBar backgroundColor={backgroundColor} navigation={navigation} title='选择主题' />
          <FlatList
              columnWrapperStyle={{ alignItems:'center',justifyContent:'center'}}
              numColumns={3}
              data={this.state.colors}
              renderItem={(item) => <ThemeItemView  changeIndex={this._changeIndex}  item={item}/>}
              keyExtractor={(item, index) => index}/>
      </View>
    )
  }
}



const mapStateToProps = (state) =>  ({
  backgroundColor:state.theme.color
})

const mapDispatchToProps = (dispatch) => ({
  changeTheme: color=>dispatch(themeActions.changeTheme(color))
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeScreen)


