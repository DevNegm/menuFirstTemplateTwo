import React from 'react'
import VerificationInput from 'react-verification-input'
import Logo from '../../assets/Logo.png'
import classes from './PhoneVerify.module.scss'
import Button from '../../components/ui/Button'
const PhoneVerify = ({setCurrent,onClick,code,setCode,disabled,error,handleResend}) => {
  return (
    <section className={classes.phoneVerify}>
    <img src={Logo} alt="logo" />
      <h2>تأكيد رقم الجوال</h2>
      <div className={classes.formContainer}>
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
        <button onClick={handleResend}>أعد الإرسال</button>
      </div>
      {error && <p className='error'>{error}</p>}
      <div className={classes.buttons}>
        <Button disabled={disabled} onClick={onClick}>تأكيد الرقم</Button>
        <Button  outlined onClick={setCurrent}>السابق</Button>
      </div>
      </div>
    </section>
  )
}

export default PhoneVerify