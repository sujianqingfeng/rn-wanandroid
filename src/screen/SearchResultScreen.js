import React, { Component } from 'react'
import { View, Text , FlatList,} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as searchActions from '../actions/searchActions'
import HeaderBar from './HeaderBar'
import ArticleItemView from './ArticleItemView'
class SearchResultScreen extends Component {


  constructor(props){
    super(props)
    this.state = {
      page:1,
      dataArray: [],
      refreshing: false,
    } 
  }

  componentWillMount(){
    this.props.getSearchResult(this.state.page,this.props.navigation.state.params.k)
  }


  componentWillReceiveProps(props) {
    let array = []

    if (props.data) {
        array = this.state.dataArray.concat(props.data.datas)

        if (this.state.page == 1) {
            array = props.data.datas
        }
    }

    this.setState({
        dataArray: array,
        refreshing: false,
 
    })
}


_onEndReached = () => {
  let data = this.props.data
  let page = this.state.page

  if (data && page < data.pageCount) {
      page++
      this.setState({
          page: page
      }
      )
      
    this.props.getSearchResult(page,this.props.navigation.state.params.k)
     
  }
}

// 下拉刷新
_renderRefresh = () => {
  this.setState({
      refreshing: true,
      page: 0,
      dataArray: []
  })
  
  this.props.getSearchResult(0,this.props.navigation.state.params.k)
};


_keyExtractor = (item, index) => index;


  render() {
    return (
      <View>
          <HeaderBar  navigation={this.props.navigation} title={this.props.navigation.state.params.k} />
          <FlatList
                    data={this.state.dataArray}
                    renderItem={(item) => <ArticleItemView  navigation={this.props.navigation} hide={false} item={item} />}
                
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}
                    refreshing={this.state.refreshing}
                    onRefresh={this._renderRefresh}
                />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  isSucc:state.search.isSucc,
  data:state.search.data
})

const mapDispatchToProps = dispatch=>( {
  getSearchResult:(page,k)=>dispatch( searchActions.getSearchResult(page,k))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen)
