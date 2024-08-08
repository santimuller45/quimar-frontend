import React from "react";
import style from './Contact.module.css';

//LOGO ----->
import logo from '../../assets/logo.png'
//-------<

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
// <-------------------

const Contact = () => {
    return (
        <div className={style.container}>
            <div className={style.headerLand}>
                <div>
                    <img src={logo} alt="Quimar logo" className={style.logo}/>
                </div>
                <div>
                    <h1 className={style.textTitle}><strong>Distribuidora Quimar</strong></h1>
                    <p className={style.text}><strong>Su socio confiable en el mundo de los artículos de ferretería</strong></p>
                </div>
            </div>
            <h2 className={style.textTitle}><strong>Pueden contactarnos via:</strong></h2>
            <section className={style.text}>
                <h4><FontAwesomeIcon icon={faWhatsapp}/> WHATSAPP +5492914438409</h4>
                <h4><FontAwesomeIcon icon={faEnvelope}/> EMAIL: quimardistribuidora@hotmail.com</h4>
                <h4><FontAwesomeIcon icon={faPhone}/> CEL +5492914438409</h4>
            </section>
        </div>
    )
};

export default Contact;