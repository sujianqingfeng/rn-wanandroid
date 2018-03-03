import * as homeTypes from '../constants/homeTypes';

import { handleActions, handleAction } from 'redux-actions';


const defaultStatus = {
    datas: [],
    banners: [],
    isSucc: false,
    isEnd:false,
    refreshing:false,
    likeAction:0
}


export default handleActions({
    [homeTypes.FETCH_HOME_LIST_DOING]: {

        next(state, action) {
            return {
                ...state,
                isSucc: false,
                refreshing:true
            }
        }

    },
    [homeTypes.FETCH_HOME_LIST_DONE]: {
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
                isEnd:isEnd,
                refreshing:false,
                datas: datas,
                likeAction:likeAction
            }
        }

    },
    [homeTypes.FETCH_HOME_BANNER_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                banners: action.payload
            }
        }

    },
    [homeTypes.FETCH_HOME_ADD_IN_SITE_DONE]: {
        next(state, action) {
            const {index} = action.payload
            let datas = JSON.parse(JSON.stringify(state.datas))
            datas[index]['collect'] = true
            return {
                ...state,
                datas:datas,
                likeAction:1
            }
        }
    },
    [homeTypes.FETCH_HOME_CANCEL_IN_ARTICLE_DONE]: {
        next(state, action) {
            const {index} = action.payload
            let datas = JSON.parse(JSON.stringify(state.datas))
            datas[index]['collect'] = false
            return {
                ...state,
                datas:datas,
                likeAction:2
            }
        }
    }
}, defaultStatus)