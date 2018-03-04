import {
    handleActions
} from 'redux-actions'

import * as userTypes from '../constants/userTypes'


const defaultStatus = {
    loginData: null,
    registerData:null,
    isLoginSucc: false,
    isRegisterSucc:false,
    isLoginLable:false,
    loginComplate:false,
    registerComplate:false,
    isLogin:false
}


export default handleActions({
    [userTypes.FETCH_LOGIN_DONE]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: true,
                loginComplate:true,
                isLogin:true,
                loginData: action.payload
            }
        }
    },
    [userTypes.FETCH_REGISTER_DONE]: {
        next(state, action) {
            return {
                ...state,
                isRegisterSucc: true,
                isLogin:true,
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
                isLogin:false,
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
                isLogin:false,
                registerComplate:true,
                registerData: action.payload
            }
        }
    },
    
    [userTypes.FETCH_LOGIN_DOING]: {
        next(state, action) {
            return {
                ...state,
                isLoginLable:true,
                loginComplate:false,
                loginData:''
            }
        }
    },
    [userTypes.FETCH_REGISTER_DOING]: {
        next(state, action) {
            return {
                ...state,
                isLoginLable:false,
                registerComplate:false,
                registerData:''
            }
        }
    },
    [userTypes.FETCH_ISLOGIN_DONE]: {
        next(state, action) {
            return {
                ...state,
               isLogin:true
            }
        }
    },
    [userTypes.FETCH_ISLOGIN_ERROE]: {
        next(state, action) {
            return {
                ...state,
               isLogin:false
            }
        }
    }
}, defaultStatus)