import axios from "axios";
import { GET_ALL_RUBROS, GET_SUB_FROM_RUBRO, GET_ALL_SUB_RUBROS, FILTER_BY_RUBRO } from "../types/typesRubros";

export const getAllRubrosDB = () => {
    return async function (dispatch) {
        try {
            let result = (await axios.get('/rubro')).data;
            return dispatch ({
                type: GET_ALL_RUBROS,
                payload: result,
            });
        } catch (error) {
            return { error: error.message };
        }
    }
};

export const getSubFromRubName = (name) => {
    return async function (dispatch) {
        try {
            let result = (await axios.get(`/rubro?name=${name}`)).data;
            let subResult = [];
            for (let cat of result) {
                subResult = subResult.concat(cat.subRubro);
            }
            return dispatch ({
                type: GET_SUB_FROM_RUBRO ,
                payload: subResult
            });
        } catch (error) {
            return { error: error.message };
        }
    }
};

export const getAllSubRubrosDB = () => {
    return async function (dispatch) {
        try {
            let result = (await axios.get('/subRubro')).data;
            return dispatch ({
                type: GET_ALL_SUB_RUBROS,
                payload: result
            });
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