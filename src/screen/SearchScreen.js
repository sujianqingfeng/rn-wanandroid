import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";

import HeaderBar from "./HeaderBar";
import * as hotActions from "../actions/hotActions";
const windowWidth = Dimensions.get("window").width;

const colors = [
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
];

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: ""
    };
  }

  componentWillMount() {
    this.props.getHot();
    this.props.getFriend()
  }

  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
  };

  _renderTitleView = () => (
    <TextInput
      style={styles.inputStyle}
      placeholderTextColor="white"
      selectionColor="white"
      underlineColorAndroid="white"
      // value={this.state.searchStr}
      onChangeText={text => this.setState({ searchStr: text })}
      placeholder="请输入搜索词"
    />
  )

  

  _renderHotItem = (item, index) => (
    <Text onPress={()=>this.props.navigation.navigate("search_result",{k:item.name})} style={[styles.hotText,{color:colors[index%colors.length]}]} key={index} >{item.name}</Text>
  )

  _renderFriendItem = (item, index) => (
    <Text onPress={()=> this.props.navigation.navigate("article_detail", item)} style={[styles.hotText,{color:colors[index%colors.length]}]} key={index} >{item.name}</Text>
  )

  _rightAction = ()=>{
    if(this.state.searchStr.length>0){
      this.props.navigation.navigate("search_result",{k:this.state.searchStr})
    }else{
      alert('。。。')
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar
          rightIcon="md-search"
          rightAction={this._rightAction}
          titleView={this._renderTitleView}
          navigation={this.props.navigation}
        />

        <View style={styles.hotCard}>
          <Text style={{fontSize: 20,}}>大家都在搜索</Text>
          <View style={styles.hotContent}>
            {
              this.props.data.map((item, index) =>
              this._renderHotItem(item, index)
            )}
          </View>
        </View>

        <View style={[styles.hotCard,{marginTop: 16,}]}>
          <Text style={{fontSize: 20,}}>常用网站</Text>
          <View style={styles.hotContent}>
            {
              this.props.friend.map((item, index) =>
              this._renderFriendItem(item, index)
            )}
          </View>
        </View>
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
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 8,
  },
  hotContent: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  hotText: {
    marginBottom: 4,
    marginTop: 4,
    marginRight: 16,
    fontSize: 15,
  }
});

const mapState = state => ({
  isSucc: state.hot.isSucc,
  data: state.hot.data,
  friend:state.hot.friendArray
});

const dispatchAction = dispatch => ({
  getHot: () => dispatch(hotActions.getHotKeyword()),
  getFriend:()=>dispatch(hotActions.getFriendSite())
});

export default connect(mapState, dispatchAction)(SearchScreen);
