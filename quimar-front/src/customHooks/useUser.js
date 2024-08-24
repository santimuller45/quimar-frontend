import { useContext } from "react";
import { UserContext } from "../context/User.jsx";

export const useUser = () => {
    
    const context = useContext(UserContext);

    if (context === undefined) throw new Error('Error user');

    return context;
};