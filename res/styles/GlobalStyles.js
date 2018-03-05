import {
    Dimensions,
    StyleSheet
} from 'react-native'

const {height, width} = Dimensions.get('window')




export default  StyleSheet.create({
    toast:{
        width: width,
        position: "absolute",
        left: 0,
        top: 0
    }
})