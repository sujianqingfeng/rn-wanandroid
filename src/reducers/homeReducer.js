import * as homeTypes from '../constants/homeTypes';

import { handleActions, handleAction } from 'redux-actions';


const defaultStatus = {
    data: null,
    banner: null,
    isSucc: false
}


export default handleActions({
    [homeTypes.FETCH_HOME_LIST_DOING]: {

        next(state, action) {
            return {
                ...state,
                isSucc: false
            }
        }

    },
    [homeTypes.FETCH_HOME_LIST_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                data: action.payload
            }
        }

    },
    [homeTypes.FETCH_HOME_BANNER_DONE]: {
        next(state, action) {
            return {
                ...state,
                isSucc: true,
                banner: action.payload
            }
        }

    }
}, defaultStatus)