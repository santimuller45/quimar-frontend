import { createContext, useReducer } from "react";
import axios from "axios";

export const UserContext = createContext();

const initialState = {
    user: JSON.parse(window.localStorage.getItem('user')) || {},
    allUsers: [],
    error: null
};

const USER_ACTION_TYPES = {
    REGISTER_USER : 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER : 'LOGOUT_USER',
    GET_ALL_USERS : 'GET_ALL_USERS',
    GET_USER : 'GET_USER',
    SET_ERROR: 'SET_ERROR'
};

const updateUserLocalStorage = (user) => window.localStorage.setItem('user', JSON.stringify(user));

const userReducer = ( state , action ) => {

    switch ( action.type ) {

        case USER_ACTION_TYPES.REGISTER_USER: {
            return state;
        }

        case USER_ACTION_TYPES.LOGIN_USER: {
            return {
                ...state,
                user: action.payload,
                error: null
            };
        };

        case USER_ACTION_TYPES.LOGOUT_USER: {
            return {
                ...state,
                user: {},
                error: null
            };
        };

        case USER_ACTION_TYPES.GET_ALL_USERS: {
           return {
                ...state,
                allUsers: action.payload,
                error: null
           };
        };

        case USER_ACTION_TYPES.SET_ERROR: {
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

export const UserProvider = ({ children }) => {

    const [ state, dispatch] = useReducer( userReducer, initialState);

    const registerUser = async ( form ) => {
        try {
            const response = (await axios.post('/users/register', form)).data;
            dispatch({ 
                type: USER_ACTION_TYPES.REGISTER_USER, 
                payload: response 
            });
        } catch (error) {
            dispatch({ 
                type: USER_ACTION_TYPES.SET_ERROR, 
                payload: error.message 
            });
        }
    }

    const userLogin = async ( user ) => {
        try {
            const response = (await axios.post('/users/login', user )).data;
            updateUserLocalStorage(response);
            dispatch({ 
                type: USER_ACTION_TYPES.LOGIN_USER, 
                payload: response 
            });
        } catch (error) {
            dispatch({ 
                type: USER_ACTION_TYPES.SET_ERROR, 
                payload: error.message
            });
        }
    };

    const userLogOut = () => {
        window.localStorage.removeItem('user');
        dispatch({ 
            type: USER_ACTION_TYPES.LOGOUT_USER 
        });
    };

    const getAllUsers = async () => {
        try {
            const response = (await axios('/users')).data;
            dispatch({ 
                type: USER_ACTION_TYPES.GET_ALL_USERS, 
                payload: response
            });
        } catch (error) {
            dispatch({ 
                type: USER_ACTION_TYPES.SET_ERROR, 
                payload: error.message 
            });
        }
    };

    return (
        <UserContext.Provider value={{ state , registerUser, userLogin, userLogOut, getAllUsers }}>
            { children }
        </UserContext.Provider>
    );
};