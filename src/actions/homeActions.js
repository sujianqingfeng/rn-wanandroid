import * as homeTypes from '../constants/homeTypes'

import { createAction } from 'redux-actions';


import  HttpUtil from '../utils/HttpUtil'



function getHome(num) {


    return dispatch => {
        dispatch(createAction(homeTypes.FETCH_HOME_LIST_DOING)())

        let result = HttpUtil.get('/article/list/'+num+'/json')
        .then(res=>{
            dispatch(createAction(homeTypes.FETCH_HOME_LIST_DONE)(res.data))
        })
        .catch(e=>{
            dispatch(createAction(homeTypes.FETCH_HOME_LIST_ERROR)(e))
        })
    }
}

function getHomeBanner(){
    return dispatch =>{
        HttpUtil.get('/banner/json')
        .then(res=>dispatch(createAction(homeTypes.FETCH_HOME_BANNER_DONE)(res.data)))
    }
}

export {
    getHome,
    getHomeBanner
}
