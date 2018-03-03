import React from 'react'
import { SectionList,FlatList, Text , View,} from 'react-native'

import HeaderBar from './HeaderBar'
import ThemeItemView from './ThemeItemView'
import * as ColorConst from '../constants/ColorConst'


class ThemeScreen extends React.Component {



  constructor(props){
    super(props)
    this.state = {
      chenkIndex:1,
      colors:ColorConst.getThemeColors()
    }
  }


  _changeIndex =(index) =>{

    let colors =this.state.colors
    let themeColors = []
    for(const i=0;i<colors.length;i++){
      themeColors.push({color:colors[i].color,check:i==index})
    }
    this.setState({colors:themeColors})
  } 

  render() {
    return (
      <View>
          <HeaderBar  navigation={this.props.navigation} title='选择主题' />
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


export default ThemeScreen
