import React from "react";
import { createContext, useReducer } from "react";

export const ShopContext = createContext();

const initialState = JSON.parse(window.localStorage.getItem('order')) || [];

const ORDER_ACTION_TYPES = {
    ADD_TO_ORDER : 'ADD_TO_ORDER',
    REMOVE_FROM_ORDER : 'REMOVE_FROM_ORDER',
    CLEAN_ORDER : 'CLEAN_ORDER',
    TOTAL_ORDER: 'TOTAL_ORDER'
};

const updateOrderLocalStorage = (state) => window.localStorage.setItem('order', JSON.stringify(state));

const reducer = ( state , action ) => {

    const { type: actionType , payload: actionPayload } = action;

    switch ( actionType ) {

        case ORDER_ACTION_TYPES.ADD_TO_ORDER: {

            const { id } = actionPayload;
            const productInOrder = state.findIndex(item => item.id === id);

            if (productInOrder >= 0) {
                const newOrderState = structuredClone(state);
                newOrderState[productInOrder].quantity += 1;
                newOrderState[productInOrder].total += newOrderState[productInOrder].price;
                updateOrderLocalStorage(newOrderState);
                return newOrderState;
            }

            
            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1,
                    total: actionPayload.price
                }
            ];
            
            updateOrderLocalStorage(newState);
            return newState;
        };

        case ORDER_ACTION_TYPES.REMOVE_FROM_ORDER: {
            
            const { id } = actionPayload;
            const newState = state.filter( item => item.id !== id);

            updateOrderLocalStorage(newState);
            return newState;
        };

        case ORDER_ACTION_TYPES.CLEAN_ORDER: {
            updateOrderLocalStorage([]);
            return []; 
        };

        case ORDER_ACTION_TYPES.TOTAL_ORDER: {
            const total = state.reduce((sum, item) => sum + item.total, 0);
            return { ...state, total };
        }
        
        default: {
            return state;
        };
    }
};

export function ShopProvider ({ children }) {
    
   const [ orderState , dispatch ] = useReducer( reducer, initialState);


    const addToOrder = product => dispatch({ type: ORDER_ACTION_TYPES.ADD_TO_ORDER, payload: product });

    const removeFromOrder = product => dispatch({ type: ORDER_ACTION_TYPES.REMOVE_FROM_ORDER, payload: product });

    const clearOrder = () => dispatch({ type: ORDER_ACTION_TYPES.CLEAN_ORDER });

    const getTotalAmount = () => orderState.reduce((sum, item) => sum + item.total, 0);

    return (
        <ShopContext.Provider value={{ order : orderState , addToOrder, removeFromOrder , clearOrder, totalOrderAmount: getTotalAmount() }}>
            {children}
        </ShopContext.Provider>
    )
};