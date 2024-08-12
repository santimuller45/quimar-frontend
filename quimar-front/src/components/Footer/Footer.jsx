import React from "react";
import { Link } from "react-router-dom";
import style from './Footer.module.css';

//LOGO ----->
import logo from '../../assets/logo.png'
//-------<

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
// <-------------------

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.logoSection}>
                <img
                    src={logo}
                    className={style.logo}
                    alt="Quimar logo"
                />
                <h4><strong>Distribuidora Quimar</strong></h4>
            </div>
            <div className={style.menuSection}>
                <h4>MENU</h4>
                <nav aria-label="Footer Navigation">
                    {/* CAMBIAR LAS DIRECCIONES DEL LINK */}
                    <Link to={'/'} className={style.link}>Inicio</Link>
                    <Link to={'/products'} className={style.link}>Productos</Link>
                    <Link to={'/about-us'} className={style.link}>Nosotros</Link>
                    <Link to={'/contact-us'} className={style.link}>Contacto</Link>
                </nav>
            </div>
            <div className={style.menuSection}>
                <nav aria-label="Footer Navigation">
                    <h6><FontAwesomeIcon icon={faWhatsapp}/> WHATSAPP +5492914438409</h6>
                    <h6><FontAwesomeIcon icon={faEnvelope}/> EMAIL: quimardistribuidora@hotmail.com</h6>
                    <h6><FontAwesomeIcon icon={faPhone}/> CEL +5492914438409</h6>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;