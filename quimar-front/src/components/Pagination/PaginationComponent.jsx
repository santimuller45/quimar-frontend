import React from "react";

// REACT BOOSTRAP ---->
import { Pagination } from 'react-bootstrap';
// <-------------------
function PaginationComponent({ itemsPerPage, itemsDB, paginado, currentPage }) {
    const totalPages = Math.ceil(itemsDB / itemsPerPage);
    const pageNumbers = [];
    const maxPagesToShow = 6;

    // Calcula los números de página a mostrar
    let startPage, endPage;
    if (totalPages <= maxPagesToShow) {
        // Si hay menos de maxPagesToShow páginas, muestra todas
        startPage = 1;
        endPage = totalPages;
    } else {
        // Si hay más de maxPagesToShow páginas, calcula el rango de páginas a mostrar
        const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // Caso: al principio
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // Caso: al final
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            // Caso: en el medio
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const nextPageHandler = () => {
        if (currentPage < totalPages) {
            paginado(currentPage + 1);
        }
    };

    const prevPageHandler = () => {
        if (currentPage > 1) {
            paginado(currentPage - 1);
        }
    };

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
                    {endPage < totalPages && (
                        <Pagination.Ellipsis disabled />
                    )}
                    <Pagination.Next onClick={nextPageHandler} />
                </>
            )}
        </Pagination>
    );
}

export default PaginationComponent;