import React from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Image
} from 'react-native'


import Icon from 'react-native-vector-icons/Ionicons'

const WidthWidth = Dimensions.get('window').width;


import * as projectActions from '../actions/projectActions'


class ProjectView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            dataArray: [],
            refreshing: false,
        }
    }

    componentWillMount() {
        this.props.getProjectList(this.state.page)
    }

  


    componentWillReceiveProps(props) {
        let array = []

        if (props.data) {
            array = this.state.dataArray.concat(props.data.datas)

            if (this.state.page == 0) {
                array = props.data.datas
            }
        }

        this.setState({
            dataArray: array,
            refreshing: false,
        })
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


    _renderItem = ({ item }) => (
        <View style={styles.itemWarpper}>
            <View>
                <Image style={{width:100,height:180}} source={{ uri: item.envelopePic }} />
            </View>

            <View style={styles.itemContentWarpper}>

                <View style={styles.titleWarpper}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                    <Text style={styles.desc} numberOfLines={5} ellipsizeMode='tail' >{item.desc}</Text>
                </View>
              

                <View style={styles.bottomWarpper}>
                    <View style={styles.infoWarpper}>
                        <Text>{item.author}</Text>
                        <Text>{item.niceDate}</Text>
                    </View>
                    <View style={styles.likeWarpper}>
                        <Icon
                            style={{ marginHorizontal: 8 }}
                            name='md-heart-outline'
                            size={30}
                            color='#e91e63'
                            backgroundColor='#00000000' />
                    </View>
                </View>
            </View>

        </View>
    )

    _keyExtractor = (item, index) => index

    _renderItemSeparatorComponent = ({ highlighted }) => (
        <View style={{ height: 1, backgroundColor: '#000' }}></View>
    )

    render() {

        return (
            <View style={styles.textWarpper}>

                 <FlatList
                    data={this.state.dataArray}
                    renderItem={this._renderItem}
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

    textWarpper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemWarpper: {
        flexDirection: 'row',
        height: 180,
        width: WidthWidth-16,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 8,
    },
    itemContentWarpper:{
        marginHorizontal:16,
        marginVertical:8,
        width: WidthWidth-148,
    },
    titleWarpper:{
        flex: 1,
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    desc:{
    },
    bottomWarpper:{
        flexDirection: 'row',
        marginVertical: 8,
    },
    infoWarpper:{
        flex:1,
        alignSelf: 'flex-start'
    },
    likeWarpper:{
        alignSelf: 'flex-end',
    }
})



const mapState = (state) => ({
    isSucc: state.project.isSucc,
    data: state.project.data
})

const dispatchAction = (dispatch) => ({
    getProjectList: (page) => dispatch(projectActions.getProjectList(page))
})




export default connect(mapState, dispatchAction)(ProjectView)

