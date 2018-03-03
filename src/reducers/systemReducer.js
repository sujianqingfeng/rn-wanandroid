import {
    handleActions
} from 'redux-actions'

import * as systemTypes from '../constants/systemTypes'


const defaultStatus = {
    datas: [],
    isSucc: false,
    detail:null,
    refreshing:false,
}


export default handleActions({
    [systemTypes.FETCH_SYSTEM_LIST_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                datas: action.payload,
                refreshing:false
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_LIST_DOING]: {
        next(state, action) {
            return {
                ...state,
                isSucc: false,
                refreshing:true
            }
        }
    },
    [systemTypes.FETCH_SYSTEM_DETAIL_LIST_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                detail: action.payload
            }
        }
    }
}, defaultStatus)