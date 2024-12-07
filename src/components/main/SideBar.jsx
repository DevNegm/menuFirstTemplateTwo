import React, { useEffect, useState } from 'react'
import classes from './SideBar.module.scss'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPinterest, FaTiktok, FaYoutube } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { MdClose } from 'react-icons/md'
import { useLanguage } from '../../context/LanguageContext'
import { useDispatch } from 'react-redux'
import { getMainData } from '../../store/slices/mainReducer'
import { FaGlobe } from 'react-icons/fa6'
import { translate } from '../../utils/translations'

const SideBar = () => {
  const dispatch = useDispatch()
  const {language,changeLanguage} = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const handleClose = (e) => {
    if (e.target.classList.contains(classes.modal)) {
      setShowModal(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data?.header_images?.length);
        setFade(true); 
      }, 500); 
    }, 5000);

    return () => clearInterval(interval);
  }, [data?.header_images]);


  useEffect(() => {
    dispatch(getMainData()).then((res) => {
      setData(res.payload?.results[0]);
    });
  }, []);

  

  return (
    <section className={classes.sidebar} style={{
       backgroundImage: `url(${data?.header_images?.[currentImageIndex]?.image})`,
        backgroundSize: "cover",
        backgroundColor:'#000',
        backgroundPosition: "center",
        filter: fade ? "brightness(1)" : "brightness(0.8)",
        transition: "filter 0.5s ease-in-out",
    }}>
        <div className={classes.sidebarContent}>
        <img src={data?.image ? data?.image : "https://via.placeholder.com/150"} style={{border:`5px solid ${data?.primary_color ? data?.primary_color : "#B57EDC"}`}} alt="restaurant image" />
        <h3>{data?.[`name_${language}`]}</h3>
        <button className={classes.workinghours} onClick={() => {setShowModal(!showModal)}} style={{backgroundColor:data?.primary_color ? data?.primary_color : "#B57EDC"}}>
        {data?.opening_time} - {data?.closing_time} <IoTimeOutline />
        </button>
       
        {
        showModal && <div className={classes.modal} onClick={handleClose}>
          <div className={classes.modalContent} style={{backgroundColor:data?.primary_color ? data?.primary_color : "#B57EDC"}}>
            <button className={classes.close} onClick={() => setShowModal(false)}><MdClose /></button>
            <p>
                {translate("friday", language)} {' '}
                {data?.opening_time} - {data?.closing_time}
                <IoTimeOutline />
              </p>
              <p>
              {translate("saturday", language)} {' '}
                {data?.opening_time} - {data?.closing_time}
                <IoTimeOutline />
              </p>
              <p>
              {translate("sunday", language)} {' '}
                {data?.opening_time} - {data?.closing_time} <IoTimeOutline />{" "}
              </p>
              <p>
              {translate("monday", language)} {' '}
                {data?.opening_time} - {data?.closing_time} <IoTimeOutline />{" "}
              </p>
              <p>
              {translate("tuesday", language)} {' '}
                {data?.opening_time} - {data?.closing_time} <IoTimeOutline />{" "}
              </p>
              <p>
              {translate("wednesday", language)} {' '}
                {data?.opening_time} - {data?.closing_time} <IoTimeOutline />{" "}
              </p>
              <p>
              {translate("thursday", language)} {' '}
                {data?.opening_time} - {data?.closing_time} <IoTimeOutline />{" "}
              </p>
          </div>
        </div>
      }
      <div className={classes.language}>
          <button style={{backgroundColor:language == 'ar' && data?.primary_color ? data?.primary_color : ""}} onClick={() => changeLanguage('ar')}>العربية</button>
          <button style={{backgroundColor:language == 'he' && data?.primary_color ? data?.primary_color : ""}} onClick={() => changeLanguage('he')}>עברית</button>
        </div>
        <div className={classes.social}>
            {data?.social_media_links?.map((item) => (
                  <Link to={item?.url} key={item?.id} 
                    onMouseEnter={(e) => (e.target.style.backgroundColor = data?.primary_color ? data?.primary_color : "#B57EDC")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    target='_blank'>
                    {item?.platform == 'facebook' && <FaFacebookF />}
                    {item?.platform == 'youtube' && <FaYoutube />}
                    {item?.platform == 'tiktok' && <FaTiktok />}
                    {item?.platform == 'pinterest' && <FaPinterest />}
                    {item?.platform == 'instagram' && <FaInstagram />}
                    {!item?.platform  && <FaGlobe />}
                  </Link>
            ))}
        </div>
      
        </div>
    </section>
  )
}

export default SideBar