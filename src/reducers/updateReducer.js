import { handleActions } from 'redux-actions'

import * as updateTypes from '../constants/updateTypes'



const defaultStatus = {
    isUpdate:false,
    content:''
}



export default handleActions({
    [updateTypes.FETCH_UPDATE_DONE]: {
        next(state, action) {

            const  {version,info} = action.payload

            return {
                ...state,
                isUpdate: true,
                content:info
            }
        }
    }
}, defaultStatus)