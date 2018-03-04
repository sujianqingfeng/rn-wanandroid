import  * as likeTypes from '../constants/likeTypes'
import HttpUtil from '../utils/HttpUtil'
import {createAction} from 'redux-actions'

function getLikeList(page){

    return dispatch=>{
        dispatch(createAction(likeTypes.FETCH_LIKE_DOING)())
        HttpUtil.get('/lg/collect/list/'+page+'/json')
        .then(res=>dispatch(createAction(likeTypes.FETCH_LIKE_DONE)(res.data)))
        .catch(error=>dispatch(createAction(likeTypes.FETCH_LIKE_ERROR)()))
    }
}


function likeCancelCollectInMy(id,originId,index) {
    return dispatch => {
      HttpUtil.post("/lg/uncollect/" + id + "/json",{originId:originId})
      .then(res =>
        dispatch(createAction(likeTypes.FETCH_LIKE_CANCEL_IN_MY_DONE)({index:index}))
      );
    };
  }


export{
    getLikeList,
    likeCancelCollectInMy
}
