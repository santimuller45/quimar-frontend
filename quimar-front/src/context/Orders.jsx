import React, { createContext, useReducer } from 'react';
import axios from 'axios';
const urlApiOrders = import.meta.env.VITE_API_GET_ORDERS;
const urlApiDates = import.meta.env.VITE_API_GET_DATES;

// Define el contexto
export const OrdersContext = createContext();

// Define el estado inicial
const initialState = {
    allOrders: [],
    orders: [],
};

// TIPOS DE ACCION ---->
const ACTION_TYPES = {
    GET_ALL_ORDERS: 'GET_ALL_ORDERS',
    SET_NEW_ORDER: 'SET_NEW_ORDER',
    GET_ORDER_BY_ID: 'GET_ORDER_BY_ID',
    GET_ORDER_BY_USER: 'GET_ORDER_BY_USER',
    FILTER_BY_DATE: 'FILTER_BY_DATE',
};

const orderReducer = ( state , action ) => {

    switch ( action.type ) {

        case ACTION_TYPES.GET_ALL_ORDERS: {
            return {
                ...state,
                allOrders: action.payload,
                orders: action.payload,
            }
        }

        case ACTION_TYPES.SET_NEW_ORDER: {
            return state;
        };

        case ACTION_TYPES.GET_ORDER_BY_ID: {
            return {
                ...state,
                orders: [action.payload]
            }
        };

        case ACTION_TYPES.GET_ORDER_BY_USER: {
            return {
                ...state,
                orders: action.payload
            }
        };

        case ACTION_TYPES.FILTER_BY_DATE: {
            return {
                ...state,
                orders: action.payload
            }
        };

        default: {
            return state;
        };
    }
};

export function OrderProvider ({ children }) {
    
    const [ orderState , dispatch ] = useReducer( orderReducer, initialState);
 
    const getAllOrders = async () => {
        try {
            const response = await axios.get(urlApiOrders);
            dispatch({ 
                type: ACTION_TYPES.GET_ALL_ORDERS, 
                payload:  response.data,
            });
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const getByOrderID = async (orderID) => {
        try {
            const response = await axios.get(`${urlApiOrders}/${orderID}`);
            if (response) {
                dispatch ({
                    type: ACTION_TYPES.GET_ORDER_BY_ID,
                    payload: response.data
                })
            };
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const getOrderByUser = async (userNumber) => {
        try {
            const response = await axios.get(`${urlApiOrders}?userNumber=${userNumber}`);
            if (response) {
                dispatch ({
                    type: ACTION_TYPES.GET_ORDER_BY_USER,
                    payload: response.data
                })
            };
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const filterOrderByDate = async (day, month, year) => {
        try {
            const response = await axios.get(`${urlApiOrders}/filter-order?day=${day}&month=${month}&year=${year}`);
            if (response) {
                dispatch ({
                    type: ACTION_TYPES.FILTER_BY_DATE,
                    payload: response.data
                })
            };
        } catch (error) {   
            throw error.response?.data?.message || error.message;
        }
    };

    const getDateForOrders = async () => {
        try {
            const result = await axios.get(urlApiDates);
            if (result) return result.data;
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const setNewOrder = async (order) => {
        try {
            const { listaPedido, amount, totalAmount, comentary, orderStatus, userEmail } = order;
            const response = (await axios.post(`${urlApiOrders}/register-order`, { listaPedido, amount, totalAmount, comentary, orderStatus, userEmail } )).data;
            if (response) dispatch ({ type: ACTION_TYPES.SET_NEW_ORDER });
        } catch (error) {
           throw error.response?.data?.message || error.message;
        }
   };
 
    return (
        <OrdersContext.Provider value={{ orderState, getAllOrders, getByOrderID, getOrderByUser, filterOrderByDate, getDateForOrders, setNewOrder }}>
            {children}
        </OrdersContext.Provider>
    )
 };