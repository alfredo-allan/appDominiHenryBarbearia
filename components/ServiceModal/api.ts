import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://kinkbarbearia.pythonanywhere.com", // certifique-se que esse IP está acessível pelo dispositivo
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLoggedInUser = async () => {
  const user = await AsyncStorage.getItem("loggedUser");
  return user ? JSON.parse(user) : null;
};

export const getAvailability = async (barber: string, date: string) => {
  const response = await api.get("/availability", {
    params: { barber, date },
  });
  return response.data.available_times;
};

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
  const response = await api.post("/schedule", data);
  return response.data;
};

// 🔥 NOVA FUNÇÃO: buscar barbeiros
export const getBarbers = async (): Promise<{ code: string; name: string }[]> => {
  try {
    const response = await api.get("/barbers"); // espera resposta no formato: [{ code: "barber_1", name: "Barbeiro 1" }]
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar barbeiros:", error);
    throw error;
  }
};
