import {
    handleActions
} from 'redux-actions'

import * as systemTypes from '../constants/systemTypes'


const defaultStatus = {
    data: null,
    isSucc: false
}


export default handleActions({
    [systemTypes.FETCH_SYSTEM_LIST_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                data: action.payload
            }
        }
    }
}, defaultStatus)