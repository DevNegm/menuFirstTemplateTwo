import React, { useState } from 'react'
import classes from './Cards.module.scss'
import Card from './Card'
const Cards = ({data,header,sectionId,handleModal,handleAddToCart}) => {
  return (
    <div className={classes.section} id={sectionId}>
        <div className={classes.sectionHeader}>
            <h3>{header}</h3>
        </div>
        <div className={classes.container}>
          {data?.map((item, i) => (
                <Card key={item?.id} 
                  handleModal={handleModal} 
                  item={item}  
                  handleAddToCart={handleAddToCart}  
                  />
            ))}
        </div>
    </div>
  )
}

export default Cards