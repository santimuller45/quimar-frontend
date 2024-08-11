import React from "react";
import style from './Filters.module.css';
import { useSelector } from "react-redux";

import { Accordion, Card, useAccordionButton } from 'react-bootstrap';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";


const Filters = ({ handleFilterBySubRubro }) => {
    const listRubros = useSelector((state) => state.allRubros);

    return (
        <div className={style.filtersContainer}>
            <h5 className={style.filtersTitle}>RUBROS DE PRODUCTOS</h5>
            <Accordion>
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
                                        <FontAwesomeIcon icon={faCircleChevronRight} /> {sub}
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
};

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
}

export default Filters;