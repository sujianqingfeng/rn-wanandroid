import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

import HeaderBar from './HeaderBar'
export default class AboutScreen extends React.Component {



    render() {

        const { navigation } = this.props

        return (<ParallaxScroll
            renderHeader={({ animatedValue }) => <HeaderBar navigation={navigation} title='关于' animatedValue={animatedValue} />}
            headerHeight={75}
            isHeaderFixed={false}
            parallaxHeight={250}
            // renderParallaxBackground={({ animatedValue }) => <Background animatedValue={animatedValue} />}
            // renderParallaxForeground={({ animatedValue }) => <Foreground animatedValue={animatedValue} />}
            parallaxBackgroundScrollSpeed={5}
            parallaxForegroundScrollSpeed={2.5}>

            <View style={styles.content}>
                <Text>本项目是一个Rn的练习项目，玩Android的客户端，写得不好，大佬轻喷</Text>
                <Text>玩android:www.wanandroid.com</Text>
                <Text>项目地址:https://github.com/sujianqingfeng/rn-wanandroid.git</Text>
            </View>

        </ParallaxScroll>)
    }


}


const styles = StyleSheet.create({

    content: {
        margin: 8,
    }

})