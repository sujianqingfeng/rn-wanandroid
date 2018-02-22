import { createAction } from 'redux-actions';

import * as userTypes from '../constants/userTypes'
import  HttpUtil from '../utils/HttpUtil'



function login(username,password){

    return dispatch=>{

        dispatch(createAction(userTypes.FETCH_LOGIN_DOING)())
        HttpUtil.post('/user/login',{
            username:username,
            password:password
        })
        .then(res=>{
            if(res.errorCode==0){
                dispatch(createAction(userTypes.FETCH_LOGIN_DONE)(res.data))
            }else{
                dispatch(createAction(userTypes.FETCH_LOGIN_ERROR)(res.errorMsg))
            }
        })
    }
}


function register(username,password,repassword){

    return dispatch =>{
        dispatch(createAction(userTypes.FETCH_REGISTER_DOING)())
        HttpUtil.post('/user/register',{
            username:username,
            password:password,
            repassword:repassword
        }).then(res=>{

            if(res.errorCode==0){
                dispatch(createAction(userTypes.FETCH_REGISTER_DONE)(res.data))
            }else{
                dispatch(createAction(userTypes.FETCH_REGISTER_ERROR)(res.errorMsg))
            }
        })
    }
}


export {
    login,
    register
}