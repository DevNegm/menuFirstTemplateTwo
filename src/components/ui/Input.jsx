import React from 'react'
import classes from './Input.module.scss'
const Input = ({placeholder,onChange,value,error,type}) => {
  return (
    <input className={classes.input} value={value} onChange={onChange} type={type ? type : "text"} style={{border:error && '1px solid var(--redColor)'}} placeholder={placeholder} />
  )
}

export default Input