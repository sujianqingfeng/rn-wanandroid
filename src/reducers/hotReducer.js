import { handleActions } from 'redux-actions'

import * as hotTypes from '../constants/hotTypes'



const defaultStatus = {
    data: [],
    isSucc: false,
    friendArray:[]
}



export default handleActions({
    [hotTypes.FETCH_HOT_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                data: action.payload
            }
        }
    },
    [hotTypes.FETCH_FRIEND_DONE]:{
        next(state,action){
            return {
                ...state,
                isSucc:true,
                friendArray:action.payload
            }
        }
    }

}, defaultStatus)