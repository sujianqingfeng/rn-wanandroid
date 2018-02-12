import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'
const windowWidth = Dimensions.get('window').width

import * as systemActions from '../actions/systemActons'
import ArticleItemView from './ArticleItemView'

export class SystemDItemView extends Component {

  constructor(props) {
    super(props)


    this.state = {
      page: 0,
      cid: props.item.id,
      dataArray: [],
      refreshing: false,
    }
  }


  componentWillMount() {
    this.props.getSystemDetailList(this.state.page, this.state.cid)
  }


  componentWillReceiveProps(props) {
    let array = []

    if (props.data) {
      array = this.state.dataArray.concat(props.data.datas)

      if (this.page == 0) {
        array = props.data.datas
      }
    }

    this.setState({
      dataArray: array
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
      this.props.getSystemDetailList(page, this.state.cid)
    }
  }

  _renderRefresh = () => {
    this.setState({
      refreshing: true,
      page: 0,
      dataArray: []
    })
    this.props.getSystemDetailList(0, this.state.cid)
  }


  _keyExtractor = (item, index) => index


  render() {
    return (
      <FlatList
        data={this.state.dataArray}
        renderItem={(item) => <ArticleItemView navigation={this.props.navigation}  hide={true} item={item} />}
        keyExtractor={this._keyExtractor}
        onEndReachedThreshold={0.1}
        onEndReached={this._onEndReached}
        refreshing={this.state.refreshing}
        onRefresh={this._renderRefresh}
      />
    )
  }
}


const styles = StyleSheet.create({

  itemView: {
    borderRadius: 5,
    backgroundColor: 'white',
    height: 70,
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterWarpper: {
    height: 70,
    justifyContent: 'center',
    width: 15,
    backgroundColor: '#e91e63',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  chapterText: {
    color: 'white',
  },
  title: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  info: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },

  niceDate: {
    marginLeft: 16,
  },
  author: {
    alignSelf: 'flex-start'
  },
  textWarpper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: windowWidth,
    width: windowWidth - 16,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  }
})


const mapState = (state) => ({
  isSucc: state.system.isSucc,
  data: state.system.detail
})

const dispatchAction = (dispatch) => ({
  getSystemDetailList: (page, id) => dispatch(systemActions.getSystemDetailList(page, id))
})


export default connect(mapState, dispatchAction)(SystemDItemView)

