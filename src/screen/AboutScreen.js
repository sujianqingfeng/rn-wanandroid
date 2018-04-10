import React from 'react'
import { View, StyleSheet, Text,Image, Dimensions, TouchableNativeFeedback} from 'react-native'
import { connect } from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import Icon from "react-native-vector-icons/Ionicons"

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 75;

const window = Dimensions.get('window')

class AboutScreen extends React.Component {


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress',()=>{
          this.props.navigation.goBack()
          return true
        })
      }


    _renderForeground = () => (
        <View key="parallax-header" style={[styles.parallaxHeader, { backgroundColor: this.props.backgroundColor }]}>
            <Image style={styles.avatar} source={require('./../../res/images/background_draw.jpeg')} />
            <Text style={styles.sectionSpeakerText}>Rn Wanandroid</Text>
            <Text style={styles.sectionTitleText}>本项目是一个Rn的练习项目，玩Android的客户端，一个致力于分享各种Android干货的平台。</Text>
        </View>
    )

    _renderStickyHeader = ()=>(
        <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>关于</Text>
        </View>
    )

    _renderFixedHeader = () =>(
        <View key="fixed-header" style={styles.fixedSection}>
            <TouchableNativeFeedback
                onPress={() => this.props.navigation.goBack()}
                background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)", true)}>
                <View style={styles.iconWarrrper}>
                    <Icon style={styles.icon} name='md-arrow-back' size={30} color="white" />
                </View>
            </TouchableNativeFeedback>
        </View>
    )

    render() {
        const { navigation,backgroundColor } = this.props

        return (
            <ParallaxScrollView
            backgroundColor={backgroundColor}
            stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}
            renderForeground={()=>this._renderForeground()}
            renderStickyHeader={() => this._renderStickyHeader()}
            renderFixedHeader={() => this._renderFixedHeader()}>

                <View style={styles.content}>
                    {/* <Text style={{fontSize:20,textAlign:'center',marginVertical:16}}>此项目是鸿神Wanandroid的一个客户端，一个致力于分享各种Android干货的平台。</Text> */}

                    <TouchableNativeFeedback
                        onPress={() => this.props.navigation.navigate('article_detail',{url:'http://www.wanandroid.com',name:'玩Android'})}>
                        <View style={styles.item}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.itemText}>玩Android</Text>
                                <Text>http://www.wanandroid.com</Text>
                            </View>
                            <Icon style={{margin:8}} name='ios-arrow-forward' size={20} color='grey' />
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        onPress={() => this.props.navigation.navigate('article_detail',{url:'https://github.com/sujianqingfeng/rn-wanandroid.git',name:'项目地址'})}>
                        <View style={styles.item}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.itemText}>项目地址</Text>
                                <Text>https://github.com/sujianqingfeng/rn-wanandroid.git</Text>
                            </View>
                             <Icon style={{margin:8}} name='ios-arrow-forward' size={20} color='grey' />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            
            </ParallaxScrollView>)
    }

}


const styles = StyleSheet.create({

    content: {
        padding: 8,
        backgroundColor: 'rgba(52,52,52,0.1)',
        height:window.height - STICKY_HEADER_HEIGHT
    },
    item:{
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius:5,
        flexDirection:'row',
        width:window.width-16,
        marginTop:4,
        padding:8
    },
    itemLeft:{
        flex:1
    },
    itemText:{
        fontSize:15
    },
    iconWarrrper:{
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
      },
    container: {
        flex: 1,
        backgroundColor: 'black'
      },
      background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
      },
      stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: window.width,
        justifyContent: 'center',
        alignItems:'center'
      },
      stickySectionText: {
        color: 'white',
        fontSize: 20,
        marginTop:10
      },
      fixedSection: {
        position: 'absolute',
        bottom: 10,
        left: 10
      },
      fixedSectionText: {
        color: '#999',
        fontSize: 20
      },
      parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
      },
      avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
      },
      sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
      },
      sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5,
        textAlign:'center'
      },
      row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
      },
      rowText: {
        fontSize: 20
      }

})

const mapStateToProps = (state) => ({
    backgroundColor:state.theme.color
})
  

export default connect(mapStateToProps)(AboutScreen)