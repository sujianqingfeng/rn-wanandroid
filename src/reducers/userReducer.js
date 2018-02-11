import {
    handleActions
} from 'redux-actions'

import * as userTypes from '../constants/userTypes'


const defaultStatus = {
    data: null,
    isSucc: false
}


export default handleActions({
    [userTypes.FETCH_LOGIN_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                data: action.payload
            }
        }
    },
    [userTypes.FETCH_LOGIN_ERROR]: {
        next(state, action) {
            return {
                ...state,
                isSucc: false,
                data: action.payload
            }
        }
    }
}, defaultStatus)