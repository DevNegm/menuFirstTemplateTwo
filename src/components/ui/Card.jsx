import React from 'react';
import cardImage from '../../assets/card.png';
import classes from './Card.module.scss';
import { useNavigate } from 'react-router-dom';


const Card = ({ item,handleModal }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.card} onClick={() => handleModal(item)}>
         
            <div className={classes.content}>
                <img src={item?.image || cardImage} alt="card" />
                <div className={classes.left}>
                    <div>
                        <h4>{item?.name}</h4>
                        <p>{item?.description && item?.description.slice(0, 150)} {item?.description?.length > 150 && '...'}</p>
                    </div>
                    <div>
                        <div className={classes.tags}>
                            {item?.types && item?.types?.map((item, i) => (
                                <div key={i} className={classes.tag}>
                                    <span title={item?.name}>{item?.icon}</span>
                                </div>
                            ))}
                        </div>
                        <h3> السعر <span>{item?.price}</span> ₪</h3>
                    </div>
                </div>
            </div>
            <div className={classes.actions} onClick={(e) => e.stopPropagation()}>
                <button 
                    className={classes.addtocart} 
                    onClick={(e) => { e.stopPropagation(); navigate('/') }}
                    >
                   اطلب الان
                </button>
            </div>
           
        </div>
    );
};

export default Card;
