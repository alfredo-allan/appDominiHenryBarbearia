import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
} from "react-native";
import { styles } from "./styles";
import { registerUser } from "./api"; // Importando a função para registrar o usuário

type RegisterProps = {
  setAuthStep: React.Dispatch<React.SetStateAction<"login" | "home" | "register">>;
};

const Register: React.FC<RegisterProps> = ({ setAuthStep }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !telefone || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await registerUser(name, telefone, email, password);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      setAuthStep("home");
    } catch (error) {
      Alert.alert("Erro", "Erro ao registrar usuário.");
    }
  };

  return (
    <View style={styles.container}>
      {!isKeyboardVisible && ( // Oculta o logo quando o teclado estiver visível
        <Image
          source={require("../../assets/images/kinkbarbearia-removebg-preview.png")}
          style={styles.logo}
        />
      )}
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
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
      <TextInput
        style={styles.input}
        placeholder="Confirme a Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.customButtonLogin} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setAuthStep("login")}>
        <Text style={styles.footerText}>
          Já tem uma conta? <Text style={styles.linkText}>Login</Text>.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
