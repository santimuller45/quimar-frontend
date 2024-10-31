import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
const urlApiUsers = import.meta.env.VITE_API_GET_USERS;

export const UserContext = createContext();

const initialState = {
    user: JSON.parse(window.localStorage.getItem('user')) || {},
    allUsers: [],
    showUsers: [],
};

const USER_ACTION_TYPES = {
    GET_ALL_USERS: 'GET_ALL_USERS',
    GET_USER_BY: 'GET_USER_BY',
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    FILTER_BY_STATUS: 'FILTER_BY_STATUS',
};

const updateUserLocalStorage = (user) => window.localStorage.setItem('user', JSON.stringify(user));

const userReducer = (state, action) => {
    switch (action.type) {
        case USER_ACTION_TYPES.GET_ALL_USERS: {
            return {
                ...state,
                allUsers: action.payload,
                showUsers: action.payload,
            };
        };
        case USER_ACTION_TYPES.GET_USER_BY: {
            return {
                ...state,
                showUsers: action.payload,
            }
        }
        case USER_ACTION_TYPES.LOGIN_USER: {
            return {
                ...state,
                user: action.payload,
            };
        };
        case USER_ACTION_TYPES.LOGOUT_USER: {
            return {
                ...state,
                user: {},
            };
        };
        case USER_ACTION_TYPES.FILTER_BY_STATUS: {

            let filteredSource;

            if (action.payload === 'activo') filteredSource = state.allUsers.filter(elem => elem.userStatus)
            else if (action.payload === 'inactivo') filteredSource = state.allUsers.filter(elem => !elem.userStatus)
            else filteredSource = state.allUsers;

            return {
                ...state,
                showUsers: filteredSource
            };
        };
        default: {
            return state;
        };
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
            await axios.post(`${urlApiUsers}/register`, form);
        } catch (error) {
            throw error.response ? error.response.data.error : error.message;
        }
    };

    // Iniciar sesión del usuario
    const userLogin = async (user) => {
        try {
            const response = await axios.post(`${urlApiUsers}/login`, user);
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
            const response = (await axios(urlApiUsers)).data;
            dispatch({ 
                type: USER_ACTION_TYPES.GET_ALL_USERS, 
                payload: response
            });
        } catch (error) {
            throw error.response ? error.response.data.error : error.message;
        }
    };

    const getUserByNameOrNumber = async (input) => {
        try {
            let queryParam;

            if (typeof input === 'string' && isNaN(input)) {
                queryParam = `name=${input}`;
            } else {
                queryParam = `userNumber=${input}`;
            }
            const response = (await axios(`${urlApiUsers}?${queryParam}`)).data;

            dispatch ({
                type: USER_ACTION_TYPES.GET_USER_BY,
                payload: response
            });

            return response;

        } catch (error) {
            throw error.response ? error.response.data.error : error.message;
        }
    };

    // Reestablecer cuenta del usuario
    const updateUserPassword = async (user) => {
        try {
            await axios.put(`${urlApiUsers}/update-password`, user);
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const updateUsers = async (user) => {
        try {
            await axios.put(`${urlApiUsers}/config-users`, user);
        } catch (error) {
            throw error.response?.data?.message || error.message;
        }
    };

    const filterByUserStatus = (status) => {
        dispatch ({
            type: USER_ACTION_TYPES.FILTER_BY_STATUS,
            payload: status
        });
    };

    return (
        <UserContext.Provider value={{ state, getAllUsers, getUserByNameOrNumber, registerUser, userLogin, userLogOut, updateUserPassword, updateUsers, filterByUserStatus }}>
            {children}
        </UserContext.Provider>
    );
};