import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração base do Axios
const api = axios.create({
  baseURL: "https://kinkbarbearia.pythonanywhere.com", // Substitua pelo IP da sua máquina, caso necessário
  timeout: 10000, // Timeout para a requisição
});

// Função para realizar login
export const loginUser = async (email: string, password: string) => {
  // Validação simples dos campos de login
  if (!email || !password) {
    return { success: false, message: "Email e senha são obrigatórios." };
  }

  try {
    // Fazendo uma requisição POST para a rota de login com os dados do usuário
    const response = await api.post("/login", { email, password });

    // Armazenando o usuário logado no AsyncStorage (persistência)
    await AsyncStorage.setItem(
      "loggedUser",
      JSON.stringify(response.data.user)
    );

    // Retorna o usuário caso o login seja bem-sucedido
    return { success: true, user: response.data.user };
  } catch (error: any) {
    console.error("Erro ao realizar login:", error);

    // Verifica se o erro tem uma resposta do servidor
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Erro ao realizar login.",
      };
    }

    // Caso o erro não tenha resposta (ex: falha de rede)
    return { success: false, message: "Erro ao conectar-se ao servidor." };
  }
};

// Função para recuperar o usuário logado do AsyncStorage
export const getLoggedUser = async () => {
  try {
    const user = await AsyncStorage.getItem("loggedUser");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Erro ao recuperar os dados do usuário logado:", error);
    return null;
  }
};

export default api;
