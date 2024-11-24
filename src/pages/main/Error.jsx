import React from 'react'
import classes from './Error.module.scss'
import errorImage from '../../assets/error.jpg'
const Error = () => {
  return (
    <div className={classes.container}>
    <img src={errorImage} alt="Sorry, The page not found" />
        <h3>404</h3>
        <h4>عفوا هذة الصفحة غير متاحة</h4>
        <p>ربما يكون الرابط الذي اتبعته معطلاً أو تمت إزالة الصفحة</p>
    </div>
  )
}

export default Error