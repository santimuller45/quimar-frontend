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
    const { state } = useProducts();
    const listRubros = state.rubros;

    return (
        <div className={style.filtersContainer}>
            <h2 className={style.filtersTitle}>Rubros</h2>
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

// ----------- VER 2 -----------

// const Filters = ({ handleFilterBySubRubro }) => {
//     const listRubros = useSelector((state) => state.allRubros);

//     return (
//         <Nav className={style.filtersContainer}>
//             <Nav.Item>
//                 <Nav.Link className={style.filtersTitle}>RUBROS DE PRODUCTOS</Nav.Link>
//             </Nav.Item>
//             {listRubros?.map((rubro, index) => (
//                 <NavDropdown
//                     key={rubro.id}
//                     title={<><FontAwesomeIcon icon={faCircleChevronDown} /> {rubro.name}</>}
//                     className={style.navDropdown}
//                 >
//                     {rubro.subRubro?.map((sub, index2) => (
//                         <NavDropdown.Item
//                             key={index2}
//                             className={style.subRubroItem}
//                             onClick={() => handleFilterBySubRubro(sub)}
//                         >
//                             {sub}
//                         </NavDropdown.Item>
//                     ))}
//                 </NavDropdown>
//             ))}
//         </Nav>
//     );
// }

export default Filters;