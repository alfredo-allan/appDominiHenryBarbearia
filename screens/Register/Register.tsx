import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { styles } from "./styles";
import { registerUser } from "./api";
import { useAuth } from "../../src/Context/AuthContext"; // Confirme esse caminho!

type RegisterProps = {
  setAuthStep: React.Dispatch<React.SetStateAction<"login" | "home" | "register">>;
};

const Register: React.FC<RegisterProps> = ({ setAuthStep }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = useCallback(async () => {
    if (!name || !email || !telefone || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve conter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await registerUser(name, telefone, email, password);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      setAuthStep("login");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Erro ao registrar usuário.";
      Alert.alert("Erro", message);
    }
  }, [name, telefone, email, password, confirmPassword, setAuthStep]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image source={require("../../assets/images/splash.png")} style={styles.logo} />
            <Text style={styles.title}>Cadastre-se</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />

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
              placeholder="Telefone"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={(text) => setTelefone(formatPhone(text))}
              placeholderTextColor="#999"
            />

            {/* Senha */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Senha"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={24} color="#999" style={styles.eyeIcon} />
                ) : (
                  <Eye size={24} color="#999" style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>

            {/* Confirmar senha */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Confirme a Senha"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={24} color="#999" style={styles.eyeIcon} />
                ) : (
                  <Eye size={24} color="#999" style={styles.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.customButtonLogin} onPress={handleRegister}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAuthStep("login")}>
              <Text style={styles.footerText}>
                Já tem uma conta? <Text style={styles.linkText}>Login</Text>.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
