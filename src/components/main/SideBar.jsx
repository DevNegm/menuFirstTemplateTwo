import React, { useEffect, useState } from 'react'
import classes from './SideBar.module.scss'
import { CiClock2, CiShop } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPinterest, FaTiktok, FaYoutube } from 'react-icons/fa'
import sideEx from '../../assets/sideEx.png'
import { LuUserCircle } from 'react-icons/lu'
import { IoTimeOutline } from 'react-icons/io5'
import { FormControl, MenuItem, Select } from '@mui/material'
import { MdClose } from 'react-icons/md'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const SideBar = () => {
  const [showModal, setShowModal] = useState(false)
  const [language, setLanguage] = useState('AR');
  const handleClose = (e) => {
    if (e.target.classList.contains(classes.modal)) {
      setShowModal(false)
    }
  }

  const data = ['https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
     'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg', 
     'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
    'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
  'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg',
'https://menu-first-template.vercel.app/assets/dish-CM7Bd_Y2.jpeg']


  return (
    <section className={classes.sidebar}>
        <div className={classes.sidebarContent}>
        <img src={'https://menu-first-template.vercel.app/assets/logo-CLHuY34J.jpg'} style={{border:'5px solid #B57EDC'}} alt="restaurant image" />
        <h3>اسم المطعم</h3>
        <button className={classes.workinghours} onClick={() => {setShowModal(!showModal)}} style={{backgroundColor:'#B57EDC'}}>
            11:00 - 24:00 <IoTimeOutline />
        </button>
       
        {
        showModal && <div className={classes.modal} onClick={handleClose}>
          <div className={classes.modalContent} style={{backgroundColor:'#B57EDC'}}>
            <button className={classes.close} onClick={() => setShowModal(false)}><MdClose /></button>
              <p>الجمعة 11:00 - 24:00 <IoTimeOutline /> </p>
              <p>السبت 11:00 - 24:00 <IoTimeOutline /> </p>
              <p>الاحد 11:00 - 24:00 <IoTimeOutline /> </p>
              <p>الاثنين 11:00 - 24:00 <IoTimeOutline /> </p>
              <p>الثلاثاء  11:00 - 24:00 <IoTimeOutline /> </p>
              <p>الاربعاء 11:00 - 24:00 <IoTimeOutline /> </p>
              <p>الخميس 11:00 - 24:00 <IoTimeOutline /> </p>
          </div>
        </div>
      }
      <div className={classes.language}>
          <button>العربية</button>
          <button>עברית</button>
        </div>
        <div className={classes.social}>
            <Link to="/"><FaFacebookF /></Link>
            <Link to="/"><FaYoutube /></Link>
            <Link to="/"><FaTiktok /></Link>
            <Link to="/"><FaPinterest /></Link>
            <Link to="/"><FaInstagram /></Link>
        </div>
      
        </div>
    </section>
  )
}

export default SideBar