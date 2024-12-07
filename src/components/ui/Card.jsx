import React, { useEffect, useState } from 'react';
import cardImage from '../../assets/card.png';
import classes from './Card.module.scss';
import { FaCircleCheck, FaMinus, FaPlus } from 'react-icons/fa6';
import { BsCart3 } from 'react-icons/bs';
import { Fade } from 'react-awesome-reveal';
import { useLanguage } from '../../context/LanguageContext';
import { translate } from '../../utils/translations';


const Card = ({ item, handleModal, handleAddToCart,data }) => {
    const [count, setCount] = useState(1);
    const handleIncrement = () => setCount((prevCount) => prevCount + 1);
    const handleDecrement = () => setCount((prevCount) => Math.max(prevCount - 1, 1));
    const [cartAdded, setCartAdded] = useState(false)
    const {language} = useLanguage()
    const handleCart = (item) => {
        setCartAdded(true)
        setCount(1)
        handleAddToCart({
            id: item.id,
            name_ar: item.name_ar,
            name_he: item.name_he,
            description_ar: item.description_ar,
            description_he: item.description_he,
            variants: item.variants,
            price: item.price,
            count: count,
            image: item.image
        })
    }

    useEffect(() => {
        if (cartAdded) {
            setTimeout(() => {
                setCartAdded(false)
            }, 2000)
        }
    }, [cartAdded])
    return (
        <Fade cascade damping={0.1}>
            <div className={classes.card} key={item?.id} onClick={() => handleModal(item)}>
                <div className={classes.content}>
                    <img src={item?.image ? item?.image : cardImage} alt="card" />
                    <div className={classes.left}>
                        <div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <h4>{item?.[`name_${language}`]}</h4>
                                <div className={classes.tags}>
                                    {item?.types && item?.types?.map((item, i) => (
                                        <div key={i} className={classes.tag}>
                                            <span title={item?.[`name_${language}`]}>{item?.icon}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p>{item?.[`description_${language}`] && item?.[`description_${language}`]?.slice(0, 100)} {item?.[`description_${language}`]?.length > 100 && '...'}</p>
                        </div>
                        <div>
                            <h3 style={{color:data?.primary_color ? data?.primary_color : "#B57EDC"}}> {translate('price',language)} <span>{item?.price}</span> ₪</h3>
                        </div>
                    </div>
                </div>
                <div className={classes.actions} onClick={(e) => e.stopPropagation()}>
                    <div className={classes.count}>
                        <button style={{color:data?.primary_color ? data?.primary_color : "#B57EDC"}} onClick={(e) => { e.stopPropagation(); handleIncrement(); }}><FaPlus /></button>
                        <p>{count}</p>
                        <button style={{color:data?.primary_color ? data?.primary_color : "#B57EDC"}} onClick={(e) => { e.stopPropagation(); handleDecrement(); }}><FaMinus /></button>
                    </div>
                    <button
                        className={classes.addtocart}
                        onClick={(e) => { e.stopPropagation(); handleCart(item) }}
                        disabled={cartAdded}
                    >
                        <span>
                            {cartAdded ? translate('added',language) : translate('addToCart',language)}
                        </span>
                        {cartAdded ? <FaCircleCheck /> : <BsCart3 />}
                    </button>
                </div>
            </div>
        </Fade>
    );
};

export default Card;
