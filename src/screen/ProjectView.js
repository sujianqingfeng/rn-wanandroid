import React from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native'

import ProjectItemView from './ProjectItemView'
import * as projectActions from '../actions/projectActions'


class ProjectView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {page: 0}
    }

    componentWillMount=()=>this.props.getProjectList(this.state.page)
    
    componentWillUpdate =()=>this.props.changeLikeAction()
    
    componentWillReceiveProps(nextProps) {
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
            this.setState({page: page})
            this.props.getProjectList(page)
        }
    }

    // 下拉刷新
    _renderRefresh = () => {
        this.setState({page: 0})
        this.props.getProjectList(0)
    };


  

    _likeClick = (item,index)=>{

        const {isLogin,message,projectAddCollectInSite,projectCancelCollectInArticle} = this.props

        if(!isLogin){
            message('请，没有登录')
            return
        }

        if(item.collect){
            projectCancelCollectInArticle(item.id,index)
        }else{
            projectAddCollectInSite(item.id,index,true)
        }
    }


  
    render() {

        const {datas,refreshing,backgroundColor,navigation,isLogin}= this.props

        return (
            <View style={styles.textWarpper}>
                <FlatList
                    data={datas}
                    renderItem={(item,index)=><ProjectItemView item={item}  isLogin={isLogin} navigation={navigation} likeClick={this._likeClick} />}
                    keyExtractor={ (item, index) => index}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached}
                    refreshing={refreshing}
                    onRefresh={this._renderRefresh}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    textWarpper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
   
})



const mapStateToProps = (state,ownProps) => ({
    isSucc: state.project.isSucc,
    datas: state.project.datas,
    backgroundColor:state.theme.color,
    isEnd:state.project.isEnd,
    likeAction:state.project.likeAction,
    refreshing:state.project.refreshing
})

const mapDispatchToProps = (dispatch) => ({
    projectAddCollectInSite: (id,index,bool)=>dispatch(projectActions.projectAddCollectInSite(id,index,bool)),
    projectCancelCollectInArticle :(id,index) =>dispatch(projectActions.projectCancelCollectInArticle(id,index)),
    getProjectList: (page) => dispatch(projectActions.getProjectList(page)),
    changeLikeAction:() =>dispatch(projectActions.changeLikeAction())
})




export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)

