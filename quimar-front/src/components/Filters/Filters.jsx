import React from "react";
import { useSelector } from "react-redux";

const Filters = ( { handleFilterRubro, handleFilterRubro2 } ) => {

    const listRubros = useSelector(state => state.allRubros);
    const listSubRubros = useSelector(state => state.allSubRubros);

    return (
        <div>
            <div>
            <h1>ELIMINAR EL DE RUBRO</h1>
            Rubros:
            <select onChange={handleFilterRubro}>
                <option value='all'>Todos</option>
                { listRubros?.map((rubro,index) => (
                    <option value={rubro.name} key={index}> {rubro.name}</option>
                ))}
            </select>
            </div>

            <div>
            SubRubros:
            <select onChange={handleFilterRubro2}>
                <option value='all'>Todos</option>
                { listSubRubros?.map((subRubro,index) => (
                    <option value={subRubro} key={index}> {subRubro}</option>
                ))}
            </select>
            </div>
        </div>
    )
};

export default Filters;