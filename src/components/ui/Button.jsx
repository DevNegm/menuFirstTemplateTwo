import React from 'react'
import classes from './Button.module.scss'
import { CircularProgress } from '@mui/material'
const Button = ({children,rounded,onClick,disabled,outlined,loading}) => {
  return (
    <button className={outlined ?  classes.outline : classes.button} disabled={disabled} onClick={onClick} style={{borderRadius:rounded && '1.5rem'}}>
    {loading ? (<CircularProgress size={14} style={{color:'#fff'}} />) : children}
    </button>
  )
}

export default Button