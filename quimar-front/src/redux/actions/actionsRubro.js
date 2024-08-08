import axios from "axios";
import { GET_ALL_RUBROS, GET_ALL_SUB_RUBROS, FILTER_BY_RUBRO } from "../types/typesRubros";

export const getAllRubrosDB = () => {
    return async function (dispatch) {
        try {
            let result = await axios.get('/rubro');
            return dispatch ({
                type: GET_ALL_RUBROS,
                payload: result.data
            })
        } catch (error) {
            return { error: error.message };
        }
    }
};

export const getAllSubRubrosDB = () => {
    return async function (dispatch) {
        try {
            let result = await axios.get('/subRubro');
            return dispatch ({
                type: GET_ALL_SUB_RUBROS,
                payload: result.data
            })
        } catch (error) {
            return { error: error.message };
        }
    }
};

export const filterByRubroDB = (rubname) => {
    return {
        type: FILTER_BY_RUBRO,
        payload: rubname
    };
};