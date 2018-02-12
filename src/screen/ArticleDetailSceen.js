import React, { Component } from 'react'

import {
    View,
    Text,
    WebView,
    StyleSheet
} from 'react-native'


import HeaderBar from './HeaderBar'

export class ActicleDetailScreen extends React.PureComponent {
    static propTypes = {

    }


    static navigationOptions = {

        header: null,

    }


    render() {
        return (

            <View style={{flex:1}}>
                <HeaderBar rightIcon='md-heart-outline' navigation={this.props.navigation} title={this.props.navigation.state.params.title} />
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

export default ActicleDetailScreen
