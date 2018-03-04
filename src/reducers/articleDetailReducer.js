import { handleActions } from 'redux-actions'

import * as articleDetailTypes from '../constants/articleDetailTypes'



const defaultStatus = {
    isLike: false
}



export default handleActions({
    [articleDetailTypes.FETCH_DETAIL_ADD_IN_SITE_DONE]: {
        next(state, action) {
            return {
                ...state,
                isLike: true
            }
        }
    },
    [articleDetailTypes.FETCH_DETAIL_CANCEL_IN_ARTICLE_DONE]:{
        next(state,action){
            return {
                ...state,
                isLike: false
            }
        }
    }

}, defaultStatus)