import React from 'react'
import { Modal, Text, TouchableNativeFeedback, View, Dimensions, StyleSheet } from 'react-native'
import PropTypes from "prop-types"
import { connect } from 'react-redux'

let SCREEN_WIDTH = Dimensions.get('window').width;//宽
let SCREEN_HEIGHT = Dimensions.get('window').height;//高

class ModalDialog extends React.Component {
    // 构造
    constructor(props) {
        super(props);
    }

    static propTypes = {
        _dialogTitle: PropTypes.string, //标题
        _dialogContent: PropTypes.string, //内容
        _dialogLeftBtnTitle: PropTypes.string,    //左按键标题
        _dialogRightBtnTitle: PropTypes.string,   //右按键标题
        _dialogLeftBtnAction: PropTypes.func.isRequired,  //左点击方法
        _dialogRightBtnAction: PropTypes.func.isRequired, //右点击方法
        _dialogVisible: PropTypes.bool,       //显示还是隐藏
    }

    static defaultProps = {
        _dialogTitle: '温馨提示',
        _dialogContent: '是否退出',
        _dialogLeftBtnTitle: '取消',
        _dialogRightBtnTitle: '确定',
        _dialogVisible: false,
    }

    render() {
        // onPress事件直接与父组件传递进来的属性挂接
        return (
            <Modal
                visible={this.props._dialogVisible}
                transparent={true}
                onRequestClose={() => { }} //如果是Android设备 必须有此方法
            >
                <View style={styles.bg}>
                    <View style={styles.dialog}>
                        {/* <View style={styles.dialogTitleView}>
                            <Text style={styles.dialogTitle}>
                                {this.props._dialogTitle}
                            </Text>
                        </View> */}
                        <View style={styles.dialogContentView}>
                            <Text style={styles.dialogContent}>
                                {this.props._dialogContent}
                            </Text>
                        </View>

                        <View style={styles.dialogBtnView}>
                            <TouchableNativeFeedback onPress={this.props._dialogLeftBtnAction}>
                                <View style={{margin:8}}>
                                    <Text style={[styles.leftButton, { color: this.props.themeColor }]}>
                                        {this.props._dialogLeftBtnTitle}
                                    </Text>
                                </View>

                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback onPress={this.props._dialogRightBtnAction}>
                                <View style={{margin:8}}>
                                    <Text style={[styles.rightButton, { color: this.props.themeColor }]}>
                                        {this.props._dialogRightBtnTitle}
                                    </Text>
                                </View>

                            </TouchableNativeFeedback>
                        </View>

                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    bg: {  
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        width: SCREEN_WIDTH * 0.8,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    dialogTitleView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    dialogTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
    },
    dialogContentView: {
        width: SCREEN_WIDTH * 0.8,
        alignItems: 'flex-start',
    },
    dialogContent: {
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        color: '#4A4A4A',
    },
    dialogBtnView: {
        width: SCREEN_WIDTH * 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    dialogBtnViewItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftButton: {
        fontSize: 16,
        margin: 8,
    },
    rightButton: {
        fontSize: 16,
        margin: 8,
    }
});



const mapStateToProps = (state) => ({
    themeColor: state.theme.color,
})



export default connect(mapStateToProps)(ModalDialog)
