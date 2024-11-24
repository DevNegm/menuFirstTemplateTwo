import React, { useEffect, useState } from 'react'
import classes from './Wishlist.module.scss'
import Cards from '../../../components/ui/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { getWhishlist } from '../../../store/slices/mainReducer'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { CircularProgress } from '@mui/material'
const Wishlist = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [wishlists, setWishlists] = useState([])
    const {whishlistsLoading} = useSelector(state => state.main)


    useEffect(() => {
      dispatch(getWhishlist()).then((res) => {
        console.log(res?.payload)
        if(res?.payload === 'No items found in wishlist') {
          setWishlists([])
        } else {
          setWishlists(res?.payload)
        }
        });
    }, [])
    
    if(whishlistsLoading) {
        return (
          <div
            style={{
              position:'fixed',
              right:0,
              top:0,
              zIndex:999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "calc(100% - 35rem)",
              height: "100vh",
          }}
          >
              <CircularProgress size={'1.5rem'} style={{color:'#B57EDC'}} />
          </div>          
        )
      }
    
    
  return (
    <section className={classes.container}>
           <h3>المفضلة</h3>
        <button className={classes.backBtn} onClick={() => navigate(-1)}>
                <BsArrowLeft/>
        </button>
        {!wishlists?.length > 0 && <h3>لا توجد منتجات في المفضلة</h3>}
        {wishlists?.length > 0 && <Cards search data={wishlists} wishlist setWishlists={setWishlists} />}
    </section>
  )
}

export default Wishlist