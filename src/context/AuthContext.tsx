import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Para uma maior segurança, considere usar react-native-keychain
// import * as Keychain from 'react-native-keychain';

// Tipagem para o usuário
interface User {
    id: string;
    name: string;
    email: string;
    // outros campos do usuário...
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
}

// Inicializa o contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Componente de provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Carrega o estado de autenticação e dados do usuário ao iniciar o app
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

    // Função para realizar login
    const login = async (userData: User) => {
        try {
            setUser(userData);
            setIsAuthenticated(true);
            await AsyncStorage.setItem("@Auth:user", JSON.stringify(userData));

            // Para uma maior segurança, você poderia usar o Keychain:
            // await Keychain.setGenericPassword(userData.email, userData.password);
        } catch (error) {
            console.error("Erro ao salvar dados do usuário:", error);
            throw new Error("Falha ao realizar login.");
        }
    };

    // Função para realizar logout
    const logout = async () => {
        try {
            setUser(null);
            setIsAuthenticated(false);
            await AsyncStorage.removeItem("@Auth:user");

            // Para maior segurança, considere limpar o Keychain também:
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

// Hook para acessar o contexto de autenticação
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
};
