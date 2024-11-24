import React, { useEffect, useState } from 'react'
import classes from './NumberChange.module.scss'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import PhoneVerify from '../../../components/ui/PhoneVerify'
import VerificationInput from 'react-verification-input'
import { useDispatch, useSelector } from 'react-redux'
import { editUserPhone, getUser } from '../../../store/slices/mainReducer'
const NumberChange = () => {
  const {isAuth} = useSelector(state => state.auth)
  const {editUserPhoneLoading , editUserPhoneError} = useSelector(state => state.main)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current,setCurrent] = useState(1)
  const [user,setUser] = useState({})
  const [phone,setPhone] = useState({NewPhoneNumber:''})
  const [disabled,setDisabled] = useState(true)
  const [error,setError] = useState('')
  const [code,setCode] = useState('')



  const handleChangePhone = () => {
    dispatch(editUserPhone(phone)).then((res) => {
      if(res?.payload?.message === 'PhoneNumber updated successfully') {
        navigate(-1)
      } else {
        setError('حدث خطأ يرجى المحاولة مرة أخرى')
      }
    })
  }




  useEffect(() => {
    if(isAuth){
      dispatch(getUser()).then((res) => {
        setUser(res?.payload)
        if(res?.payload?.phoneNumber?.length) {
          setPhone({NewPhoneNumber:res?.payload?.phoneNumber})
        }
      })
    }
  }, [])
  

  useEffect(() => {
    if(current === 1) {
      if(phone?.NewPhoneNumber.length > 0) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
    if(current === 2) {
      if(code.length > 0) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
  }, [current, phone, code])
  
  return (
    <section className={classes.container}>
    <h3>تغيير رقم الجوال</h3>
    <button className={classes.backBtn} onClick={() => navigate(-1)}>
        <BsArrowLeft/>
    </button>
    {current === 1 && <>
    
    <Input placeholder={'رقم الجوال الجديد'} error={error} value={phone?.NewPhoneNumber} onChange={(e) => setPhone({NewPhoneNumber:e.target.value})}/>
    {error && <p className='error'>{error}</p>}
    <div className={classes.buttons}>
    <Button disabled={disabled || editUserPhoneLoading} loading={editUserPhoneLoading} onClick={handleChangePhone}>تغيير</Button>
    </div>
    </>}

    {/* {current === 2 && <div className={classes.verify}>
      <p style={{maxWidth:'400px',margin:'0 auto',textAlign:'center'}}>ستصلك رسالة على رقم الهاتف المسجل بها 5 أرقام صالحة للإستخدام مرة واحدة، قم بكتابتها لتأكيد حسابك</p>
      <VerificationInput
        classNames={{
          container: classes.verificationInput,
          character: classes.character,
          characterInactive: classes.characterInactive,
          characterSelected: classes.characterSelected,
          characterFilled: classes.characterFilled,
        }}
        length={5}
        placeholder=""
        value={code}
        onChange={(e) => setCode(e)}
      />
      <div className={classes.noMessage}> 
        <p>لم تصلك الرسالة؟</p>
        <button>أعد الإرسال</button>
      </div>
      <div className={classes.buttons}>
        <Button disabled={disabled} onClick={() => {}}>تأكيد الرقم</Button>
        <Button  outlined onClick={() => setCurrent(1)}>السابق</Button>
      </div>
    </div>} */}
   
  </section>
  )
}

export default NumberChange