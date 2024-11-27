import React, { useEffect } from 'react'
import classes from './MainLayout.module.scss'
import { Outlet, useLocation } from 'react-router-dom'
import SideBar from '../main/SideBar'
const MainLayout = () => {
  const location = useLocation()
  useEffect(() => {
    const handleNavigation = () => {
        window.scrollTo(0, 0); 
    };
    handleNavigation(); 
}, [location]); 
  return (
    <main className={classes.main}>
        <SideBar/>
        <div className={classes.pages}>
        <Outlet/>
        </div>

    </main>
  )
}

export default MainLayout