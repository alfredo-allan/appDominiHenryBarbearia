import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração base do Axios
const api = axios.create({
  baseURL: "http://192.168.0.107:5000", // Substitua pelo IP correto
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para recuperar o usuário logado
export const getLoggedInUser = async () => {
  try {
    const user = await AsyncStorage.getItem("loggedUser");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Erro ao recuperar o usuário logado:", error);
    return null;
  }
};

// Função para obter horários disponíveis
export const getAvailability = async (barber: string, date: string) => {
  try {
    const response = await api.get("/availability", {
      params: { barber, date },
    });
    return response.data.available_times; // Certifique-se que o backend retorna `available_times`
  } catch (error: any) {
    console.error(
      "Erro ao buscar horários disponíveis:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// Função para agendar um serviço
export const scheduleAppointment = async (data: {
  barber: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  value: number;
  name: string;
  phone: string;
  email: string;
}) => {
  try {
    console.log("Enviando payload para agendamento:", data);
    const response = await api.post("/schedule", data);
    console.log("Resposta do backend:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao agendar serviço:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// Função para obter agendamentos do cliente usando informações do usuário logado
export const getCustomerBookings = async () => {
  try {
    const loggedUser = await getLoggedInUser();

    if (!loggedUser) {
      throw new Error("Nenhum usuário logado encontrado.");
    }

    // Normalizar os dados antes de enviar
    const name = loggedUser.name.trim();
    const phone = loggedUser.phone.replace(/\D+/g, ""); // Remove tudo que não for número

    const url = `/customer_bookings?name=${encodeURIComponent(
      name
    )}&phone=${encodeURIComponent(phone)}`;
    console.log("URL gerada:", url);

    const response = await api.get(url);
    console.log("Resposta do backend:", response.data);

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao buscar agendamentos:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// Função para excluir um agendamento
export const deleteCustomerBooking = async (bookingId: number) => {
  try {
    const response = await api.delete(`/customer_bookings/${bookingId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao excluir agendamento:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export default api;
