import * as homeTypes from '../constants/homeTypes'

import { createAction } from 'redux-actions';


import  HttpUtil from '../utils/HttpUtil'



function getHome(num) {
    return dispatch => {
        dispatch(createAction(homeTypes.FETCH_HOME_LIST_DOING)())
        let result = HttpUtil.get('/article/list/'+num+'/json')
        .then(res=>dispatch(createAction(homeTypes.FETCH_HOME_LIST_DONE)(res.data)))
        .catch(e=>dispatch(createAction(homeTypes.FETCH_HOME_LIST_ERROR)(e)))
    }
}

function getHomeBanner(){
    return dispatch =>{
        HttpUtil.get('/banner/json')
        .then(res=>dispatch(createAction(homeTypes.FETCH_HOME_BANNER_DONE)(res.data)))
    }
}


function homeAddCollectInSite(id,index) {
    return dispatch => {
      HttpUtil.post("/lg/collect/" + id + "/json", { id: id })
      .then(res =>dispatch(createAction(homeTypes.FETCH_HOME_ADD_IN_SITE_DONE)({index:index})))
      .catch(e=>{})
    };
  }


function homeCancelCollectInArticle(id,index) {
    return dispatch => {
      HttpUtil.post("/lg/uncollect_originId/" + id + "/json")
      .then(res =>dispatch(createAction(homeTypes.FETCH_HOME_CANCEL_IN_ARTICLE_DONE)({index:index})));
    }
}
  

const changeLikeAction = ()=>dispatch=>dispatch(createAction(homeTypes.CHANGE_HOME_LIKE_ACTION)())

export {
    getHome,
    getHomeBanner,
    homeAddCollectInSite,
    homeCancelCollectInArticle,
    changeLikeAction
}
