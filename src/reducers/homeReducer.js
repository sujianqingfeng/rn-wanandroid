import * as homeTypes from '../constants/homeTypes';

import { handleActions, handleAction } from 'redux-actions';


const defaultStatus = {
    datas: [],
    banners: [],
    isSucc: false,
    isEnd:false,
    refreshing:false
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

            if(data.curPage ==1){
                datas = data.datas
            }else{
                datas = [...datas,...data.datas]
            }

            let isEnd =  data.curPage>data.pageCount

            return {
                ...state,
                isSucc: true,
                isEnd:isEnd,
                refreshing:false,
                datas: datas
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

    }
}, defaultStatus)