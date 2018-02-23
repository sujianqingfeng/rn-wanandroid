import * as collectActions from '../actions/collectActions'
import PropTypes from "prop-types";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux'

const windowWidth = Dimensions.get("window").width

class ArticleItemView extends React.PureComponent {
  static PropTypes = {
    item: PropTypes.object.isRequired,
    hide: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    outline:PropTypes.bool,
  };


  static defaultProps = {
    outline:true
  }

  constructor(props){
    super(props)

    this.state = {
      likeIcon:(props.item.collect||!props.outline)?'md-heart':'md-heart-outline'
    }
  }


  componentWillReceiveProps = (nextProps) => {
    if(nextProps.isAddInSite){
      nextProps.message('收藏成功')
      this.setState({likeIcon:'md-heart'})
    }else if (nextProps.isCancelInA) {
      this.setState({likeIcon:'md-heart-outline'})
    }else if (nextProps.isCancelInM) {
      this.setState({likeIcon:'md-heart-outline'})
    }
  }


  _requestAction = (bool,item)=>{
 
    const {outline,postAddCollectInSite,postCancelCollectInArticle,postCancelCollectInMy} = this.props
    
    if(bool){
      if(!outline){
        postCancelCollectInMy(item.id)
      }else {
        postCancelCollectInArticle(item.id)
      }
    }else{
      postAddCollectInSite(item.id)
    }
  }

  render() {
    const { hide,outline} = this.props;
    const { item } = this.props.item;
    const {likeIcon} = this.state
    return (
      <TouchableNativeFeedback
        onPress={() => this.props.navigation.navigate("article_detail", item)}  >
        <View style={styles.itemView}>
          {hide ? (
            <View />
          ) : (
            <View style={[styles.chapterWarpper]}>
              <Text style={styles.chapterText}>{item.chapterName?item.chapterName:'其他'}</Text>
            </View>
          )}

          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <View style={styles.info}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.niceDate}>{item.niceDate}</Text>
            </View>
          </View>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)",true)}
            onPress={() =>this._requestAction(item.collect||!outline,item)}>
            <View style={{ height: 30, width: 30, borderRadius: 15,marginRight:8,justifyContent:'center',alignItems:'center' }}>
              <Icon
                name={likeIcon}
                size={30} color="#e91e63"/>
            </View>
          </TouchableNativeFeedback>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  itemView: {
    borderRadius: 5,
    backgroundColor: "white",
    height: 70,
    margin: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  chapterWarpper: {
    height: 70,
    justifyContent: "center",
    width: 15,
    backgroundColor: "#e91e63",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  chapterText: {
    color: "white"
  },
  title: {
    fontSize: 18,
    marginHorizontal: 16
  },
  info: {
    flexDirection: "row",
    marginHorizontal: 16
  },

  niceDate: {
    marginLeft: 16
  },
  author: {
    alignSelf: "flex-start"
  },
  textWarpper: {
    position: "absolute",
    top: 0,
    left: 0,
    height: windowWidth,
    width: windowWidth - 16,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  text: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    color: "white"
  }
});


export default connect((state) => ({
  isAddInSite: state.collect.isAddInSite,
  isCancelInA:state.collect.isCancelInA,
  isCancelInM:state.collect.isCancelInM
}),
  (dispatch) => ({
    postAddCollectInSite: (id)=>dispatch(collectActions.postAddCollectInSite(id)),
    postCancelCollectInArticle:(id)=>dispatch(collectActions.postCancelCollectInArticle(id)),
    postCancelCollectInMy:(id)=>dispatch(collectActions.postCancelCollectInMy(id))
  })
)(ArticleItemView)
