import {
    handleActions
} from 'redux-actions'

import * as userTypes from '../constants/userTypes'


const defaultStatus = {
    loginData: null,
    registerData:null,
    isLoginSucc: false,
    isRegisterSucc:false,
    isLogin:false
}


export default handleActions({
    [userTypes.FETCH_LOGIN_DONE]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: true,
                loginData: action.payload
            }
        }
    },
    [userTypes.FETCH_REGISTER_DONE]: {
        next(state, action) {
            return {
                ...state,
                isRegisterSucc: true,
                registerData: action.payload
            }
        }
    },
    [userTypes.FETCH_LOGIN_ERROR]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: false,
                loginData: action.payload
            }
        }
    },
    [userTypes.FETCH_REGISTER_ERROR]: {
        next(state, action) {
            return {
                ...state,
                isRegisterSucc: false,
                registerData: action.payload
            }
        }
    },
    
    [userTypes.FETCH_LOGIN_DOING]: {
        next(state, action) {
            return {
                ...state,
                isLogin:true
            }
        }
    },
    [userTypes.FETCH_REGISTER_DOING]: {
        next(state, action) {
            return {
                ...state,
                isLogin:false
            }
        }
    }
}, defaultStatus)