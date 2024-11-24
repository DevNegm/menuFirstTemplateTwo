import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import classes from './GoogleButton.module.scss'
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { authGoogle } from '../../store/slices/authReducer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const GoogleButton = ({text,setErrorMsg}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login = useGoogleLogin({
    onSuccess: tokenResponse => 
     {
      console.log(tokenResponse);
      dispatch(authGoogle({idToken:tokenResponse?.access_token,provider:"google"})).then((res) => {
        console.log(res?.payload)
    })
    
  },
    onFail: error => console.error(error),
  });
  return (
    <button className={classes.button}  onClick={login}>
        <FcGoogle /> تسجيل دخول بإستخدام جوجل
    </button>

  )
}

export default GoogleButton