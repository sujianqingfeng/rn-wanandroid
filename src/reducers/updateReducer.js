import { handleActions } from 'redux-actions'

import * as updateTypes from '../constants/updateTypes'



const defaultStatus = {
    data: [],
    isSucc: false
}



export default handleActions({
    [updateTypes.FETCH_UPDATE_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                data: action.payload
            }
        }
    }
}, defaultStatus)