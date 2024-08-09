import { GET_ALL_PRODUCTS , GET_PRODUCT_BY_NAME } from "./types/typesProduct.js";
import { GET_ALL_RUBROS, GET_ALL_SUB_RUBROS, FILTER_BY_RUBRO } from "./types/typesRubros.js";

const initialState = {
    allProducts: [],
    products: [],
    allRubros: [],
    allSubRubros: [],
    allOrders:[],
    allUsers: [],
    userLogin: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS: {
            return {
                ...state,
                allProducts: action.payload,
                products: action.payload
            }
        };
        case GET_PRODUCT_BY_NAME: {
            return {
                ...state,
                products: action.payload
            }
        };
        case GET_ALL_RUBROS: {
            return {
                ...state,
                allRubros: action.payload
            }
        };
        case GET_ALL_SUB_RUBROS: {
            return {
                ...state,
                allSubRubros: action.payload
            }
        }
        case FILTER_BY_RUBRO: {

            let filteredSource;

            if (action.payload === "all") {
                filteredSource = state.allProducts;
            } else {
                // filteredSource = state.allProducts.filter(object => object.category === action.payload.name);
                // OPCIÓN 2
                filteredSource = state.allProducts.filter(elem => (elem.category).includes(action.payload));
            }

            return {
                ...state,
                products : filteredSource
            }
        };
        default: return {...state};
    }
}

export default rootReducer;