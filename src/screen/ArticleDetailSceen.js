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
import * as collectActions from '../actions/collectActions'
import HeaderBar from './HeaderBar'

export class ActicleDetailScreen extends React.PureComponent {
    static propTypes = {

    }


    _like = ()=>{
        const {isLogin} = this.props.navigation.state.params
        if(!isLogin){
            this.refs.toast.show('亲，没有登录', DURATION.LENGTH_SHORT);
        }else{

        }
    }

    render() {

        const {link,url,title,name} = this.props.navigation.state.params
        return (

            <View style={{flex:1}}>
                <HeaderBar rightIcon='md-heart-outline'  rightAction={this._like} navigation={this.props.navigation} title={title?title:name} />
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
    isAddInSite: state.collect.isAddInSite
  }),
    (dispatch) => ({
      postAddCollectInSite: (id)=>dispatch(collectActions.postAddCollectInSite(id))
    })
  )(ActicleDetailScreen)


