
import { createAction } from 'redux-actions';


import * as systemTypes from '../constants/systemTypes'
import HttpUtil from '../utils/HttpUtil'


function getSystemList(){

    return dispatch =>{
        dispatch(createAction(systemTypes.FETCH_SYSTEM_LIST_DOING)())
        HttpUtil.get('/tree/json')
        .then(res=> dispatch(createAction(systemTypes.FETCH_SYSTEM_LIST_DONE)(res.data)))
    }

}


function getSystemDetailList(page,id){
    return dispatch=>{
        dispatch(createAction(systemTypes.FETCH_SYSTEM_DETAIL_LIST_DOING)())
        HttpUtil.get('/article/list/'+page+'/json?cid='+id)
        .then(res=>dispatch(createAction(systemTypes.FETCH_SYSTEM_DETAIL_LIST_DONE)({...res.data,id})))
    }
}



function systemAddCollectInSite(id,index,cid) {
    return dispatch => {
      HttpUtil.post("/lg/collect/" + id + "/json", { id: id })
      .then(res =>dispatch(createAction(systemTypes.FETCH_SYSTEM_ADD_IN_SITE_DONE)({index,cid})))
      .catch(e=>{})
    };
  }


  function systemCancelCollectInArticle(id,index,cid) {
    return dispatch => {
      HttpUtil.post("/lg/uncollect_originId/" + id + "/json")
      .then(res =>dispatch(createAction(systemTypes.FETCH_SYSTEM_CANCEL_IN_ARTICLE_DONE)({index,cid})));
    };
  }
  


export {
    getSystemList,
    getSystemDetailList,
    systemAddCollectInSite,
    systemCancelCollectInArticle
}