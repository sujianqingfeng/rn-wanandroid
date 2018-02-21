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
    let array = [];

    if (nextProps.data) {
      array = this.state.setionOneData.data.concat(nextProps.data.datas);
      if (this.state.page == 0) {
        array = nextProps.data.datas;
      }
    }

    const section = {
      key: "站内收藏",
      data: array,
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

  _renderItemInSite = ({ item }) => {
    const data = {
      item:item
    }
    return (
      <ArticleItemView  navigation={this.props.navigation} hide={false} item={data}/>
    )
  }
  ;

  _keyExtractor = (item, index) => index;

  

  render() {

    const sections =  [this.state.setionOneData]
    return (
      <View style={{ flex: 1 }}>
        <SectionList
         keyExtractor={this._keyExtractor}
          renderSectionHeader={this._renderSectionHeader}
          showsVerticalScrollIndicator={false}
          sections={sections}
        />
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
  }
});

const mapState = state => ({
  isSucc: state.like.isSucc,
  data: state.like.data
});

const dispatchAction = dispatch => ({
  getLikeList: page => dispatch(likeActions.getLikeList(page))
});

export default connect(mapState, dispatchAction)(LikeView);
