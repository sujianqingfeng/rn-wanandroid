import HeaderBar from './HeaderBar'
import ThemeItemView from './ThemeItemView'
import React from 'react'
import { SectionList, Text , View,} from 'react-native'

const sections = {
  key:1,
  data:[
    "#f44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#2196F3",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#FFEB3B",
    "#FF9800",
    "#795548",
    "#9E9E9E",
    "#607D8B"
  ]
}

class ThemeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      page:1,
      dataArray: [],
      refreshing: false,
    }
  }


  render() {
    return (
      <View>
          <HeaderBar  navigation={this.props.navigation} title='选择主题' />
          <SectionList
              sections={sections}
              renderItem={(item) => <ThemeItemView  item={item} />}
              keyExtractor={(item, index) => index}
                />
      </View>
    )
  }
}


export default ThemeScreen
