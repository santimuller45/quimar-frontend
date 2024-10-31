import React from "react";
import style from "./LandingPage.module.css";

// LOGO ----->
import logo from '../../assets/logo.png';
//-------<

// COMPONENTS ---->
import { WhatsAppChat } from "../../components/indexComponents.js";
// <---------------

const LandingPage = () => (
    <>
        <div className={style.container}>
            <header className={style.headerLand}>
                <img src={logo} alt="Quimar logo" className={style.logo}/>
                <div>
                    <h1 className={style.textTitle}>Distribuidora Quimar</h1>
                    <p className={style.text}>Su socio confiable en el rubro de los artículos de ferretería</p>
                </div>
            </header>
            <section className={style.section}>
                <h2 className={style.textSubTitle}>Nuestros Rubros</h2>
                <ul className={style.rubList}>
                    <li>QUIMICOS Y DILUYENTES</li>
                    <li>ACCESORIOS PARA PINTURA</li>
                    <li>ARTICULOS DE LIMPIEZA Y VARIOS</li>
                    <li>ARTICULOS PARA LA CONSTRUCCION</li>
                    <li>FERRETERIA</li>
                    <li>PINTURAS</li>
                    <li>ZINGUERIA</li>
                    <li>MÁS...</li>
                </ul>
            </section>
            <section className={style.section}>
                <h2 className={style.textSubTitle}>Nuestra Misión</h2>                
                <p className={style.text}>En <strong>Quimar</strong>, nuestra misión es ofrecer una amplia gama de productos de ferretería</p>
                <p className={style.text}>que cumplan con los estándares más exigentes de calidad y rendimiento.</p>
                <p className={style.text}>Nos esforzamos por ser la primera opción para nuestros clientes, brindando soluciones integrales y un servicio excepcional.</p>
            </section>
            <section className={style.section}>
                <h2 className={style.textSubTitle}>Compromiso con la Calidad</h2>
                <p className={style.text}>En <strong>Quimar</strong>, la calidad es nuestra prioridad.</p>
                <p className={style.text}>Trabajamos con marcas reconocidas y garantizamos que cada producto en nuestro catálogo cumple con estrictos controles de calidad.</p>
                <p className={style.text}>Nuestro compromiso es asegurar que nuestros clientes obtengan productos fiables y duraderos.</p>
            </section>
            <section className={style.section}>
                <h2 className={style.textSubTitle}>Servicio al Cliente</h2>                
                <p className={style.text}>Nos enorgullecemos de ofrecer un servicio al cliente excepcional.</p>
                <p className={style.text}>Nuestro equipo de expertos está siempre disponible para asesorar y guiar a nuestros clientes en la elección de los productos adecuados para sus proyectos.</p>
                <p className={style.text}>En <strong>Quimar</strong>, valoramos cada interacción y nos esforzamos por construir relaciones duraderas basadas en la confianza y la satisfacción del cliente.</p>
            </section>
            <section className={style.section}>
                <h2 className={style.textSubTitle}>Visión de Futuro</h2>                
                <p className={style.text}>Estamos comprometidos a seguir creciendo y evolucionando para adaptarnos a las cambiantes necesidades del mercado.</p>
                <p className={style.text}>Innovación, calidad y servicio son los pilares que guían nuestro camino hacia el futuro.</p>
            </section>
            <div className={style.footer}>
                <h5>Gracias por elegir <strong>Quimar Distribuidora</strong>. Estamos aquí para ayudarle a hacer realidad sus proyectos con los mejores productos de ferretería.</h5>
            </div>
        </div>
        <WhatsAppChat />
    </>
);

export default LandingPage;