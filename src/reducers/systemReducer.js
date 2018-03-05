import {
    handleActions
} from 'redux-actions'

import * as systemTypes from '../constants/systemTypes'


const defaultStatus = {
    datas: [],
    isSucc: false,
    details: {},
    refreshing: false,
    likeAction: 0,
    detailRefreshing: false,
}


export default handleActions({
    [systemTypes.FETCH_SYSTEM_LIST_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                datas: action.payload,
                refreshing: false
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_LIST_DOING]: {
        next(state, action) {
            return {
                ...state,
                isSucc: false,
                refreshing: true
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_DETAIL_LIST_DONE]: {
        next(state, action) {

            const data = action.payload
            const datas = data.datas
            const id = data.id

            let details = { ...state.details }
            let likeAction = state.likeAction
            let isEnd = data.curPage >= data.pageCount

            let detail = {}

            if (data.curPage == 1) {
                detail = { ...detail, id, isEnd, datas }
            }else {
                let oldDatas = details[id].datas
                let newDatas = [...oldDatas, ...datas]
                detail = { ...detail, id, isEnd, datas: newDatas }
            }

            details[id] = detail
            return {
                ...state,
                isSucc: true,
                details: details,
                detailRefreshing: false,
                likeAction: likeAction
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_DETAIL_LIST_DOING]: {
        next(state, action) {
            return {
                ...state,
                detailRefreshing: true
            }
        }
    },

    [systemTypes.FETCH_SYSTEM_ADD_IN_SITE_DONE]: {
        next(state, action) {
            const { index,cid } = action.payload
          
            let details = JSON.parse(JSON.stringify(state.details))
            // let details = {...state.details}  // 浅拷贝不行　要用深拷贝
            details[cid].datas[index]['collect'] = true
           
            return {
                ...state,
                details: details,
                likeAction: 1
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_CANCEL_IN_ARTICLE_DONE]: {
        next(state, action) {
            const { index,cid } = action.payload
            let details = JSON.parse(JSON.stringify(state.details))
            details[cid].datas[index]['collect'] = false
            return {
                ...state,
                details: details,
                likeAction: 2
            }
        }
    }
}, defaultStatus)