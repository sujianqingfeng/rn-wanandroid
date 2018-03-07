import React, { Component } from 'react'
import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/Ionicons"

import RealmUtil from '../utils/RealmUtil'
import * as userActions from '../actions/userActions'
const winheight = Dimensions.get('window').height

class UserDrawer extends Component {



    _iconClick = () => {
        const {isLogin,navigation,changeLoginState} = this.props
        if(isLogin){
            Alert.alert(
                '提示',
                '你确定要注销账号么？',
                [
                   
                    { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: '确定', onPress: () => {RealmUtil.saveCookie('');changeLoginState} },
                ],
                { cancelable: true }
            )
        }else{
            navigation.navigate('login')
        }

       
    }


    render() {

        const { themeColor } = this.props

        return (
            <View style={styles.contentWarpper}>

                <View style={[styles.header, { backgroundColor: themeColor }]}>
                <TouchableNativeFeedback
                    onPress={this._iconClick}>

                   <Image
                       
                        resizeMode='cover'
                        style={styles.icon}
                        source={require('./../../res/images/background_draw.jpeg')}
                    />
                </TouchableNativeFeedback>
                    

                    <Text style={styles.headerText}>素笺淡墨染流年</Text>

                </View>



                <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('login')}>

                    <View style={styles.item}>
                        <Icon
                            name='md-person'
                            size={30} color={themeColor} />

                        <Text style={styles.itemText}>登陆/注册</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('theme')}>


                    <View style={styles.item}>
                        <Icon
                            name='md-color-palette'
                            size={30} color={themeColor} />
                        <Text style={styles.itemText}>主题</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    onPress={() => this.props.navigation.navigate('about')}>
                    <View style={styles.item}>
                        <Icon
                            name='md-pricetag'
                            size={30} color={themeColor} />

                        <Text style={styles.itemText}>关于</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

}


const styles = StyleSheet.create({


    contentWarpper: {
        flex: 1,
        backgroundColor: 'rgba(52,52,52,0.1)',
    },
    header: {
        height: winheight * 0.3,
        backgroundColor: "#e91e63",
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
    },
    headerText: {
        color: 'white',
        marginTop: 4,
        fontSize: 20
    },
    item: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 1,
        height: 50,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 260
    },
    itemText: {
        fontSize: 15,
        marginLeft: 16,
    }


})





const mapStateToProps = (state) => ({
    themeColor: state.theme.color,
    isLogin:state.user.isLogin
})




const mapDispatchToProps = (dispatch) => ({
    changeLoginState:(bool) =>dispatch(userActions.changeLoginState(bool))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserDrawer)
