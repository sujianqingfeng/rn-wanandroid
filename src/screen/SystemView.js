import React from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableNativeFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


import * as systemActions from '../actions/systemActons'



class SystemView extends React.Component {


    componentWillMount() {
        let _that = this
        _that.props.getSystemList()
    }


    _rederChildrenView = (item, index) => (
        <Text key={item.id} style={styles.childrenText}>{item.name}</Text>
    )

    _itemClick(item){
        this.props.navigation.navigate('system_datail',item)
    }

    _rederItem = (({ item }) => (
        <TouchableNativeFeedback  onPress={()=>this._itemClick(item)}>

            <View style={styles.itemWarpper}>
                <View style={styles.textWarpper}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <View style={styles.childrenWarpper}>
                        {item.children.map((item, index) => this._rederChildrenView(item, index))}
                    </View>
                </View>
                <Icon style={styles.icon} name='ios-arrow-forward' size={20} color='grey' />
            </View>
        </TouchableNativeFeedback>

    ))


    _renderItemSeparatorComponent = ({ highlighted }) => (
        <View style={{ height: 1 }}></View>
    )

    _keyExtractor = (item, index) => index;



    render() {

        const {datas,refreshing} = this.props
        return (
            <FlatList
                data={datas}
                renderItem={this._rederItem}
                ItemSeparatorComponent={this._renderItemSeparatorComponent}
                keyExtractor={this._keyExtractor}
                refreshing={refreshing}
            />
        )
    }


}



const styles = StyleSheet.create({

    itemWarpper: {
        margin: 8,

        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowRadius: 5,
        flexDirection: 'row',
    },
    textWarpper: {
        flex: 1,
    },
    childrenWarpper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginHorizontal: 8,
        color: 'grey',
        marginTop: 8,

    },
    childrenText: {
        marginLeft: 8,
        marginVertical: 8,
        fontSize: 10,
    },
    icon: {
        marginRight: 16,
    }


})


const mapState = (state) => ({
    isSucc: state.system.isSucc,
    datas: state.system.datas,
    refreshing:state.system.refreshing
})

const dispatchAction = (dispatch) => ({
    getSystemList: () => dispatch(systemActions.getSystemList())
})


export default connect(mapState, dispatchAction)(SystemView)