import React, { useState } from 'react'
import classes from './PasswordInput.module.scss'
import { FaRegEye,FaEyeSlash } from "react-icons/fa";
const PasswordInput = ({placeholder,value,onChange,error}) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
  return (
    <div className={classes.input}>
        <input style={{border:error && '1px solid var(--redColor)'}} id='passowrdInput' onChange={onChange} value={value} type={showPassword ? 'text' : 'password'} placeholder={placeholder}/>
        <button onClick={handleShowPassword}>
            {showPassword ? <FaRegEye/> : <FaEyeSlash/>}
        </button>
    </div>
  )
}

export default PasswordInput