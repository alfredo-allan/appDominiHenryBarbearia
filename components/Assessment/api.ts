import axios from "axios";
import { useAuth } from "../../src/Context/AuthContext"; // Ajuste conforme necessário

const API_BASE_URL = "https://kinkbarbearia.pythonanywhere.com";

interface NovoComentario {
    commentText: string;
    rating: number;
}

export const getComentarios = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments`);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao buscar comentários:", error);
        throw new Error("Erro ao buscar os comentários");
    }
};

export const useAssessmentAPI = () => {
    const { user } = useAuth();

    const postComentario = async (comentario: NovoComentario) => {
        if (!user || !user.id) {
            throw new Error("Usuário não autenticado.");
        }

        const payload = {
            ...comentario,
            userId: user.id,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/comments`, payload);
            return response.data;
        } catch (error: any) {
            console.error("Erro ao enviar comentário:", error);
            throw new Error(
                error.response?.data?.message || "Erro ao enviar comentário"
            );
        }
    };

    return {
        postComentario,
        getComentarios,
    };
};
