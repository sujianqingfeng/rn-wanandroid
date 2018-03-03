import * as homeActions from '../actions/homeActions'
import ArticleItemView from './ArticleItemView'
import React, { Component } from 'react'
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native'
import Carousel from 'react-native-banner-carousel'
import { connect } from 'react-redux'

const BannerWidth = Dimensions.get('window').width
const BannerHeight = 260;


class HomeView extends Component {


    constructor(props) {
        super(props)
        this.state = {
            page: 0
        }
    }

    componentWillMount() {
        let _that = this
        _that.props.getHomeList(this.state.page)
        _that.props.getBanner()
    }


    componentWillReceiveProps = (nextProps)=>{
        if(nextProps.likeAction==1){
            nextProps.message('添加收藏')
        }else if(nextProps.likeAction==2){
            nextProps.message('取消收藏')
        }
    }



    _headView = () => {
        
        const {banners} = this.props

        return (
            <View style={{ margin: 8, borderRadius: 5, }}>
                <Carousel
                    activePageIndicatorStyle={{ backgroundColor: '#e91e63' }}
                    pageIndicatorStyle={{ backgroundColor: 'white' }}
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth - 16}>
                    {banners[0]? banners.map((image, index) => this._renderPage(image, index)) : <View></View>}
                </Carousel>
            </View>
        )

    }
    _renderPage(image, index) {

        const { navigation, isLogin } = this.props

        const params = { ...image, isLogin: isLogin }

        return (
            <TouchableNativeFeedback key={index} onPress={() => navigation.navigate("article_detail", params)}>
                <View style={{ borderRadius: 5 }}>
                    <Image style={{ width: BannerWidth - 16, height: BannerHeight, borderRadius: 5 }} source={{ uri: image.imagePath }} />
                    <View style={styles.textWarpper}>
                        <Text style={styles.text}>{image.title}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    _onEndReached = () => {
        let page = this.state.page

        if (!this.props.isEnd) {
            page++
            this.setState({
                page: page
            }
            )
            this.props.getHomeList(page)
        }
    }

    // 下拉刷新
    _renderRefresh = () => {
        this.props.getHomeList(0)
    }

    _likeClick= (index,item)=>{
        console.log(index,item)
        const {isLogin,message,homeAddCollectInSite,homeCancelCollectInArticle} = this.props
        if(!isLogin){
            message('亲，没有登陆')
            return 
        }

        if(item.collect){
            homeCancelCollectInArticle(item.id,index)
        }else{
            homeAddCollectInSite(item.id,index)
        }

    }



    render() {
        const { dataArray } = this.state
        const { navigation, message, isLogin, datas ,refreshing} = this.props

        return (
            <View>
                <FlatList
                    data={datas}
                    renderItem={(item, index) => <ArticleItemView  likeClick={this._likeClick} isLogin={isLogin}  navigation={navigation} hide={false} item={item} />}
                    ListHeaderComponent={this._headView}
                    keyExtractor={(item, index) => index}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}
                    refreshing={refreshing}
                    onRefresh={this._renderRefresh} />
            </View>
        )
    }
}




const styles = StyleSheet.create({

    itemView: {
        borderRadius: 5,
        backgroundColor: 'white',
        height: 70,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterWarpper: {
        height: 70,
        justifyContent: 'center',
        width: 15,
        backgroundColor: '#e91e63',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    chapterText: {
        color: 'white',
    },
    title: {
        fontSize: 18,
        marginHorizontal: 16,
    },
    info: {
        flexDirection: 'row',
        marginHorizontal: 16,
    },

    niceDate: {
        marginLeft: 16,
    },
    author: {
        alignSelf: 'flex-start'
    },
    textWarpper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: BannerHeight,
        width: BannerWidth - 16,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    }



})


export default connect((state) => ({
    isSucc: state.home.isSucc,
    datas: state.home.datas,
    banners: state.home.banners,
    isEnd:state.home.isEnd,
    refreshing:state.home.refreshing,
    likeAction:state.home.likeAction
}),
    (dispatch) => ({
        getHomeList: (num) => dispatch(homeActions.getHome(num)),
        getBanner: () => dispatch(homeActions.getHomeBanner()),
        homeAddCollectInSite:(id,index)=>dispatch(homeActions.homeAddCollectInSite(id,index)),
        homeCancelCollectInArticle:(id,index)=>dispatch(homeActions.homeCancelCollectInArticle(id,index))
    })
)(HomeView)
