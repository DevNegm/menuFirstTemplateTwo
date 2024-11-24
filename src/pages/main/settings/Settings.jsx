import React, { useEffect, useState } from 'react'
import classes from './Settings.module.scss'
import userPic from '../../../assets/user.png'
import { PiNotepad } from 'react-icons/pi'
import { GoHeart, GoLocation } from 'react-icons/go'
import { LuPhone, LuUserCircle } from 'react-icons/lu'
import { CiLogout } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { IoChevronBackOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/slices/authReducer'
import { getUser } from '../../../store/slices/mainReducer'
import { formatDate } from '../../../utils/formatWords'
const Settings = () => {
  const dispatch = useDispatch()
  const {isAuth} = useSelector(state => state.auth)
  const [user, setUser] = useState({})
  const handleLogOut = () => {
    dispatch(logout())
    window.location.reload(true)
  }

  console.log(user)
 

  useEffect(() => {
    if(isAuth){
      dispatch(getUser()).then((res) => {
        setUser(res?.payload)
      })
    }
  }, [])

  return (
    <section className={classes.container}>
     {isAuth ? (<div className={classes.user}>
          <img src={user?.imageUrl || userPic} alt="user" />
          <div className={classes.userInfo}>
            <h3>{user?.fullName}</h3>
            <p>رقم الجوال : {user?.phoneNumber}</p>
            <p>مسجل منذ : {formatDate(user?.created)}</p>
          </div>
      </div> ): (
        <div className={classes.user}>
          <img src={userPic} alt="user" />
          <div className={classes.userInfo}>
            <h3>ضيف</h3>
            <p>قم بتسجيل الدخول أو إنشاء حساب</p>
          </div>
      </div>
      )}
      {isAuth && <div className={classes.settings}>
            <Link to="/settings/orders" className={classes.setting}>
              <span><PiNotepad/> الطلبات </span>
              <span className={classes.arrow}><IoChevronBackOutline  /></span>
            </Link>
            <Link to="/settings/wishlist" className={classes.setting}>
              <span><GoHeart/> المفضلة </span>
              <span className={classes.arrow}><IoChevronBackOutline  /></span>
            </Link>
            <Link to="/settings/addresses" className={classes.setting}>
              <span><GoLocation/> العناوين الخاصة بي </span>
              <span className={classes.arrow}><IoChevronBackOutline  /></span>
            </Link>
            <Link to="/settings/account" className={classes.setting}>
              <span><LuUserCircle/> اعدادات الحساب </span>
              <span className={classes.arrow}><IoChevronBackOutline  /></span>
            </Link>
            <button onClick={handleLogOut} className={classes.setting}>
              <span><CiLogout/> تسجيل الخروج </span>
              <span className={classes.arrow}><IoChevronBackOutline  /></span>
            </button>
            <button onClick={() => {}} className={classes.setting}>
              <span><LuPhone/> تواصل معنا </span>
              <span className={classes.arrow}><IoChevronBackOutline  /></span>
            </button>

          </div>}
          {!isAuth && <div className={classes.settings}>
          <button onClick={() => {}} className={classes.setting}>
              <span><LuPhone/> تواصل معنا </span>
              <span className={classes.arrow}><IoChevronBackOutline  /></span>
            </button>
          </div>}
          {!isAuth && <div className={classes.authBtns}>
              <Link to="/auth">تسجيل الدخول</Link>
              <Link className={classes.outlined} to="/auth/sign-up">إنشاء حساب</Link>
          </div>}
    </section>
  )
}

export default Settings