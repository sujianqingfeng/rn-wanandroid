import { handleActions } from 'redux-actions'

import * as projectTypes from '../constants/projectTypes'

const defaultStatus = {
    datas: [],
    isSucc: false,
    isEnd:false,
    likeAction:0,
    refreshing:false,
}

export default handleActions({
    [projectTypes.FETCH_PROJECT_LIST_DONE]: {
        next(state, action) {
            const data = action.payload
            let datas = state.datas
            let likeAction = state.likeAction

            if(data.curPage ==1){
                datas = data.datas
                likeAction=0
            }else{
                datas = [...datas,...data.datas]
            }

            let isEnd =  data.curPage>data.pageCount
            return {
                ...state,
                isSucc: true,
                refreshing:false,
                datas: datas,
                isEnd,
                likeAction
            }
        }
    },
    [projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DONE]: {
        next(state, action) {
            const {index,bool} = action.payload
            let datas = [...state.datas]
            datas[index]['collect'] = bool
            return {
                ...state,
                datas:datas,
                likeAction:1
            }
        }
    },
    [projectTypes.FETCH_PROJECT_CANCEL_IN_ARTICLE_DONE]: {
        next(state, action) {
            const {index} = action.payload
            let datas = [...state.datas]
            datas[index]['collect'] = false
            return {
                ...state,
                datas:datas,
                likeAction:2
            }
        }
    },
    [projectTypes.FETCH_PROJECT_LIST_DOING]:{
        next(state,action){
            return {
                ...state,
                refreshing:true
            }
        }
    },
    [projectTypes.CHANGE_LIKE_ACTION]:{
        next(state,action){
            return {
                ...state,
                likeAction:0
            }
        }
    },
    [projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DOING]:{
        next(state,action){
            return {
                ...state
            }
        }
    }

}, defaultStatus)