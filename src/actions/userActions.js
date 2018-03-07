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

function isLogin(){

    return dispatch=>{
        HttpUtil.get('/lg/collect/list/'+0+'/json')
        .then(res=>dispatch(createAction(userTypes.FETCH_ISLOGIN_DONE)()))
        .catch(error=>dispatch(createAction(userTypes.FETCH_ISLOGIN_ERROE)()))
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


const changeLoginState = (bool)=>{
    return dispatch =>{
        if (bool){
            dispatch(createAction(userTypes.FETCH_ISLOGIN_DONE)())
        }else{
            dispatch(createAction(userTypes.FETCH_ISLOGIN_ERROE)())
        }
    }
}


export {
    login,
    register,
    isLogin,
    changeLoginState
}