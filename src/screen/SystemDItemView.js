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
    }
  }


  componentWillMount() {
    this.props.getSystemDetailList(this.state.page, this.state.cid)
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.likeAction == 1) {
      nextProps.message('添加收藏')
    } else if (nextProps.likeAction == 2) {
      nextProps.message('取消收藏')
    }
  }


  _onEndReached = () => {



    let {page,cid} = this.state
    const {datas} = this.props

    if (!datas[cid].isEnd) {
      page++
      this.setState({ page: page })
      this.props.getSystemDetailList(page, cid)
    }
  }

  _renderRefresh = () => {
    this.setState({ page: 0 })
    this.props.getSystemDetailList(0, this.state.cid)
  }


  _likeClick = (index, item) => {

    const { isLogin, message, systemAddCollectInSite, systemCancelCollectInArticle } = this.props
    let {cid} = this.state
    if (!isLogin) {
      message('亲，没有登陆')
      return
    }

    if (item.collect) {
      systemCancelCollectInArticle(item.id, index,cid)
    } else {
      systemAddCollectInSite(item.id, index,cid)
    }

  }


  render() {

    const {datas ,themeColor}  = this.props
    const {cid}  = this.state
    const data = datas[cid]?datas[cid].datas:[]
   
    return (
   
      <FlatList
        data={data}
        renderItem={(item) => <ArticleItemView themeColor={themeColor} likeClick={this._likeClick} navigation={this.props.navigation} hide={true} item={item} />}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.1}
        onEndReached={this._onEndReached}
        refreshing={this.props.refreshing}
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


const mapStateToProps = (state) =>  ({
  datas: state.system.details,
  isLogin: state.user.isLogin,
  isEnd: state.system.isEnd,
  refreshing: state.system.detailRefreshing,
  likeAction: state.system.likeAction,
  themeColor:state.theme.color
})

const mapDispatchToProps = (dispatch) => ({
  getSystemDetailList: (page, id) => dispatch(systemActions.getSystemDetailList(page, id)),
  systemAddCollectInSite: (id, index,cid) => dispatch(systemActions.systemAddCollectInSite(id, index,cid)),
  systemCancelCollectInArticle: (id, index,cid) => dispatch(systemActions.systemCancelCollectInArticle(id, index,cid))
})


export default connect(mapStateToProps, mapDispatchToProps)(SystemDItemView)

