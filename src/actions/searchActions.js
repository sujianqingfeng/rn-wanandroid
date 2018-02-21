import {createAction} from 'redux-actions'


import HttpUtil from '../utils/HttpUtil'
import  * as searchTypes from '../constants/searchTypes'




function getSearchResult(page,k){

    return dispatch=>{
        HttpUtil.post('/article/query/'+page+'/json',{
            k:k
        })
        .then(res=>dispatch(createAction(searchTypes.FETCH_SEARCH_DONE)(res.data)))
    }


}


export{
    getSearchResult
}