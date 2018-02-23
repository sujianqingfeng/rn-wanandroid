import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    WebView,
    StyleSheet
} from 'react-native'


import * as collectActions from '../actions/collectActions'

import HeaderBar from './HeaderBar'

export class ActicleDetailScreen extends React.PureComponent {
    static propTypes = {

    }


    render() {
        return (

            <View style={{flex:1}}>
                <HeaderBar rightIcon='md-heart-outline' navigation={this.props.navigation} title={this.props.navigation.state.params.title?this.props.navigation.state.params.title:this.props.navigation.state.params.name} />
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{ uri: this.props.navigation.state.params.link }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"

                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
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


