
import { createAction } from 'redux-actions';


import * as systemTypes from '../constants/systemTypes'
import HttpUtil from '../utils/HttpUtil'


function getSystemList(){

    return dispatch =>{
        HttpUtil.get('/tree/json')
        .then(res=> dispatch(createAction(systemTypes.FETCH_SYSTEM_LIST_DONE)(res.data)))
    }

}


export {
    getSystemList
}