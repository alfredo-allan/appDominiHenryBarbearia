// App.tsx
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import theme from "./style/Theme";

import Header from "./components/Header/Header";
import InfoBarber from "./components/InfoBarber/InfoBarber";
import Menu from "./components/Menu/Menu";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";

import { AuthProvider, useAuth } from "./src/Context/AuthContext";
import { Colors } from "react-native/Libraries/NewAppScreen";

const AuthFlow = () => {
  const { user } = useAuth();
  const [authStep, setAuthStep] = useState<"home" | "login" | "register">("home");
  const [modalVisible, setModalVisible] = useState(true);

  if (user) {
    return (
      <View style={styles.container}>
        <Header />
        <InfoBarber />
        <Menu />
      </View>
    );
  }

  if (authStep === "login") return <Login setAuthStep={setAuthStep} />;
  if (authStep === "register") return <Register setAuthStep={setAuthStep} />;

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require("./assets/images/splash.png")} style={styles.logo} />
            <Text style={styles.titleApp}>Agendamentos</Text>
            <Text style={styles.titleBarber}>Barbearia Domini Henry</Text>

            <Text style={styles.subtitle}>Já é Nosso Cliente?</Text>

            <TouchableOpacity
              style={styles.customButtonLogin}
              onPress={() => {
                setAuthStep("login");
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.customButtonRegister}
              onPress={() => {
                setAuthStep("register");
                setModalVisible(false);
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

const AppContent = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <AuthFlow />
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

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
    backgroundColor: theme.colors.darkBlack,
    padding: 50,
    borderRadius: 10,
    width: "80%",
    height: "40%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.gray,
  },
  subtitle: {
    marginTop: 0,
    fontSize: 15,
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
    left: 20,
    bottom: 20,
    width: 110,
  },
  customButtonRegister: {
    position: "absolute",
    backgroundColor: theme.colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    right: 20,
    bottom: 20,
    width: 110,
  },
  buttonText: {
    color: theme.colors.darkBlack,
    fontSize: 15,
    fontWeight: "bold",
  },
  logo: {
    marginTop: -50,
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  titleApp: {
    fontSize: 20,
    color: theme.colors.gray,
    fontWeight: "bold",
    top: -35,
  },
  titleBarber: {
    fontSize: 15,
    color: theme.colors.gray,
    top: -35,
  }
});
