import React, { useEffect, useState } from 'react';
import cardImage from '../../assets/card.png';
import classes from './Card.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaCircleCheck, FaMinus, FaPlus } from 'react-icons/fa6';
import { BsCart3 } from 'react-icons/bs';


const Card = ({ item,handleModal,handleAddToCart }) => {
    const [count,setCount] = useState(1);
    const handleIncrement = () => setCount((prevCount) => prevCount + 1);
    const handleDecrement = () => setCount((prevCount) => Math.max(prevCount - 1, 1));
    const [cartAdded, setCartAdded] = useState(false)

    const handleCart = (item) => {
        setCartAdded(true)
        setCount(1)
        handleAddToCart({
            id:item.id,
            name:item.name,
            description:item.description,
            variants:item.variants,
            
            price:item.price,
            count:count,
            image:item.image
        })
    }

    useEffect(() => {
        if(cartAdded) {
          setTimeout(() => {
            setCartAdded(false)
          }, 2000)
        }
      }, [cartAdded])
    return (
        <div className={classes.card} onClick={() => handleModal(item)}>
         
            <div className={classes.content}>
                <img src={item?.image || cardImage} alt="card" />
                <div className={classes.left}>
                    <div>
                    <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
                        <h4>{item?.name}</h4>
                        <div className={classes.tags}>
                            {item?.types && item?.types?.map((item, i) => (
                                <div key={i} className={classes.tag}>
                                    <span title={item?.name}>{item?.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                      
                        <p>{item?.description && item?.description.slice(0, 100)} {item?.description?.length > 100 && '...'}</p>
                    </div>
                    <div>
                     
                        <h3> السعر <span>{item?.price}</span> ₪</h3>
                    </div>
                </div>
            </div>
            <div className={classes.actions} onClick={(e) => e.stopPropagation()}>
                <div className={classes.count}>
                    <button onClick={(e) => { e.stopPropagation(); handleIncrement(); }}><FaPlus /></button>
                    <p>{count}</p>
                    <button onClick={(e) => { e.stopPropagation(); handleDecrement(); }}><FaMinus /></button>
                </div>
                <button 
                    className={classes.addtocart} 
                    onClick={(e) => { e.stopPropagation(); handleCart(item) }}
                        disabled={cartAdded}
                    >
                            {cartAdded ? 'تمت الإضافة الي الطلبية' : 'أضف إلى الطلبية'}
                            {cartAdded ? <FaCircleCheck/>  : <BsCart3 />}
                </button>
            </div>
           
        </div>
    );
};

export default Card;
