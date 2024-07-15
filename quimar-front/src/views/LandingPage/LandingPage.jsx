import React from "react";
import style from "./LandingPage.module.css"

import CardContainer from "../../components/CardContainer/CardContainer.jsx";


//COMPONENTES
// import CarouselHero from "../../components/CarouselHero/CarouselHero.jsx";
//>

const LandingPage = () => {

    return (
        <div> 
            <header><h3 className={style.text}><strong>PÁGINA INICIAL DE DISTRIBUIDORA QUIMAR</strong></h3></header>
            <section>
                <CardContainer/>
            </section>
        </div>
    )
};

export default LandingPage;