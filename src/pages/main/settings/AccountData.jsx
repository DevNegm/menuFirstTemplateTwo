import React from 'react'
import classes from './AccountData.module.scss'
import passIcon from '../../../assets/password-check.svg'
import userIcon from '../../../assets/profile-circle.svg'
import callIcon from '../../../assets/call-received.svg'
import { Link, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { IoChevronBackOutline } from 'react-icons/io5'
const AccountData = () => {
  const navigate = useNavigate()

  return (
    <section className={classes.container}>
      <h3>إعدادات الحساب</h3>
      <button className={classes.backBtn} onClick={() => navigate(-1)}>
                <BsArrowLeft/>
        </button>
   <div className={classes.settings}>
          <Link to="/settings/account/change-password" className={classes.setting}>
            <span><img src={passIcon} alt="إعادة تعيين كلمة السر" /> إعادة تعيين كلمة السر </span>
            <span className={classes.arrow}><IoChevronBackOutline  /></span>
            
          </Link>
          <Link to="/settings/account/edit-info" className={classes.setting}>
            <span><img src={userIcon} alt="تعديل بيانات الحساب" /> تعديل بيانات الحساب </span>
            <span className={classes.arrow}><IoChevronBackOutline  /></span>
          </Link>
          <Link to="/settings/account/change-number" className={classes.setting}>
            <span><img src={callIcon} alt="تغيير رقم الجوال" /> تغيير رقم الجوال </span>
            <span className={classes.arrow}><IoChevronBackOutline  /></span>
          </Link>
        </div>
  </section>
  )
}

export default AccountData