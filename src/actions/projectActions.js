import {createAction} from 'redux-actions'


import HttpUtil from '../utils/HttpUtil'
import  * as projectTypes from '../constants/projectTypes'


function getProjectList(page){

    return dispatch=>{
        HttpUtil.get('/article/list/'+page+'/json?cid=294')
        .then(res=>dispatch(createAction(projectTypes.FETCH_PROJECT_LIST_DONE)(res.data)))
    }
}

function changeIcon(index,bool){
    return dispatch=>dispatch(createAction(projectTypes.CHANGE_ICON)({index:index,bool:bool}))
}

export{
    getProjectList,
    changeIcon
}