import {createAction} from 'redux-actions'


import HttpUtil from '../utils/HttpUtil'
import  * as projectTypes from '../constants/projectTypes'



function getProjectList(page){
    return dispatch=>{
        dispatch(createAction(projectTypes.FETCH_PROJECT_LIST_DOING)())
        HttpUtil.get('/article/list/'+page+'/json?cid=294')
        .then(res=>dispatch(createAction(projectTypes.FETCH_PROJECT_LIST_DONE)(res.data)))
    }
}

function projectAddCollectInSite(id,index,bool) {
    return dispatch => {
      dispatch(createAction(projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DOING)());
      HttpUtil.post("/lg/collect/" + id + "/json", { id: id })
      .then(res =>dispatch(createAction(projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DONE)({index:index,bool:bool})))
      .catch(e=>{console.log('发生了错误',e)})
    }
  }


function projectCancelCollectInArticle(id,index) {
    return dispatch => {
      HttpUtil.post("/lg/uncollect_originId/" + id + "/json")
      .then(res =>dispatch(createAction(projectTypes.FETCH_PROJECT_CANCEL_IN_ARTICLE_DONE)({index})));
    }
}
  
const changeLikeAction = () => (dispatch =>dispatch(createAction(projectTypes.CHANGE_LIKE_ACTION)()))



export{
    getProjectList,
    projectAddCollectInSite,
    projectCancelCollectInArticle,
    changeLikeAction
}