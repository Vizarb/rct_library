// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../utils/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${config.SERVER_URL}/check-authentication/`);
            if (response.data.is_authenticated) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Authentication check failed:", error);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${config.SERVER_URL}/logout/`);
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
