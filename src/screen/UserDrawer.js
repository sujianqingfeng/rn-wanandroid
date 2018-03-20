import React, { Component } from 'react'
import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    Alert,
    
} from 'react-native'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/Ionicons"
import Toast, { DURATION } from 'react-native-easy-toast'


import RealmUtil from '../utils/RealmUtil'
import * as userActions from '../actions/userActions'
import * as updateActions from '../actions/updateActions'
import GlobalStyles from '../../res/styles/GlobalStyles'
import ModalDialog  from './ModalDialog'

const winheight = Dimensions.get('window').height

class UserDrawer extends Component {


    constructor(props){
        super(props)
        this.state = {
            dialogShow:false,
            dialogText:''
        }
    }

    componentWillReceiveProps = (nextProps)=>{
       
        if(nextProps.isUpdate){
            this.setState({
                dialogShow:true,
                dialogAction:1,
                dialogText:nextProps.updateContent
            })
        }
            
    }

    _iconClick = () => {
        const {isLogin,navigation,changeLoginState} = this.props
        if(isLogin){
            this.setState({
                dialogShow:true,
                dialogAction:0,
                dialogText:'你确定要注销账号么？'
            })
        }else{
            navigation.navigate('login')
        }
    }


    _dialogCancel =()=>{
        this.setState({dialogShow:false})
    }


    _dialogConfirm =()=>{
        const {dialogAction}= this.state
        const {changeLoginState} = this.props

        if(dialogAction==0){
            RealmUtil.saveCookie('')
            changeLoginState(false)
        }
        this.setState({dialogShow:false})
    }


    render() {

        const { themeColor } = this.props
        const {dialogShow,dialogText} = this.state

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
                    onPress={() => this.props.updateApp()}>
                    <View style={styles.item}>
                        <Icon
                            name='md-cloud-download'
                            size={30} color={themeColor} />

                        <Text style={styles.itemText}>检测更新</Text>
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

                <View style={GlobalStyles.toast}>
                  <Toast ref="toast" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
                </View>


                <ModalDialog
                    _dialogContent = {dialogText}
                    _dialogVisible={dialogShow}
                    _dialogLeftBtnAction={this._dialogCancel}
                    _dialogRightBtnAction={this._dialogConfirm}
                    />

                    

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
    isLogin:state.user.isLogin,
    isUpdate:state.update.isUpdate,
    updateContent:state.update.content
})


const mapDispatchToProps = (dispatch) => ({
    changeLoginState:(bool) =>dispatch(userActions.changeLoginState(bool)),
    updateApp:()=>dispatch(updateActions.updateApp())
})

export default connect(mapStateToProps,mapDispatchToProps)(UserDrawer)
