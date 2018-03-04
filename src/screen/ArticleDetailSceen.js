import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    WebView,
    StyleSheet,
    Dimensions
} from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'


const windowWidth = Dimensions.get("window").width
import * as articleDetailActions from '../actions/articleDetailActions'
import HeaderBar from './HeaderBar'

export class ActicleDetailScreen extends React.PureComponent {
    static propTypes = {

    }


    _like = ()=>{
        const {detailCancelCollectInArticle,detailAddCollectInSite,isLogin} = this.props
        const {id,collect} = this.props.navigation.state.params

        if(!isLogin){
            this.refs.toast.show('亲，没有登录', DURATION.LENGTH_SHORT)
            return
        }

        if(!collect){
            detailAddCollectInSite(id)
        }else{
            detailCancelCollectInArticle(id)
        }
    }

    render() {

        const {link,url,title,name,collect} = this.props.navigation.state.params

        const {isLike} = this.props
        return (

            <View style={{flex:1}}>
                <HeaderBar rightIcon={(isLike||collect)?'md-heart':'md-heart-outline'}  rightAction={this._like} navigation={this.props.navigation} title={title?title:name} />
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{ uri: link?link:url }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />

                 <View style={{
                  width:windowWidth,
                  position: "absolute",
                  left: 0,
                  top:0}}>
                  <Toast ref="toast" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    webView: {
        flex: 1,
    }
})


export default connect((state) => ({
   isLike:state.articleDetail.isLike,
   isLogin: state.user.isLogin,
  }),
    (dispatch) => ({
        detailAddCollectInSite: (id)=>dispatch(articleDetailActions.detailAddCollectInSite(id)),
        detailCancelCollectInArticle:(id)=>dispatch(articleDetailActions.detailCancelCollectInArticle(id))
    })
  )(ActicleDetailScreen)


