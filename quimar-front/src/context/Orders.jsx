import React, { createContext, useReducer } from 'react';
import axios from 'axios';

// Define el contexto
export const OrdersContext = createContext();

// Define el estado inicial
const initialState = {
    ordersPending: [],
    ordersCompleted:[],
    ordersCanceled:[],
    error: null
};

// TIPOS DE ACCION ---->
const ACTION_TYPES = {
    GET_ALL_ORDERS: 'GET_ALL_ORDERS',
    SET_NEW_ORDER: 'SET_NEW_ORDER',
    SET_ERROR: 'SET_ERROR'
};

const orderReducer = ( state , action ) => {

    switch ( action.type ) {

        case ACTION_TYPES.GET_ALL_ORDERS: {
            return {
                ...state,
                ordersPending: action.payload,
                ordersCompleted: action.payload2,
                ordersCanceled: action.payload3
            }
        }

        case ACTION_TYPES.SET_NEW_ORDER: {
            return state;
        };

        case ACTION_TYPES.SET_ERROR: {
            return {
                ...state,
                error: action.payload
            };
        }

        default: {
            return state;
        };
    }
};

export function OrderProvider ({ children }) {
    
    const [ orderState , dispatch ] = useReducer( orderReducer, initialState);
 
     const getAllOrders = async () => {
        try {
            const response = (await axios.get('/orders')).data;
            dispatch({ 
                type: ACTION_TYPES.GET_ALL_ORDERS, 
                payload:  response.orderPending,
                payload2: response.orderCompleted,
                payload3: response.orderCancel 
            });
        } catch (error) {
            dispatch({
                type: ACTION_TYPES.SET_ERROR,
                payload: error.message
            });
        }
    }
 
     const setNewOrder = async (order) => {
         try {
             const { listaPedido, amount, totalAmount, comentary, orderStatus, userEmail } = order;
             const response = (await axios.post('/orders/register-order', { listaPedido, amount, totalAmount, comentary, orderStatus, userEmail } )).data;
             if (response) dispatch ({ type: ACTION_TYPES.SET_NEW_ORDER });
         } catch (error) {
            dispatch({
                type: ACTION_TYPES.SET_ERROR,
                payload: error.message
            });
         }
     };
 
     return (
         <OrdersContext.Provider value={{ order : orderState, getAllOrders, setNewOrder }}>
             {children}
         </OrdersContext.Provider>
     )
 };