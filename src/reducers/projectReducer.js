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
    }

}, defaultStatus)