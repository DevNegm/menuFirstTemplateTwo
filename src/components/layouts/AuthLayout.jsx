import React, { useEffect } from 'react'
import classes from './AuthLayout.module.scss'
import { Outlet, useLocation } from 'react-router-dom'
const AuthLayout = () => {
  const location = useLocation()
  useEffect(() => {
    const handleNavigation = () => {
        window.scrollTo(0, 0); 
    };
    handleNavigation(); 
}, [location]); 
  return (
    <main className={classes.main}>
        <div className={classes.sidebar}></div>
        <div className={classes.pages}>
        <Outlet/>
        </div>
    </main>
  )
}

export default AuthLayout