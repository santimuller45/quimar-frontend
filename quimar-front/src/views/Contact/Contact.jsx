import React from "react";
import style from './Contact.module.css';

//LOGO ----->
// import logo from '../../assets/logo.png';
//-------<

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
// <-------------------

const contactDetails = [
    { icon: faEnvelope, label: 'EMAIL', value: 'quimardistribuidora@hotmail.com' },
    { icon: faWhatsapp, label: 'WHATSAPP', value: '+5492914438409' },
    { icon: faPhone, label: 'CEL', value: '+5492914438409' }
];

const Contact = () => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1 className={style.mainTitle}><strong>Distribuidora Quimar</strong></h1>
                <p className={style.text}>Su socio confiable en el rubro de los artículos de ferretería</p>
                <p className={style.text}>de Pegurri Marcos Ariel</p>
                <p className={style.text}>CUIT: <strong>20-23130541-7</strong></p>
            </div>
            <h2 className={style.title}><strong>Pueden contactarnos via:</strong></h2>
            <section className={style.contactSection}>
                {contactDetails.map(({ icon, label, value }, index) => (
                    <h4 key={index} className={style.contactItem}>
                        <FontAwesomeIcon icon={icon} /> {label}: <strong> {value} </strong>
                    </h4>
                ))}
            </section>
            <section className={style.header}>
                <h2 className={style.title}>Nuestros Horarios</h2>
                <br/>
                <h4 className={style.subTitle}>Lunes a viernes</h4>
                <h6 className={style.text}>08:30 hs - 16:30hs</h6>
            </section>
        </div>
    )
};

export default Contact;