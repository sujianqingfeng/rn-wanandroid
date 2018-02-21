import { handleActions } from 'redux-actions'

import * as collectTypes from '../constants/collectTypes'



const defaultStatus = {
    data: [],
    isAddInSite: false,
    isAddOutSite:false,
    isCancelInA:false,
    isCancelInM:false
}



export default handleActions({
    [collectTypes.FETCH_ADD_IN_SITE_DONE]: {
        next(state, action) {
            return {
                ...state,
                isAddInSite: true
            }
        }
    },


}, defaultStatus)