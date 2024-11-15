import React from "react";
import { createContext, useReducer } from "react";

export const ShopContext = createContext();

const initialState = JSON.parse(window.localStorage.getItem('order')) || [];

const ORDER_ACTION_TYPES = {
    ADD_TO_ORDER : 'ADD_TO_ORDER',
    DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
    REMOVE_FROM_ORDER : 'REMOVE_FROM_ORDER',
    CLEAN_ORDER : 'CLEAN_ORDER',
    TOTAL_ORDER: 'TOTAL_ORDER',
    SET_QUANTITY: 'SET_QUANTITY',
};

const updateOrderLocalStorage = (state) => window.localStorage.setItem('order', JSON.stringify(state));

const orderReducer = ( state , action ) => {

    const { type: actionType , payload: actionPayload } = action;

    switch ( actionType ) {

        case ORDER_ACTION_TYPES.ADD_TO_ORDER: {

            const { id } = actionPayload;
            const productInOrder = state.findIndex(item => item.id === id);

            if (productInOrder >= 0) {
                const newOrderState = structuredClone(state);
                newOrderState[productInOrder].quantity += 1;
                newOrderState[productInOrder].total = parseFloat((newOrderState[productInOrder].total + parseFloat(newOrderState[productInOrder].price)).toFixed(2));
                updateOrderLocalStorage(newOrderState);
                return newOrderState;
            }

            
            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1,
                    price: parseFloat(actionPayload.price),
                    total: parseFloat(actionPayload.price),
                }
            ];
            
            updateOrderLocalStorage(newState);
            return newState;
        };

        case ORDER_ACTION_TYPES.DECREMENT_QUANTITY: {
            const { id } = actionPayload;
            const productInOrder = state.findIndex(item => item.id === id);

            if (productInOrder >= 0) {
                const newOrderState = structuredClone(state);
                if (newOrderState[productInOrder].quantity > 1) {
                    newOrderState[productInOrder].quantity -= 1;
                    newOrderState[productInOrder].total = parseFloat((newOrderState[productInOrder].total - parseFloat(newOrderState[productInOrder].price)).toFixed(2));
                } else {
                    newOrderState.splice(productInOrder, 1);
                }
                updateOrderLocalStorage(newOrderState);
                return newOrderState;
            }
            return state;
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

        case ORDER_ACTION_TYPES.SET_QUANTITY: { // Nueva acción para actualizar la cantidad
            const { id, quantity } = actionPayload;
            const productIndex = state.findIndex(item => item.id === id);

            if (productIndex >= 0) {
                const newOrderState = structuredClone(state);
                newOrderState[productIndex].quantity = quantity;
                newOrderState[productIndex].total = parseFloat((quantity * newOrderState[productIndex].price).toFixed(2));
                updateOrderLocalStorage(newOrderState);
                return newOrderState;
            }
            return state;
        };

        case ORDER_ACTION_TYPES.TOTAL_ORDER: {
            const total = state.reduce((sum, item) => sum + parseFloat(item.total), 0);
            return { ...state, total: parseFloat(total.toFixed(2)) }; // Redondear el total
        }
        
        default: {
            return state;
        };
    }
};

export function ShopProvider ({ children }) {
    
   const [ shopState , dispatch ] = useReducer( orderReducer, initialState);


    const addToOrder = product => dispatch({ type: ORDER_ACTION_TYPES.ADD_TO_ORDER, payload: product });

    const decrementQuantity = product => dispatch({ type: ORDER_ACTION_TYPES.DECREMENT_QUANTITY, payload: product });

    const removeFromOrder = product => dispatch({ type: ORDER_ACTION_TYPES.REMOVE_FROM_ORDER, payload: product });

    const clearOrder = () => dispatch({ type: ORDER_ACTION_TYPES.CLEAN_ORDER });

    const setQuantity = (product, quantity) => dispatch({ type: ORDER_ACTION_TYPES.SET_QUANTITY, payload: { id: product.id, quantity } });

    const getTotalAmount = () => {
        const total = shopState.reduce((sum, item) => sum + parseFloat(item.total), 0);
        return total.toFixed(2); // Redondear a dos decimales
    };

    return (
        <ShopContext.Provider value={{ shop : shopState , addToOrder, decrementQuantity, removeFromOrder , clearOrder, setQuantity, totalOrderAmount: getTotalAmount() }}>
            {children}
        </ShopContext.Provider>
    )
};