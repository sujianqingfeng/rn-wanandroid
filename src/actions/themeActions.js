import {createAction} from 'redux-actions'


import  * as themeTypes from '../constants/themeTypes'


export const changeTheme= (color) =>dispatch=>dispatch(createAction(themeTypes.CHANGE_THEME_COLOR_DONE)({color}))


