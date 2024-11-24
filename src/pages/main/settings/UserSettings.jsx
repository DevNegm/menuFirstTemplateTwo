import React, { useEffect, useState } from 'react'
import classes from './UserSettings.module.scss'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import userEx from '../../../assets/userEx.png'
import userIcon from '../../../assets/profile-circle.svg'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import attachIcon from '../../../assets/attach-circle.svg'
import { useDispatch, useSelector } from 'react-redux'
import { editUserInfo, getUser } from '../../../store/slices/mainReducer'
const UserSettings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {editUserLoading} = useSelector(state => state.main)
  const [showModal,setShowModal] = useState(false)
  const [user,setUser] = useState({
    fullName: '',
    imageUrl:'' ,
    userId: ''
  })




  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({...user,imageUrl:e.target.result});
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEditInfo = () => {
    dispatch(editUserInfo(user)).then((res) => {
      if(res?.payload?.fullName && res?.payload?.imageUrl) {
      dispatch(getUser()).then((res) => {
        setUser({...user,fullName:res?.payload?.fullName,imageUrl:res?.payload?.imageUrl,userId:res?.payload?.id})
        navigate('/settings')
        window.location.reload(true)
      }
      )}
    })
  }


  useEffect(() => {
    dispatch(getUser()).then((res) => {
      setUser({...user,fullName:res?.payload?.fullName,imageUrl:res?.payload?.imageUrl,userId:res?.payload?.id})
    })
  }, [])
  

  return (
    <section className={classes.container}>
      {showModal && <div className={classes.modal}>
      <div className={classes.modalContent}>
      <img className={classes.avatar} src={user?.imageUrl || userEx} alt="user image" />
          <div className={classes.actions}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="photoInput"
            onChange={handlePhotoChange}
          />
            <button onClick={() => document.getElementById('photoInput').click()}>
              <img src={attachIcon} alt="attach photo" />
              ارفق ملف
            </button>
          <p className={classes.text}>ملف مثل : JPG أو PNG بحجم أقصاه 5 ميجا بايت</p>

          </div>
          <div className={classes.buttons}>
            <Button onClick={() => setShowModal(false)} disabled={false} >
               حفظ التغييرات
            </Button>
            <Button outlined onClick={() => setShowModal(false)} disabled={false} >
               الغاء التغيير    
           </Button>
          </div>
      </div>
      </div>}
        <h3>تغيير رقم الجوال</h3>
        <button className={classes.backBtn} onClick={() => navigate(-1)}>
            <BsArrowLeft/>
        </button>
      <div className={classes.userInfo}>
      <img className={classes.avatar} src={user?.imageUrl || userEx} alt="user name" />
      <button onClick={() => setShowModal(true)}>
      <img src={userIcon} alt="user icon" />
      تغيير الصورة الشخصية  
      </button>
      </div>
      <div className={classes.userContent}> 
          <p>تعديل اسم المستخدم</p>
          <Input value={user?.fullName} placeholder={'اسم المستخدم'} onChange={(e) => setUser({...user,fullName:e.target.value})}/>
      </div>
      <div className={classes.buttons}>
        <Button loading={editUserLoading} disabled={editUserLoading} onClick={handleEditInfo} >
           حفظ التعديلات 
        </Button>
      </div>
    </section>
  )
}

export default UserSettings