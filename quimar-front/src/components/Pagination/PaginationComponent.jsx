import React from "react";
import style from "./Pagination.module.css";

// REACT BOOSTRAP ---->
import { Pagination } from 'react-bootstrap';
// <-------------------

function PaginationComponent ({ productPerPage, allProductsDB , paginado , currentPage }) {
    
    const pageNumbers = [];

    for (let i=1 ; i <= Math.ceil( allProductsDB / productPerPage ); i++) {
        pageNumbers.push(i)
    }

    const nextPageHandler = () => {
        const findCurrent = pageNumbers.find(num => num === currentPage)
        if (findCurrent === pageNumbers.length ) return;
        paginado(findCurrent + 1)
    }
    const prevPageHandler = () => {
        const findCurrent = pageNumbers.find(num => num === currentPage)
        if (findCurrent === 1 ) return;
        paginado(findCurrent - 1)
    }

    return (
        <Pagination>
            {pageNumbers.length > 0 && (
                <>
                    <Pagination.Prev onClick={prevPageHandler} />
                    {pageNumbers.map(number => (
                        <Pagination.Item
                            key={number}
                            active={number === currentPage}
                            onClick={() => paginado(number)}
                        >
                        {number}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={nextPageHandler} />
                </>
            )}
        </Pagination>     
    );
};

export default PaginationComponent;