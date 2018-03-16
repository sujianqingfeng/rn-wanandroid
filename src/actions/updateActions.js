import {createAction} from 'redux-actions'


import HttpUtil from '../utils/HttpUtil'
import  * as updateTypes from '../constants/updateTypes'




function updateApp(){

    return dispatch=>{
        HttpUtil.get('https://raw.githubusercontent.com/sujianqingfeng/rn-wanandroid/master/updateInfo.json')
        .then(res=>dispatch(createAction(updateTypes.FETCH_UPDATE_DONE)(res.data)))
    }
}



export{
    updateApp
}