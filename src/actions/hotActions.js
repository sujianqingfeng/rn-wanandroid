import {createAction} from 'redux-actions'


import HttpUtil from '../utils/HttpUtil'
import  * as hotTypes from '../constants/hotTypes'




function getHotKeyword(){

    return dispatch=>{
        HttpUtil.get('/hotkey/json')
        .then(res=>dispatch(createAction(hotTypes.FETCH_HOT_DONE)(res.data)))
    }
}


function getFriendSite(){


    return dispatch=>{
        HttpUtil.get('/friend/json')
        .then(res=>dispatch(createAction(hotTypes.FETCH_FRIEND_DONE)(res.data)))
    }
}


export{
    getHotKeyword,
    getFriendSite
}