import { handleActions } from 'redux-actions'

import * as likeTypes from '../constants/likeTypes'



const defaultStatus = {
    data: [],
    isSucc: false,
}



export default handleActions({
    [likeTypes.FETCH_LIKE_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                data: action.payload
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


}, defaultStatus)