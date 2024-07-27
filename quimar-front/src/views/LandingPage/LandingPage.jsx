import React from "react";
import style from "./LandingPage.module.css"

//LOGO ----->
import logo from '../../assets/logo.png'
//-------<

//COMPONENTES
// import CarouselHero from "../../components/CarouselHero/CarouselHero.jsx";
//>

const LandingPage = () => {

    return (
        <div className={style.container}>
            <div className={style.headerLand}>
                <div>
                    <img src={logo} alt="Quimar logo" className={style.logo}/>
                </div>
                <div>
                    <h1><strong>Distribuidora Quimar</strong></h1>
                    <p><strong>Su socio confiable en el mundo de los artículos de ferretería</strong></p>
                </div>
            </div>
            <section className={style.section}>
                <h2><strong>Nuestros Rubros</strong></h2>
                <ul className={style.rubList}>
                    <li>ACCESORIOS PARA PINTURA</li>
                    <li>ARTICULOS DE LIMPIEZA Y VARIOS</li>
                    <li>ARTICULOS PARA LA CONSTRUCCION</li>
                    <li>AUTOMOTOR</li>
                    <li>FERRETERIA</li>
                    <li>INSECTICIDAS Y RATICIDAS</li>
                    <li>PINTURAS</li>
                    <li>POLIETILENO Y AGROTILENO</li>
                    <li>PRODUCTOS PARA PILETAS</li>
                    <li>QUIMICOS Y DILUYENTES</li>
                    <li>ZINGUERIA</li>
                    <li>MÁS...</li>
                </ul>
            </section>
            <section className={style.section}>
                <h2><strong>Nuestra Misión</strong></h2>
                    <p>En <strong>Quimar</strong>, nuestra misión es ofrecer una amplia gama de productos de ferretería que cumplan con los estándares más exigentes de calidad y rendimiento.</p>
                    <p>Nos esforzamos por ser la primera opción para nuestros clientes, brindando soluciones integrales y un servicio excepcional.</p>
            </section>
            <section className={style.section}>
                <h2><strong>Compromiso con la Calidad</strong></h2>
                    <p>En <strong>Quimar</strong>, la calidad es nuestra prioridad. Trabajamos con marcas reconocidas y garantizamos que cada producto en nuestro catálogo cumple con estrictos controles de calidad.</p>
                    <p>Nuestro compromiso es asegurar que nuestros clientes obtengan productos fiables y duraderos.</p>
            </section>
            <section className={style.section}>
                <h2><strong>Servicio al Cliente</strong></h2>
                <p>
                    Nos enorgullecemos de ofrecer un servicio al cliente excepcional. Nuestro equipo de expertos está siempre disponible para asesorar y guiar a nuestros clientes en la elección de los productos adecuados para sus proyectos.
                </p>
                <p>En <strong>Quimar</strong>, valoramos cada interacción y nos esforzamos por construir relaciones duraderas basadas en la confianza y la satisfacción del cliente.</p>
            </section>
            <section className={style.section}>
                <h2><strong>Visión de Futuro</strong></h2>
                <p>
                    Estamos comprometidos a seguir creciendo y evolucionando para adaptarnos a las cambiantes necesidades del mercado. Innovación, calidad y servicio son los pilares que guían nuestro camino hacia el futuro.
                </p>
            </section>
            <div className={style.footer}>
                <h5>Gracias por elegir <strong>Quimar Distribuidora</strong>. Estamos aquí para ayudarle a hacer realidad sus proyectos con los mejores productos de ferretería.</h5>
            </div>
        </div>
)};

export default LandingPage;