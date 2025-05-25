import React, { createContext, useState, useEffect, useContext } from "react";
import { getLoggedUser } from "./api"; // ajuste o path conforme necessário

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string;
}

interface AuthContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const loggedUser = await getLoggedUser();
            setUser(loggedUser);
        };
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
