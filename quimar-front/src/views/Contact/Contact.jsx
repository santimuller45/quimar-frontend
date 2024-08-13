import React from "react";
import style from './Contact.module.css';

//LOGO ----->
import logo from '../../assets/logo.png'
//-------<

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
// <-------------------

const contactDetails = [
    { icon: faWhatsapp, label: 'WHATSAPP', value: '+5492914438409' },
    { icon: faEnvelope, label: 'EMAIL', value: 'quimardistribuidora@hotmail.com' },
    { icon: faPhone, label: 'CEL', value: '+5492914438409' }
];

const Contact = () => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1 className={style.textTitle}><strong>Distribuidora Quimar</strong></h1>
                <p className={style.text}><strong>Su socio confiable en el mundo de los artículos de ferretería</strong></p>
            </div>
            <h2 className={style.textTitle}><strong>Pueden contactarnos via:</strong></h2>
            <section className={style.contactSection}>
                {contactDetails.map(({ icon, label, value }, index) => (
                    <h4 key={index} className={style.contactItem}>
                        <FontAwesomeIcon icon={icon} /> {label}: {value}
                    </h4>
                ))}
            </section>
        </div>
    )
};

export default Contact;