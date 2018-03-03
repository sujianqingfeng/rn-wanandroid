import { handleActions } from 'redux-actions'

import * as projectTypes from '../constants/projectTypes'

const defaultStatus = {
    datas: [],
    isSucc: false,
    isAddInSite: false,
    status:''
}

export default handleActions({
    [projectTypes.FETCH_PROJECT_LIST_DONE]: {
        next(state, action) {
            const data = action.payload
            let datas = state.datas

            if(data.curPage ==1){
                datas = data.datas
            }else{
                datas = [...datas,...data.datas]
            }

            return {
                ...state,
                isSucc: true,
                datas: datas,
                status:projectTypes.FETCH_PROJECT_LIST_DONE
            }
        }
    },
    [projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DONE]: {
        next(state, action) {
            const {index,bool} = action.payload
            let datas = JSON.parse(JSON.stringify(state.datas))
            datas[index]['collect'] = bool
            return {
                ...state,
                datas:datas,
                status:projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DONE
            }
        }
    },
    [projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DOING]:{
        next(state,action){
            return {
                ...state,
                status:projectTypes.FETCH_PEOJECT_ADD_IN_SITE_DOING
            }
        }
    }

}, defaultStatus)