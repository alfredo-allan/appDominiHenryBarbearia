import axios from "axios";

const API_BASE_URL = "https://kinkbarbearia.pythonanywhere.com";

// Função auxiliar para validar e converter o userId
const sanitizeUserId = (userId: any): number => {
    const parsed = parseInt(userId);
    if (isNaN(parsed)) {
        throw new Error("ID do usuário inválido");
    }
    return parsed;
};

// Envia um compartilhamento
export const reportShare = async (userId: any) => {
    try {
        const validUserId = sanitizeUserId(userId);
        const response = await axios.post(`${API_BASE_URL}/share`, {
            userId: validUserId,
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar compartilhamento:", error);
        throw error;
    }
};

// Envia um like
export const reportLike = async (userId: any) => {
    try {
        const validUserId = sanitizeUserId(userId);
        const response = await axios.post(`${API_BASE_URL}/like`, {
            userId: validUserId,
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar like:", error);
        throw error;
    }
};

// Busca lista de likes com nome e email
export const getAllLikes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/likes`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar likes:", error);
        throw error;
    }
};
