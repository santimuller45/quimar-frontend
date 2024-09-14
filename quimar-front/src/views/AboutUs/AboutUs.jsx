import React from "react";
import style from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>Sobre Nosotros</h1>
            <section className={style.section}>
                <p><strong>Quimar</strong> es una empresa líder en la distribución de artículos de ferretería en Argentina.</p>
                <p>Ubicados en Bahía Blanca, Buenos Aires, nos especializamos en ofrecer una amplia gama de productos de alta calidad para satisfacer las necesidades de nuestros clientes en todo el país.</p>
                <p>Desde nuestra fundación, nos hemos comprometido a brindar un servicio excepcional y productos confiables.</p>
                <p>En <strong>Quimar</strong>, entendemos la importancia de contar con productos de calidad y un servicio de entrega eficiente.</p>
                <p>Por ello, utilizamos transportes confiables para garantizar que tus pedidos lleguen a tiempo y en perfectas condiciones a cualquier punto del país.</p>
                <p>Nuestro equipo de expertos está siempre disponible para asesorarte y ayudarte a encontrar las soluciones adecuadas para tus proyectos.</p>
                <p>Estamos dedicados a ofrecer la mejor experiencia de compra y a construir relaciones duraderas con nuestros clientes.</p>
                <p> Gracias por elegirnos. Estamos aquí para ayudarte a realizar tus proyectos con éxito.</p>
            </section>
            <section className={style.section}>
                <p className={style.subTitle}><strong>Quimar</strong></p>
                <p><strong>Ubicación: Bahía Blanca, Buenos Aires, Argentina</strong></p>
                <p>Envíos a todo el país</p>
                <p>Para más información o para realizar un pedido, no dudes en contactarnos.</p>
                <p>¡Estamos aquí para servirte!</p>
            </section>
        </div>
    )
};

export default AboutUs;