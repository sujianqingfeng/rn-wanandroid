import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
const windowWidth = Dimensions.get('window').width


export default class ArticleItemView extends React.PureComponent {

    static PropTypes = {
        item: PropTypes.object.isRequired,
        hide: PropTypes.bool.isRequired,
        navigation:PropTypes.object.isRequired
    }

    render() {
        const { hide } = this.props
        const { item } = this.props.item
        return (
            
            <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate('article_detail',item)}>

                <View style={styles.itemView}>
                    {
                        hide ?
                            <View></View> :
                            <View style={[styles.chapterWarpper]}>
                                <Text style={styles.chapterText}>{item.chapterName}</Text>
                            </View>
                    }

                    <View style={{ flex: 1 }}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail' >{item.title}</Text>
                        <View style={styles.info}>

                            <Text style={styles.author}>{item.author}</Text>
                            <Text style={styles.niceDate}>{item.niceDate}</Text>
                        </View>
                    </View>
                    <View>
                        <Icon
                            style={{ marginHorizontal: 16 }}
                            name='md-heart-outline'
                            size={30}
                            color='#e91e63'
                            backgroundColor='#00000000' />
                    </View>
                </View>

            </TouchableNativeFeedback>

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
    },
    textWarpper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: windowWidth,
        width: windowWidth - 16,
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