import { handleActions } from 'redux-actions'

import * as searchTypes from '../constants/searchTypes'



const defaultStatus = {
    data: null,
    isSucc: false
}



export default handleActions({
    [searchTypes.FETCH_SEARCH_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                data: action.payload
            }
        }
    }

}, defaultStatus)