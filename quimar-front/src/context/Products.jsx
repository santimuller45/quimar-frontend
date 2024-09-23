import React, { createContext, useReducer } from 'react';
import axios from 'axios';

// Define el contexto
export const ProductContext = createContext();

// Define el estado inicial
const initialState = {
    allProducts: [],
    products: [],
    rubros: [],
    error: null
};

// TIPOS DE ACCION ---->
const ACTION_TYPES = {
    GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
    GET_PRODUCT_BY_NAME: 'GET_PRODUCT_BY_NAME',
    GET_ALL_RUBROS: 'GET_ALL_RUBROS',
    FILTER_BY_RUBRO: 'FILTER_BY_RUBRO',
    SET_ERROR: 'SET_ERROR'
};
// <----------------------------------

// Define el reducer
const productReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_PRODUCTS: {
            return {
                ...state,
                allProducts: action.payload,
                products: action.payload,
                error: null
            };
        }

        case ACTION_TYPES.GET_PRODUCT_BY_NAME: {
            return {
                ...state,
                products: action.payload,
                error: null
            };
        }

        case ACTION_TYPES.GET_ALL_RUBROS: {
            return {
                ...state,
                rubros: action.payload,
                error: null
            };
        }

        case ACTION_TYPES.FILTER_BY_RUBRO: {

            const filteredSource = action.payload === 'all'
            ? state.allProducts
            : state.allProducts.filter(elem => (elem.category).includes(action.payload));

            return {
                ...state,
                products : filteredSource,
                error: null
            }
        };

        case ACTION_TYPES.SET_ERROR: {
            return {
                ...state,
                error: action.payload
            };
        }

        default:
            return state;
    }
};


export const ProductProvider = ({ children }) => {
    const [productState, dispatch] = useReducer(productReducer, initialState);

    const getAllProducts = async () => {
        try {
            const result = (await axios.get('/productos')).data;
            dispatch({
                type: ACTION_TYPES.GET_ALL_PRODUCTS,
                payload: result
            });
        } catch (error) {
            dispatch({
                type: ACTION_TYPES.SET_ERROR,
                payload: error.message
            });
        }
    };

    const getProductByName = async (product) => {
        try {
            let result;

            // Verifica si 'product' es un nombre
            if (typeof product === 'string' && isNaN(product)) {
                result = (await axios.get(`/productos?name=${product}`)).data;
            } else {
                // Si no es un nombre, asume que es un código
                result = (await axios.get(`/productos?code=${product}`)).data;
            }
    
            // Verifica si el resultado está vacío o no
            if (!result || Object.keys(result).length === 0) {
                throw new Error('Producto no encontrado');
            }
    
            dispatch({
                type: ACTION_TYPES.GET_PRODUCT_BY_NAME,
                payload: result
            });
            
        } catch (error) {
            dispatch({
                type: ACTION_TYPES.SET_ERROR,
                payload: error.message
            });
        }
    };

    const getAllRubros = async () => {
        try {
            const result = (await axios.get('/rubro')).data;
            dispatch({
                type: ACTION_TYPES.GET_ALL_RUBROS,
                payload: result
            });
        } catch (error) {
            dispatch({
                type: ACTION_TYPES.SET_ERROR,
                payload: error.message
            });
        }
    };

    const addProduct = async (data) => {
        try {
            const response = await axios.post('/productos/register-product', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const updateProducts = async (data) => {
        try {
            const response = await axios.put('/productos/config-products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const filterByRubro = (rubname) => {
        dispatch({
            type: ACTION_TYPES.FILTER_BY_RUBRO,
            payload: rubname
        });
    };

    return (
        <ProductContext.Provider value={{ productState, getAllProducts, getProductByName, getAllRubros, addProduct, updateProducts, filterByRubro }}>
            {children}
        </ProductContext.Provider>
    );
};