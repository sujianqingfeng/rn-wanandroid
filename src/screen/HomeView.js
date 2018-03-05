import React from 'react'
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native'

import { connect } from 'react-redux'


import * as homeActions from '../actions/homeActions'
import ArticleItemView from './ArticleItemView'
import BannerView from './BannerView'



class HomeView extends React.Component {


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


    componentWillReceiveProps = (nextProps) => {
        if (nextProps.likeAction == 1) {
            nextProps.message('添加收藏')
        } else if (nextProps.likeAction == 2) {
            nextProps.message('取消收藏')
        }
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

    _renderRefresh = () => {
        this.setState({ page: 0 })
        this.props.getHomeList(0)
    }

    _likeClick = (index, item) => {

        const { isLogin, message, homeAddCollectInSite, homeCancelCollectInArticle } = this.props
        if (!isLogin) {
            message('亲，没有登陆')
            return
        }

        if (item.collect) {
            homeCancelCollectInArticle(item.id, index)
        } else {
            homeAddCollectInSite(item.id, index)
        }

    }


    render() {
        const { navigation, message, isLogin, datas, refreshing, banners } = this.props
        return (
            <FlatList
                data={datas}
                renderItem={(item, index) => <ArticleItemView likeClick={this._likeClick} isLogin={isLogin} navigation={navigation} hide={false} item={item} />}
                ListHeaderComponent={() => <BannerView isLogin={isLogin} navigation={navigation} banners={banners} />}
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.1}
                onEndReached={this._onEndReached}
                refreshing={refreshing}
                onRefresh={this._renderRefresh} />
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
    }
})


export default connect((state) => ({
    isSucc: state.home.isSucc,
    datas: state.home.datas,
    banners: state.home.banners,
    isEnd: state.home.isEnd,
    refreshing: state.home.refreshing,
    likeAction: state.home.likeAction
}),
    (dispatch) => ({
        getHomeList: (num) => dispatch(homeActions.getHome(num)),
        getBanner: () => dispatch(homeActions.getHomeBanner()),
        homeAddCollectInSite: (id, index) => dispatch(homeActions.homeAddCollectInSite(id, index)),
        homeCancelCollectInArticle: (id, index) => dispatch(homeActions.homeCancelCollectInArticle(id, index))
    })
)(HomeView)
