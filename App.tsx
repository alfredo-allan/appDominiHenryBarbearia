import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity, Image } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import theme from "./style/Theme";
import Header from "./components/Header/Header";
import InfoBarber from "./components/InfoBarber/InfoBarber";
import Menu from "./components/Menu/Menu";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import { AuthProvider, useAuth } from "./src/context/AuthContext"; // Importando AuthProvider

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const [modalVisible, setModalVisible] = useState(true); // Controla o modal inicial
  const [authStep, setAuthStep] = useState<"home" | "login" | "register">("home"); // Controla o estado de autenticação
  const { isAuthenticated, logout } = useAuth(); // Pegando o estado de autenticação

  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // Evita que a splash screen feche automaticamente
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Fecha a splash screen assim que as fontes estiverem carregadas
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Retorna uma tela vazia enquanto as fontes carregam
  }

  // Se o usuário já estiver autenticado, redireciona para a tela principal
  if (isAuthenticated) {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Header />
        <InfoBarber />
        <Menu />
      </View>
    );
  }

  // Renderiza a tela de login ou cadastro, se necessário
  if (authStep === "login") return <Login setAuthStep={setAuthStep} />;
  if (authStep === "register") return <Register setAuthStep={setAuthStep} />;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* Modal Inicial */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("./assets/images/kinkbarbearia-removebg-preview.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Agendamentos King Barbearia</Text>
            <Text style={styles.subtitle}>Já é Nosso Cliente?</Text>
            <TouchableOpacity
              style={styles.customButtonLogin}
              onPress={() => {
                setAuthStep("login");
                setModalVisible(false); // Fecha o modal quando o login é selecionado
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customButtonRegister}
              onPress={() => {
                setAuthStep("register");
                setModalVisible(false); // Fecha o modal quando o cadastro é selecionado
              }}
            >
              <Text style={styles.buttonText}>Cadastro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: theme.colors.darkGray,
    padding: 50,
    borderRadius: 10,
    width: "80%",
    height: "30%",
    alignItems: "center",
    borderWidth: 1, // Define a largura da borda
    borderColor: theme.colors.gray, // Define a cor da borda
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    left: "20%",
    marginTop: -40,
    color: theme.colors.gray,
  },
  subtitle: {
    top: "20%",
    fontSize: 18,
    color: theme.colors.gray,
    marginBottom: 10,
  },
  customButtonLogin: {
    position: "absolute",
    backgroundColor: theme.colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    right: "80%",
    width: 110,
    marginTop: 150,
  },
  customButtonRegister: {
    backgroundColor: theme.colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    left: "30%",
    width: 110,
    marginTop: 32,
  },
  buttonText: {
    color: theme.colors.darkGray,
    fontSize: 15,
    fontWeight: "bold",
  },
  logo: {
    position: "absolute",
    width: 80,
    height: 80,
    left: "5%",
    top: "4%",
  },
});

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
