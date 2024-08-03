import axios from "axios";
import { GET_ALL_PRODUCTS , GET_PRODUCT_BY_NAME } from "../types/typesProduct.js";

export const getAllProductsDB = () => {
    return async function (dispatch) {
        try {
            let result = await axios.get('/productos');
            return dispatch ({
                type: GET_ALL_PRODUCTS,
                payload: result.data
            })
        } catch (error) {
            return { error: error.message };
        }
    }
};

export const getProductByNameDB = (name) => {
    return async function (dispatch) {
        try {
            let result = await axios.get(`/productos?name=${name}`);
            if (result === null) throw Error('Menú no encontrado');
            return dispatch ({
                type: GET_PRODUCT_BY_NAME,
                payload: result.data
            })
        } catch (error) {
            return { error: error.message };
        }
    }
};