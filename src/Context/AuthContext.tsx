import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Para maior segurança, pode usar react-native-keychain
// import * as Keychain from 'react-native-keychain';

// Tipagem para o usuário
interface User {
    id: string;
    name: string;
    email: string;
    // outros campos que quiser...
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
}

// Cria o contexto com valor inicial undefined
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provedor do contexto que envolve o app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Carrega os dados do usuário e estado de autenticação do AsyncStorage ao iniciar
    useEffect(() => {
        const loadAuthState = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("@Auth:user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Erro ao carregar estado de autenticação:", error);
            }
        };

        loadAuthState();
    }, []);

    // Função para login: salva usuário no state e AsyncStorage
    const login = async (userData: User) => {
        try {
            setUser(userData);
            setIsAuthenticated(true);
            await AsyncStorage.setItem("@Auth:user", JSON.stringify(userData));
            // Para maior segurança, pode usar Keychain:
            // await Keychain.setGenericPassword(userData.email, userData.password);
        } catch (error) {
            console.error("Erro ao salvar dados do usuário:", error);
            throw new Error("Falha ao realizar login.");
        }
    };

    // Função para logout: limpa usuário e AsyncStorage
    const logout = async () => {
        try {
            setUser(null);
            setIsAuthenticated(false);
            await AsyncStorage.removeItem("@Auth:user");
            // Se usar Keychain:
            // await Keychain.resetGenericPassword();
        } catch (error) {
            console.error("Erro ao remover dados do usuário:", error);
            throw new Error("Falha ao realizar logout.");
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir o contexto, lança erro se usado fora do provider
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
};
