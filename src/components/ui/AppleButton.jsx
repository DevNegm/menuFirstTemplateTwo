import React from 'react'
import classes from './AppleButton.module.scss'
import { FaApple } from 'react-icons/fa'
const AppleButton = () => {
  return (
    <button className={classes.button}  onClick={() => {}}>
        <FaApple /> تسجيل دخول بإستخدام أبل
    </button>
  )
}

export default AppleButton