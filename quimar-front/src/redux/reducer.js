import { GET_ALL_PRODUCTS , GET_PRODUCT_BY_NAME } from "./types/typesProduct.js";

const initialState = {
    allProducts: [],
    allOrders:[],
    allUsers: [],
    userLogin: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS: {
            return {
                ...state,
                allProducts: action.payload
            }
        };
        case GET_PRODUCT_BY_NAME: {
            return {
                ...state,
                allProducts: action.payload
            }
        };
        default: return {...state};
    }
}

export default rootReducer;