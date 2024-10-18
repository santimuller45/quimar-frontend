import React from "react";
import style from './Filters.module.css';

// REACT BOOSTRAP ---->
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
// <-------------------

// CUSTOM HOOKS ----->
import { useProducts } from "../../customHooks/useProducts.js";
// <------------------

// FONT AWESOME ----->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faCircle } from "@fortawesome/free-solid-svg-icons";
// <------------------


const Filters = ({ handleFilterBySubRubro }) => {
    const { productState } = useProducts();
    const listRubros = productState.rubros;

    return (
        <div className={style.filtersContainer}>
            <h2 className={style.filtersTitle}>Rubros</h2>
            <Accordion>
                <Card className={style.accordionCard}>
                    <Card.Header onClick={() => handleFilterBySubRubro("all")}>
                        <CustomToggle ><FontAwesomeIcon icon={faCircleChevronDown}/> Ver todo</CustomToggle>
                    </Card.Header>
                </Card>
                {/* LISTA DE LOS RUBROS CON SUS SUBRUBROS */}
                {listRubros?.map((rubro, index) => (
                    <Card key={rubro.id} className={style.accordionCard}>
                        <Card.Header>
                            <CustomToggle eventKey={String(index)}><FontAwesomeIcon icon={faCircleChevronDown} /> {rubro.name}</CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={String(index)}>
                            <Card.Body>
                                {rubro.subRubro?.map((sub, index2) => (
                                    <div key={index2} className={style.subRubroItem}>
                                        <span 
                                            className={style.item}
                                            onClick={() => handleFilterBySubRubro(sub)}
                                        >
                                            <FontAwesomeIcon icon={faCircle} className={style.dot}/> {sub}
                                        </span>
                                    </div>
                                ))}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        </div>
    );
}

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
        <button
            type="button"
            className={`${style.accordionButton} btn btn-link`}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
};

export default Filters;