import { handleActions } from 'redux-actions'

import * as projectTypes from '../constants/projectTypes'

const defaultStatus = {
    data: null,
    isSucc: false
}

export default handleActions({
    [projectTypes.FETCH_PROJECT_LIST_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                data: action.payload
            }
        }
    },
    [projectTypes.CHANGE_ICON]: {
        next(state, action) {
            const {index,bool} = action.payload
            let {data} = state
            data.datas[index]['collect'] = bool

            console.log(data)
            return {
                ...state,
                data:data
            }
        }
    }

}, defaultStatus)