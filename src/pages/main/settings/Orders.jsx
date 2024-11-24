import React, { useEffect, useState } from 'react'
import classes from './Orders.module.scss'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../../store/slices/mainReducer'
import { formatDate } from '../../../utils/formatWords'
import { CircularProgress } from '@mui/material'
const Orders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const {userOrdersLoading} = useSelector(state => state.main)

    useEffect(() => {
        dispatch(getOrders()).then((res) => {
            console.log(res?.payload)
            setOrders(res?.payload)
        })
    }, [])

    if(userOrdersLoading) {
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
        <h3>الطلبات</h3>
        <button className={classes.backBtn} onClick={() => navigate(-1)}>
                <BsArrowLeft/>
        </button>
        {!orders?.length > 0 && <h3>لا توجد طلبات</h3>}
        {orders?.map((item, i) => (
            <div className={classes.item}>
                <div className={classes.info}>
                    <p>المطعم</p>
                    <p className={classes.light}>اسم المطعم</p>
                </div>
                <div className={classes.info}>
                    <p>تاريخ الطلب</p>
                    <p className={classes.light}>{formatDate(item?.deliverDate)}</p>
                </div>
                <div className={classes.info}>
                    <p>رقم الطلب</p>
                    <p className={classes.light}>#{item?.orderNumber}</p>
                </div>
                <div className={classes.info}>
                    <p>حالة الطلب</p>
                    <p className={classes.light}>{
                        item?.status === 1 ? 'ملغي' : item?.status === 2 ? 'قيد الانتظار' : item?.status === 3 ? 'جاري التحضير' : item?.status === 4 ? 'تم الشحن' : item?.status === 5 && 'تم التوصيل'
                    } </p>
                </div>
                <div className={classes.info}>
                    <h4>المبلغ الإجمالي</h4>
                    <h4>{item?.totalAmount} <span>ر.س</span></h4>
                </div>
            </div>
        ))}
    </section>
  )
}

export default Orders