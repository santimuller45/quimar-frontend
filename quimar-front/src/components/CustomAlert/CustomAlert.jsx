import React from 'react';
import style from './CustomAlert.module.css'; // Crea este archivo CSS

const CustomAlert = ({ message, type }) => {
    return (
        <div className={style.alertContainer}>
            { type === true 
                ?   
                <div className={style.alertSuccess}>
                    <span className={style.alertMessage}>{message}</span>
                </div>
                : 
                <div className={style.alertError}>
                    <span className={style.alertMessage}>{message}</span>
                </div>
            }
        </div>
    );
};

export default CustomAlert;