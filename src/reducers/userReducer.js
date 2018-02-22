import {
    handleActions
} from 'redux-actions'

import * as userTypes from '../constants/userTypes'


const defaultStatus = {
    loginData: null,
    registerData:null,
    isLoginSucc: false,
    isRegisterSucc:false,
    isLogin:false,
    loginComplate:false,
    registerComplate:false
}


export default handleActions({
    [userTypes.FETCH_LOGIN_DONE]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: true,
                loginComplate:true,
                loginData: action.payload
            }
        }
    },
    [userTypes.FETCH_REGISTER_DONE]: {
        next(state, action) {
            return {
                ...state,
                isRegisterSucc: true,
                registerComplate:true,
                registerData: action.payload
            }
        }
    },
    [userTypes.FETCH_LOGIN_ERROR]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: false,
                loginComplate:true,
                loginData: action.payload
            }
        }
    },
    [userTypes.FETCH_REGISTER_ERROR]: {
        next(state, action) {
            return {
                ...state,
                isRegisterSucc: false,
                registerComplate:true,
                registerData: action.payload
            }
        }
    },
    
    [userTypes.FETCH_LOGIN_DOING]: {
        next(state, action) {
            return {
                ...state,
                isLogin:true,
                loginComplate:false,
                loginData:''
            }
        }
    },
    [userTypes.FETCH_REGISTER_DOING]: {
        next(state, action) {
            return {
                ...state,
                isLogin:false,
                registerComplate:false,
                registerData:''
            }
        }
    }
}, defaultStatus)