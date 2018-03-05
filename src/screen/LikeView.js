import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  SectionList
} from "react-native";

import ArticleItemView from './ArticleItemView'
import * as likeActions from "../actions/likeActions";
const windowWidth = Dimensions.get("window").width;

class LikeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      setionOneData: {
        renderItem: this._renderItemInSite,
        key: "站内收藏",
        data: []
      },
      refreshing: false
    };
  }

  componentWillMount() {
    this.props.getLikeList(this.state.page);

  }

  componentWillReceiveProps = nextProps => {

    

    const section = {
      key: "站内收藏",
      data: nextProps.datas,
      renderItem: this._renderItemInSite,
    };

    this.setState({
      setionOneData: section,
      refreshing: false
    });
  };

  _renderSectionHeader = ({ section }) => (
    <View style={{ flex: 1, height: 25 }}>
      <Text style={{marginLeft:8,justifyContent:'center'}}>{section.key}</Text>
    </View>
  );


  _likeClick= (index,item)=>{
   
    const {isLogin,message,likeCancelCollectInMy} = this.props
    if(!isLogin){
        message('亲，没有登陆')
        return 
    }

    
    likeCancelCollectInMy(item.id,item.originId,index)
    

}

  _renderItemInSite = ({ item }) => {
    const data = {item:item }
  
  
    return (
      <ArticleItemView  navigation={this.props.navigation} hide={false} likeClick={this._likeClick} item={data} outline={false}/>
    )
  }
    

  render() {

    const sections =  [this.state.setionOneData]
    const {isLogin} = this.props


    const content = isLogin ? (<SectionList
    keyExtractor={(item, index) => index}
     renderSectionHeader={this._renderSectionHeader}
     showsVerticalScrollIndicator={false}
    sections={sections}/>):<Text style={styles.hintText}>亲，没有登录</Text>

    return (
      <View style={{ flex: 1}}>
       {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    color: "white",
    width: windowWidth - 100
  },
  hotCard: {
    width: windowWidth - 16,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8
  },
  hotContent: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  hotText: {
    marginBottom: 4,
    marginTop: 4,
    marginRight: 16,
    fontSize: 15
  },
  hintText:{
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
  }
});

const mapState = state => ({
  isSucc: state.like.isSucc,
  datas: state.like.datas
});

const dispatchAction = dispatch => ({
  getLikeList: page => dispatch(likeActions.getLikeList(page)),
  likeCancelCollectInMy :(id,originId,index) => dispatch(likeActions.likeCancelCollectInMy(id,originId,index))
});

export default connect(mapState, dispatchAction)(LikeView);
