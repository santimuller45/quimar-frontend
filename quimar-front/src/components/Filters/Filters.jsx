import React from "react";
import { useSelector } from "react-redux";

const Filters = ( { handleFilterRubro, handleFilterRubro2 } ) => {

    const listRubros = useSelector(state => state.allRubros);
    const listSubFromRubros = useSelector(state => state.subFromRub);
    // const listSubRubros = useSelector(state => state.allSubRubros);

    return (
        <div>
            <div className="div1">
                <h1>ELIMINAR EL DE RUBRO</h1>
                Rubros:
                <select onChange={handleFilterRubro}>
                    <option value='all'>Todos</option>
                    { listRubros?.map((rubro,index) => (
                        <option value={rubro.name} key={index}> {rubro.name}</option>
                    ))}
                </select>
            </div>

            <div className="div2">
                SubfromRub:
                <select onChange={handleFilterRubro2}>
                    <option value=''>-</option>
                    { listSubFromRubros?.map((elem,index) => (
                        <option value={elem} key={index}> {elem}</option>
                    ))}
                </select>
            </div>
        </div>
    )
};

export default Filters;