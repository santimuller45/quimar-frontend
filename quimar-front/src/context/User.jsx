import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const initialState = {
    user: JSON.parse(window.localStorage.getItem('user')) || {},
    allUsers: [],
};

const USER_ACTION_TYPES = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    GET_ALL_USERS: 'GET_ALL_USERS',
};

const updateUserLocalStorage = (user) => window.localStorage.setItem('user', JSON.stringify(user));

const userReducer = (state, action) => {
    switch (action.type) {
        case USER_ACTION_TYPES.LOGIN_USER: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case USER_ACTION_TYPES.LOGOUT_USER: {
            return {
                ...state,
                user: {},
            };
        }
        case USER_ACTION_TYPES.GET_ALL_USERS: {
            return {
                ...state,
                allUsers: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    // Efecto para actualizar el localStorage cuando el estado cambia
    useEffect(() => {
        updateUserLocalStorage(state.user);
    }, [state.user]);

    // Registrar un nuevo usuario
    const registerUser = async (form) => {
        try {
            await axios.post('/users/register', form);
        } catch (error) {
            throw error.response ? error.response.data.error : error.message;
        }
    };

    // Iniciar sesión del usuario
    const userLogin = async (user) => {
        try {
            const response = await axios.post('/users/login', user);
            dispatch({ 
                type: USER_ACTION_TYPES.LOGIN_USER, 
                payload: response.data 
            });
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    // Cerrar sesión del usuario
    const userLogOut = () => {
        window.localStorage.removeItem('user');
        dispatch({ type: USER_ACTION_TYPES.LOGOUT_USER });
    };

    // Obtener todos los usuarios
    const getAllUsers = async () => {
        try {
            const response = (await axios('/users')).data;
            dispatch({ 
                type: USER_ACTION_TYPES.GET_ALL_USERS, 
                payload: response
            });
        } catch (error) {
            throw error.response ? error.response.data.error : error.message;
        }
    };

    // Reestablecer cuenta del usuario
    const updateUserPassword = async (user) => {
        try {
            await axios.put('/users/forgot-password', user);
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const updateUsers = async (user) => {
        try {
            await axios.put('/users/config-users', user);
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    return (
        <UserContext.Provider value={{ state, registerUser, userLogin, userLogOut, getAllUsers, updateUserPassword, updateUsers }}>
            {children}
        </UserContext.Provider>
    );
};