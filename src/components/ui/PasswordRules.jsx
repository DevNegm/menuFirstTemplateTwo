import React, { useEffect, useState } from 'react'
import classes from './PasswordRules.module.scss'
import { FaRegCircleCheck } from 'react-icons/fa6';
const PasswordRules = ({password,userName,setValid}) => {
    const [validation, setValidation] = useState({
        length: false,
        uppercase: false,
        symbol: false,
        number: false,
        noName: false
    });


   useEffect(() => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            number: /\d/.test(password),
            noName: !password.includes(userName)
        };
        setValidation(requirements);
   }, [password,userName])
   
   useEffect(() => {
    if(validation.length && validation.uppercase && validation.symbol && validation.number && validation.noName){
        setValid(true)
     }else{
        setValid(false)
        }
   }, [validation])
   
   
  return (
    <div className={classes.container}>
        <p style={{fontWeight:'bolder',color:'var(--blackColor)'}}>تعليمات كلمة المرور</p>
        <p><FaRegCircleCheck   style={{color:validation.length ? 'var(--greenColor)' : 'var(--lightGrayColor)'}} /> أن يحتوى على 8 حرف على الأقل ( ينصح بـ 12 حرف)</p>
        <p><FaRegCircleCheck   style={{color:validation.uppercase ? 'var(--greenColor)' : 'var(--lightGrayColor)'}} /> أن يحتوى على حرف كبير على الأقل </p>
        <p><FaRegCircleCheck   style={{color:validation.symbol ? 'var(--greenColor)' : 'var(--lightGrayColor)'}} /> أن يحتوى على رموز (مثل @,!,&,%,$,.....) </p>
        <p><FaRegCircleCheck   style={{color:validation.number ? 'var(--greenColor)' : 'var(--lightGrayColor)'}} /> أن يحتوى على رقم أو أكثر </p>
        <p><FaRegCircleCheck   style={{color:validation.noName ? 'var(--greenColor)' : 'var(--lightGrayColor)'}} /> لا يحتوى على معلومات مثل الإسم</p>
    </div>
  )
}

export default PasswordRules