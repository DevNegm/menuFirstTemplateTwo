import React, { useEffect, useState } from 'react'
import classes from './Home.module.scss'
import exitem from '../../assets/exitem.png'
import Cards from '../../components/ui/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getMainData } from '../../store/slices/mainReducer'
import { CircularProgress } from '@mui/material'
import {Fade} from 'react-awesome-reveal'
import { MdClose, MdDelete, MdShoppingCart } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { translate } from '../../utils/translations'
import { useLanguage } from '../../context/LanguageContext'
const Home = () => {
  const dispatch = useDispatch()
  const { categoriesLoading } = useSelector(state => state.main)
  const {language} = useLanguage()
  const [categories, setCategories] = useState([])
  const [cart, setCart] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [item, setItem] = useState(null)
  const [openExtra, setOpenExtra] = useState(false)
  const [active, setActive] = useState(1);
  const [data, setData] = useState(null)



  const handleModal = (item) => {
    setShowModal(true)
    setItem(item)
  }
  const handleClose = (e) => {
    if (e.target.classList.contains(classes.modal)) {
      setShowModal(false);
      setOpenExtra(false);
    } else if (e.target.classList.contains(classes.cartmodal)) {
      setShowCartModal(false)
      setOpenExtra(false);
    }
  };

  const handleAddToCart = (item) => {
    const itemIndex = cart?.findIndex(i => i?.id === item?.id);
    if (itemIndex !== -1) {
      setCart(
        cart.map(i =>
          i?.id === item?.id
            ? { ...i, count: i?.count + (item?.count || 1) }
            : i
        )
      );
    } else {
      setCart([...cart, { ...item, count: item?.count || 1 }]);
    }
  };

  
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    setActive(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };





  useEffect(() => {
    dispatch(getCategories()).then((res) => {
      setCategories(res?.payload?.results)
      setActive(res?.payload?.results[0]?.id)
    })
    dispatch(getMainData()).then((res) => {
      setData(res.payload?.results[0]);
    })
  }, [])


  if (categoriesLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "calc(100% - 35rem)",
          height: "100vh",
        }}
      >
        <CircularProgress size={'1.5rem'} style={{ color: '#B57EDC' }} />
      </div>
    )
  }

  return (
    <section className={classes.container}>
      <div className={classes.sectionOne}>
        <div className={classes.sectionHeader}>
          <h3>{translate('categories',language)}</h3>
        </div>
        <div className={classes.items}>
          {categories?.map((item, i) => (
            <Fade cascade damping={0.1}>
              <div
                onClick={() => handleScroll(item?.id)}
                key={item?.id}
                className={active === item?.id ? classes.activeItem : classes.item}
                style={{borderColor:data?.primary_color ? data?.primary_color : "#B57EDC"}}
              >
                <img src={item?.image || exitem} alt={i + 1} />
                <p>{item?.[`name_${language}`]}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
      {categories?.map((item, i) => (
        <Cards
          main={data}
          sectionId={item?.id}
          header={item?.[`name_${language}`]}
          data={categories?.find(el => el?.id === item?.id)?.products}
          handleAddToCart={handleAddToCart}
          handleModal={handleModal}
        />
      ))}

      {showModal && (
        <div className={classes.modal} onClick={handleClose}>
          <div className={classes.modalContent}>
            <button style={{ backgroundColor: data?.primary_color ? data?.primary_color : "#B57EDC" }} className={classes.close} onClick={() => setShowModal(false)}><MdClose /></button>
            <img src={item?.image} alt="example" />
            <div className={classes.modalText}>
              <h4>{item?.[`name_${language}`]}</h4>
              <p>{item?.[`description_${language}`]}</p>
              <p>{translate('price',language)} : <span style={{ color: data?.primary_color ? data?.primary_color : "#B57EDC" }}>{item?.price}₪</span></p>
              <div className={classes.extras} >
                <button onClick={() => setOpenExtra(!openExtra)}>{translate('extras',language)} <IoIosArrowDown style={{ transform: openExtra && 'rotate(180deg)', transition: 'all 250ms ease-in-out' }} /></button>
                {openExtra && <div className={classes.extrasContent}>
                  {item?.variants?.map((item, index) => (
                    <div className={classes.item} key={index}>
                      <p>{item?.name}</p>
                      <p>{translate('price',language)} : <span style={{ color: data?.primary_color ? data?.primary_color : "#B57EDC" }}>{item?.price}₪</span></p>
                    </div>
                  ))}
                </div>}
              </div>
            </div>
          </div>
        </div>
      )}
      {showCartModal && (
        <div className={classes.cartmodal} onClick={handleClose}>
          <div className={classes.modalContent}>
            <button style={{ backgroundColor: data?.primary_color ? data?.primary_color : "#B57EDC" }} className={classes.close} onClick={() => setShowCartModal(false)}><MdClose /></button>
            <div className={classes.cartItems}>
              {!cart?.length && <h4 style={{ textAlign: 'center' }}>{translate('noProducts',language)}</h4>}
              {cart?.map((item, index) => (
                <div className={classes.cartItem} key={index}>
                  <img src={item?.image} alt="example" />
                  <div className={classes.cartItemText}>
                    <h4>{item?.[`name_${language}`]}</h4>
                    <p>{showMore[item?.id] ? item?.[`description_${language}`] : item?.[`description_${language}`]?.slice(0, 50) + '...'} <span style={{ color: data?.primary_color ? data?.primary_color : "#B57EDC", cursor: 'pointer' }} onClick={() => setShowMore({ ...showMore, [item.id]: !showMore[item.id] })}>{showMore[item?.id] ? translate('seeLess',language) : translate('seeMore',language)}</span></p>
                    <p>{translate('price',language)}: <span style={{ color: data?.primary_color ? data?.primary_color : "#B57EDC" }}>{item?.price}₪</span></p>
                    <div className={classes.extras} >
                      <button onClick={() => setOpenExtra({ ...openExtra, [item.id]: !openExtra[item.id] })}>{translate('extras',language)} <IoIosArrowDown style={{ transform: openExtra[item?.id] && 'rotate(180deg)', transition: 'all 250ms ease-in-out' }} /></button>
                      {openExtra[item.id] && <div className={classes.extrasContent}>
                        {item?.variants?.map((item, index) => (
                          <div className={classes.item} key={index}>
                            <p>{item?.[`name_${language}`]}</p>
                            <p>{translate('price',language)}: <span style={{ color: data?.primary_color ? data?.primary_color : "#B57EDC" }}>{item?.price}₪</span></p>
                          </div>
                        ))}
                      </div>}
                    </div>
                    <p>{translate('count',language)}: {item?.count}</p>
                    <button className={classes.remove} onClick={() => {
                      const newCart = cart.filter(el => el?.id !== item?.id)
                      setCart(newCart)
                    }}>
                      <MdDelete />
                      <span>{translate('removeFromCart',language)}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className={classes.cart} style={{backgroundColor:data?.primary_color ? data?.primary_color : "#B57EDC"}} onClick={() => setShowCartModal(true)}>
        <MdShoppingCart />
        <span style={{color:data?.primary_color ? data?.primary_color : "#B57EDC"}}>{cart?.length}</span>
      </button>
    </section>
  )
}

export default Home