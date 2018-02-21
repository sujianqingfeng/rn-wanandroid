import {createAction} from 'redux-actions'


import HttpUtil from '../utils/HttpUtil'
import  * as likeTypes from '../constants/likeTypes'




function getLikeList(page){

    return dispatch=>{
        HttpUtil.get('/lg/collect/list/'+page+'/json')
        .then(res=>dispatch(createAction(likeTypes.FETCH_LIKE_DONE)(res.data)))
    }
}





export{
    getLikeList
}