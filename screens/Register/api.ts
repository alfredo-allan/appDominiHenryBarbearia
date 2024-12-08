import axios from "axios";

// Configuração base da API com o axios
export const api = axios.create({
  baseURL: "http:///192.168.0.107:5000", // IP da máquina Flask
  timeout: 5000, // Tempo máximo de resposta
});

// Função para registrar o usuário
export const registerUser = async (
  name: string,
  phone: string,
  email: string,
  password: string // Adicionando senha no registro
) => {
  try {
    // Fazendo a chamada para registrar o usuário, incluindo a senha
    const response = await api.post("/register", {
      name,
      phone,
      email,
      password, // Enviando a senha para o back-end
    });

    // Se a resposta for bem-sucedida, retorna os dados
    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", error.message);

    // Se o erro for específico da resposta, retorna a mensagem
    if (error.response) {
      throw new Error(
        error.response.data.message || "Erro ao registrar usuário"
      );
    }

    // Caso o erro não tenha uma resposta, exibe mensagem genérica
    throw new Error("Erro ao conectar com o servidor.");
  }
};
