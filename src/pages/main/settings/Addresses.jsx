import React, { useEffect, useState } from 'react'
import classes from './Addresses.module.scss'
import { GoPlus } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import { Radio } from '@mui/material'
import { PiPencilSimpleLine } from 'react-icons/pi'
import { BsArrowLeft } from 'react-icons/bs'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, editAddress, getAddresses } from '../../../store/slices/mainReducer'
const Addresses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {addressesLoading , addressesError,deleteAddressLoading,deleteAddressError,editAddressLoading,editAddressError} = useSelector(state => state.main)
  const [addresses,setAddresses] = useState([])
  const [selectedValue, setSelectedValue] = useState(0);

  const handleSetCurrent = (address) => {
    dispatch(editAddress({
      buildingName: address.buildingName,
      streetName: address.streetName,
      tradeMark: address.tradeMark,
      apartmentNumber: address.apartmentNumber,
      floor: address.floor,
      phoneNumber: address.phoneNumber,
      defaultAddress: true,
      id: address.id,
      userId: address.userId
    })).then(res => {
        dispatch(getAddresses()).then((res) => {
        setAddresses(res?.payload)
      })
    })
  }

  const handleDelete = (address) => {
    dispatch(deleteAddress(address)).then((res) => {
      dispatch(getAddresses()).then((res) => {
        setAddresses(res?.payload)
      })
    })
  }

  useEffect(() => {
    dispatch(getAddresses()).then((res) => {
      setAddresses(res?.payload)
    })
  }, [])
  
  return (
    <section className={classes.container}>
      <div className={classes.header}>
          <Link to={'/settings/addresses/add-address'} className={classes.addBtn}>
          اضافة عنوان جديد <GoPlus />
          </Link>
          <h3>العناوين</h3>
          <button className={classes.backBtn} onClick={() => navigate(-1)}>
                <BsArrowLeft/>
        </button>
      </div>
      <div className={classes.addresses}>
        {addresses?.map((address,i) => (
          <div className={classes.address}>
              <button className={classes.useCurrent} style={{backgroundColor:address?.defaultAddress === true && 'var(--purpleColor)',color:address?.defaultAddress === true && 'var(--whiteColor)'}} onClick={() => {handleSetCurrent(address); setSelectedValue(i)}}>
                <Radio
                    sx={{
                        '&.Mui-checked': {
                          color: 'white',
                        },
                      }}
                    checked={address?.defaultAddress === true}
                    onChange={() => {}}
                    value={address?.defaultAddress}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                    />
                    تحديد كعنوان رئيسي
              </button>
              <p className={classes.text}>{address?.buildingName}, {address?.streetName}, {address?.tradeMark}, {address?.apartmentNumber}, {address?.floor} / {address?.phoneNumber}</p>
              <div className={classes.actions}>
                <Link to={`/settings/addresses/edit-address/${address?.id}`} className={classes.editBtn}>
                <PiPencilSimpleLine />
                تعديل العنوان 
                </Link>
                <button className={classes.deleteBtn} onClick={() => handleDelete(address)}>
                  <HiOutlineTrash />
                </button>
              </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Addresses