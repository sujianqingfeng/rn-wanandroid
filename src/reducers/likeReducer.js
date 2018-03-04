import { handleActions } from 'redux-actions'

import * as likeTypes from '../constants/likeTypes'



const defaultStatus = {
    datas: [],
    isSucc: false,
}



export default handleActions({
    [likeTypes.FETCH_LIKE_DONE]: {
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
                datas: datas
            }
        }
    },
    [likeTypes.FETCH_LIKE_DOING]: {
        next(state, action) {
            return {
                ...state,
                isSucc: false             
            }
        }
    },
    [likeTypes.FETCH_LIKE_ERROR]: {
        next(state, action) {
            return {
                ...state,
                isSucc: false
            }
        }
    },

    [likeTypes.FETCH_LIKE_CANCEL_IN_MY_DONE]: {
        next(state, action) {
            const {index} = action.payload
            let newDatas = Object.assign([],state.datas)
            newDatas.splice(index,1)
            return {
                ...state,
                datas:newDatas,
            }
        }
    },


}, defaultStatus)