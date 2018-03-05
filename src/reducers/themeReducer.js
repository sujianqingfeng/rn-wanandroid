import { handleActions } from 'redux-actions'

import * as themeTypes from '../constants/themeTypes'



const defaultStatus = {
   color:'#E91E63'
}

export default handleActions({
    [themeTypes.CHANGE_THEME_COLOR_DONE]: {
        next(state, action) {
            const {color} = action.payload
            return {
                ...state,
                color:color
            }
        }
    }
}, defaultStatus)