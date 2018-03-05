import React from "react"
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
    Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
import Carousel from 'react-native-banner-carousel'
import { connect } from 'react-redux'
import PropTypes from "prop-types"

const BannerWidth = Dimensions.get("window").width
const BannerHeight = 260

class BannerView extends React.PureComponent {

    static PropTypes = {
        banners: PropTypes.array.isRequired,
        navigation: PropTypes.object.isRequired,
    }



    _renderPage(image, index) {

        const { navigation, isLogin, themeColor } = this.props
        const params = { ...image, isLogin: isLogin }

        return (
            <TouchableNativeFeedback key={index} onPress={() => navigation.navigate("article_detail", params)}>
                <View style={{ borderRadius: 5 }}>
                    <Image style={{ width: BannerWidth - 16, height: BannerHeight, borderRadius: 5 }} source={{ uri: image.imagePath }} />
                    <View style={styles.textWarpper}>
                        <Text style={styles.text}>{image.title}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }


    render() {

        const { banners,themeColor } = this.props

        return (
            <View style={{ margin: 8, borderRadius: 5, }}>
                <Carousel
                    activePageIndicatorStyle={{ backgroundColor: themeColor }}
                    pageIndicatorStyle={{ backgroundColor: 'white' }}
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth - 16}>
                    {banners[0] ? banners.map((image, index) => this._renderPage(image, index)) : <View></View>}
                </Carousel>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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


const mapState = state => ({
    themeColor: state.theme.color,
    isLogin:state.user.isLogin
});


export default connect(mapState)(BannerView)



