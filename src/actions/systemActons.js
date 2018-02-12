
import { createAction } from 'redux-actions';


import * as systemTypes from '../constants/systemTypes'
import HttpUtil from '../utils/HttpUtil'


function getSystemList(){

    return dispatch =>{
        HttpUtil.get('/tree/json')
        .then(res=> dispatch(createAction(systemTypes.FETCH_SYSTEM_LIST_DONE)(res.data)))
    }

}



function getSystemDetailList(page,id){
    return dispatch=>{
        HttpUtil.get('/article/list/'+page+'/json?cid='+id)
        .then(res=>dispatch(createAction(systemTypes.FETCH_SYSTEM_DETAIL_LIST_DONE)(res.data)))
    }
}


export {
    getSystemList,
    getSystemDetailList
}