import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
    Image,
    Text,
    View,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native'

import Carousel from 'react-native-banner-carousel'

import ArticleItemView from './ArticleItemView'
import * as homeActions from '../actions/homeActions'

const BannerWidth = Dimensions.get('window').width
const BannerHeight = 260;


class HomeView extends Component {


    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            dataArray: [],
            refreshing: false,
            bannerArray: []
        }
    }

    componentWillMount() {
        let _that = this
        _that.props.getHomeList(this.state.page)
        _that.props.getBanner()
    }


    componentWillReceiveProps(props) {
        let array = []

        if (props.data) {
            array = this.state.dataArray.concat(props.data.datas)

            if (this.state.page == 0) {
                array = props.data.datas
            }
        }

        let bannerArray = []
        if (props.banner) {
            bannerArray = props.banner
        }
        this.setState({
            dataArray: array,
            refreshing: false,
            bannerArray: bannerArray
        })
    }


    _headView = () => (
        <View style={{ margin: 8, borderRadius: 5, }}>
            <Carousel
                activePageIndicatorStyle={{ backgroundColor: '#e91e63' }}
                pageIndicatorStyle={{ backgroundColor: 'white' }}
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}

                pageSize={BannerWidth - 16}
            >
                {this.state.bannerArray.length > 0 ? this.state.bannerArray.map((image, index) => this._renderPage(image, index)) : <View></View>}
            </Carousel>

        </View>

    )

    _renderPage(image, index) {
        return (
            <View key={index} style={{ borderRadius: 5 }}>
                <Image style={{ width: BannerWidth - 16, height: BannerHeight, borderRadius: 5 }} source={{ uri: image.imagePath }} />
                <View style={styles.textWarpper}>
                    <Text style={styles.text}>{image.title}</Text>
                </View>
            </View>
        );
    }

    _onEndReached = () => {
        let data = this.props.data
        let page = this.state.page

        if (data && page < data.pageCount) {
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
        this.setState({
            refreshing: true,
            page: 0,
            dataArray: []
        })
        this.props.getHomeList(0)
    };


    _keyExtractor = (item, index) => index;

    render() {

        const { dataArray } = this.state
        return (
            <View>
                <FlatList
                    data={dataArray}
                    renderItem={(item) => <ArticleItemView  navigation={this.props.navigation} hide={false} item={item} />}
                    ListHeaderComponent={this._headView}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}
                    refreshing={this.state.refreshing}
                    onRefresh={this._renderRefresh}
                />

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
    data: state.home.data,
    banner: state.home.banner
}),
    (dispatch) => ({
        getHomeList: (num) => {
            dispatch(homeActions.getHome(num))
        },
        getBanner: () => dispatch(homeActions.getHomeBanner())
    })
)(HomeView)
