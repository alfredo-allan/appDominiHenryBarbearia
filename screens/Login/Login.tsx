import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { styles } from "./styles";
import { useAuth } from "../../src/context/AuthContext";
import { loginUser } from "./api"; // Importando a função de login

type LoginProps = {
  setAuthStep: React.Dispatch<React.SetStateAction<"login" | "home" | "register">>;
};

const Login: React.FC<LoginProps> = ({ setAuthStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      login(result.user); // Passa o usuário autenticado para o contexto
      setAuthStep("home");
    } else {
      Alert.alert("Erro", result.message || "Erro ao realizar login.");
    }
  };


  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/kinkbarbearia-removebg-preview.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.customButtonLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setAuthStep("register")}>
        <Text style={styles.footerText}>
          Não tem uma conta? <Text style={styles.linkText}>Cadastre-se</Text>.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
