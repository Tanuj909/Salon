"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCurrentUser } from "../services/authService";
import { TokenService } from "@/lib/tokenService";

const AuthContext = createContext({
    user: null,
    loading: true,
    refreshUser: async () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        setLoading(true);
        try {
            const token = TokenService.getToken();
            if (!token) {
                setUser(null);
                return;
            }
            const data = await getCurrentUser();
            setUser(data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        TokenService.removeToken();
        setUser(null);
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    return (
        <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
