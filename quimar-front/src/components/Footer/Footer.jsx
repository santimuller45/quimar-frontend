import React from "react";
import { Link } from "react-router-dom";
import style from './Footer.module.css';

//LOGO ----->
import logo from '../../assets/logo.png'
//-------<

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
// <-------------------


// FALTA AGREGAR MIS DATOS EN EL FOOTER COMO CREADOR

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
                <h4>MENÚ</h4>
                <nav aria-label="Footer Navigation">
                    <Link to={'/'} className={style.link} aria-label="Inicio">Inicio</Link>
                    <Link to={'/products'} className={style.link} aria-label="Productos">Productos</Link>
                    <Link to={'/about-us'} className={style.link} aria-label="Nosotros">Nosotros</Link>
                    <Link to={'/contact-us'} className={style.link} aria-label="Contacto">Contacto</Link>
                </nav>
            </div>
            <div className={style.menuSection}>
                <nav aria-label="Información de contacto">
                    <h6><FontAwesomeIcon icon={faWhatsapp}/> WHATSAPP: +54 9 291 443-8409</h6>
                    <h6><FontAwesomeIcon icon={faEnvelope}/> EMAIL: quimardistribuidora@hotmail.com</h6>
                    <h6><FontAwesomeIcon icon={faPhone}/> TELÉFONO: +54 9 291 443-8409</h6>
                    <h6><FontAwesomeIcon icon={faGithub}/> DESARROLLADOR WEB: santiagomuller45@gmail.com</h6>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;