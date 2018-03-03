import {createAction} from 'redux-actions'


import HttpUtil from '../utils/HttpUtil'
import  * as projectTypes from '../constants/projectTypes'


function getProjectList(page){
    return dispatch=>{
        HttpUtil.get('/article/list/'+page+'/json?cid=294')
        .then(res=>dispatch(createAction(projectTypes.FETCH_PROJECT_LIST_DONE)(res.data)))
    }
}

function postAddCollectInSite(id,index,bool) {
    return dispatch => {
      dispatch(createAction(projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DOING)());
      HttpUtil.post("/lg/collect/" + id + "/json", { id: id })
      .then(res =>dispatch(createAction(projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DONE)({index:index,bool:bool})))
      .catch(e=>{console.log('发生了错误',e)})
    };
  }

function changeIcon(index,bool){
    return dispatch=>dispatch(createAction(projectTypes.CHANGE_ICON)({index:index,bool:bool}))
}

export{
    getProjectList,
    changeIcon,
    postAddCollectInSite
}