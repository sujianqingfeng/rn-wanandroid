import React from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Image,
    TouchableNativeFeedback
} from 'react-native'


import Icon from 'react-native-vector-icons/Ionicons'

const WidthWidth = Dimensions.get('window').width;


import * as projectActions from '../actions/projectActions'


class ProjectView extends React.Component {

    constructor(props) {
        super(props)
        console.log(8888888888)
        console.log(this.state)
        this.state = {
            page: 0,
            dataArray: [],
            refreshing: false,
            clickIndex:0
        }
    }

    componentWillMount() {
        this.props.getProjectList(this.state.page)
    }


    componentWillReceiveProps(props) {
      
        let array = []

        this.setState({
           
            refreshing: false,
        })
    }


    changeIcon = (index,bool)=>{
        let dataArray = this.state.dataArray
        dataArray[index]['collect']= bool

        console.log(dataArray)
        this.setState({dataArray:dataArray})
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
            this.props.getProjectList(page)
        }
    }

    // 下拉刷新
    _renderRefresh = () => {
        this.setState({
            refreshing: true,
            page: 0,
            dataArray: []
        })
        this.props.getProjectList(0)
    };


    _goToDetail = (item)=>{
        const {navigation,isLogin} = this.props
        const params = {...item,isLogin:isLogin}
        navigation.navigate("article_detail", params)
    }

    _likeClick = (item,index)=>{

        const {isLogin,message} = this.props

        if(!isLogin){
            message('请，没有登录')
            return
        }

        if(item.collect){

        }else{
            this.props.projectAddCollectInSite(item.id,index,true)
        }
    }


    _renderItem = ({ item,index }) => (
        <TouchableNativeFeedback onPress={()=>this._goToDetail(item)}>
            <View style={styles.itemWarpper}>
                <View>
                    <Image style={{ width: 100, height: 180 }} source={{ uri: item.envelopePic }} />
                </View>

                <View style={styles.itemContentWarpper}>

                    <View style={styles.titleWarpper}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                        <Text style={styles.desc} numberOfLines={5} ellipsizeMode='tail' >{item.desc}</Text>
                    </View>


                    <View style={styles.bottomWarpper}>
                        <View style={styles.infoWarpper}>
                            <Text>{item.author}</Text>
                            <Text>{item.niceDate + item.collect}</Text>
                        </View>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("rgba(52,52,52,0.5)", true)}
                        onPress={()=>this._likeClick(item,index)}>
                            <View style={styles.likeWarpper}>
                                <Icon
                                    style={{ marginHorizontal: 8 }}
                                    name={item.collect?'md-heart':'md-heart-outline'}
                                    size={30}
                                    color='#e91e63'
                                    backgroundColor='#00000000' />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>

            </View>
        </TouchableNativeFeedback>
    )

  
 
    render() {
        return (
            <View style={styles.textWarpper}>
                <FlatList
                    data={this.props.datas}
                    renderItem={this._renderItem}
                    keyExtractor={ (item, index) => index}
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

    textWarpper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemWarpper: {
        flexDirection: 'row',
        height: 180,
        width: WidthWidth - 16,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 8,
    },
    itemContentWarpper: {
        marginHorizontal: 16,
        marginVertical: 8,
        width: WidthWidth - 148,
    },
    titleWarpper: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    desc: {
    },
    bottomWarpper: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    infoWarpper: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    likeWarpper: {
        alignSelf: 'flex-end',
    }
})



const mapStateToProps = (state,ownProps) => ({
    isSucc: state.project.isSucc,
    datas: state.project.datas,
    status:state.project.status
})

const mapDispatchToProps = (dispatch) => ({
    projectAddCollectInSite: (id,index,bool)=>dispatch(projectActions.postAddCollectInSite(id,index,bool)),
    getProjectList: (page) => dispatch(projectActions.getProjectList(page)),
    changeIcon : (index,bool)=>dispatch(projectActions.changeIcon(index,bool))
})




export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)

