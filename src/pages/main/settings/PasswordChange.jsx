import React, { useEffect, useState } from 'react'
import classes from './PasswordChange.module.scss'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../../../components/ui/PasswordInput'
import Button from '../../../components/ui/Button'
import PasswordRules from '../../../components/ui/PasswordRules'
import { useDispatch, useSelector } from 'react-redux'
import { editUserPassword } from '../../../store/slices/mainReducer'
import { logout } from '../../../store/slices/authReducer'
const PasswordChange = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {editUserPasswordLoading , editUserPasswordError} = useSelector(state => state.main)
  const [current,setCurrent] = useState(1)
  const [password,setPassword] = useState('')
  const [disabled,setDisabled] = useState(true)
  const [valid,setValid] = useState(false)
  const [data,setData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [error,setError] = useState('')


  const handleChangePassword = () => {
    dispatch(editUserPassword(data)).then((res) => {
      if(res?.payload?.isSuccess) {
        dispatch(logout())
        navigate('/auth')
        window.location.reload(true)
      }
    })
  }




  useEffect(() => {
    if(current === 1) {
      if(data.oldPassword.length > 0) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
    if(current === 2) {
      if(data.newPassword.length > 0 && data.confirmNewPassword.length > 0 && (data?.newPassword === data?.confirmNewPassword) && valid) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
  }, [current, password, data])
  

  return (
    <section className={classes.container}>
      <h3>تعيين كلمة السر</h3>
      <button className={classes.backBtn} onClick={() => navigate(-1)}>
          <BsArrowLeft/>
      </button>
      {current === 1 && <>
      
      <PasswordInput placeholder={'كلمة السر الحالية'} error={error} value={data?.oldPassword} onChange={(e) => setData({...data,oldPassword:e.target.value})}/>
      <div className={classes.buttons}>
      <Button disabled={disabled} onClick={() => setCurrent(2)}>التالي</Button>
      </div>
      </>}
      {current === 2 && <>
      <PasswordInput placeholder={'كلمة السر الجديدة'} error={error} value={data?.newPassword} onChange={(e) => setData({...data,newPassword:e.target.value})}/>
      <PasswordRules password={data?.newPassword} setValid={setValid}/>
      <PasswordInput placeholder={'إعادة كتابة كلمة السر'} error={error} value={data?.confirmNewPassword} onChange={(e) => setData({...data,confirmNewPassword:e.target.value})}/>
      <div className={classes.buttons}>
      <Button disabled={disabled || editUserPasswordLoading} loading={editUserPasswordLoading} onClick={handleChangePassword}>تأكيد التغيير</Button>
      <Button disabled={disabled} onClick={() => setCurrent(1)} outlined>السابق</Button>
      </div>
      </>}
     
    </section>
  )
}

export default PasswordChange