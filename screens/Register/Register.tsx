import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react-native";
import { styles } from "./styles";
import { registerUser } from "./api";
import ResponseModal from "../../components/ResponseModal/ResponseModal"; // ajuste o caminho se necessário

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
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isPhoneValid = (phone: string) => phone.replace(/\D/g, "").length === 11;

  const handleRegister = useCallback(async () => {
    if (!name || !email || !telefone || !password || !confirmPassword) {
      showModal("Por favor, preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      showModal("Digite um e-mail válido.");
      return;
    }

    if (!isPhoneValid(telefone)) {
      showModal("Por favor, informe um telefone válido.");
      return;
    }

    if (password.length < 6) {
      showModal("A senha deve conter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      showModal("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(name, telefone, email, password);
      showModal("Cadastro realizado com sucesso!");
      setTimeout(() => {
        setAuthStep("login");
      }, 1500);
    } catch (error: any) {
      console.error("Erro na inscrição:", error);
      const message = error?.response?.data?.message || "Erro ao registrar usuário.";
      showModal(message);
    } finally {
      setLoading(false);
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
            {!isInputFocused && (
              <Image
                source={require("../../assets/images/splash.png")}
                style={styles.logo}
              />
            )}
            <Text style={styles.title}>Cadastre-se</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => {
                if (!email && !telefone && !password && !confirmPassword) {
                  setIsInputFocused(false);
                }
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => {
                if (!name && !telefone && !password && !confirmPassword) {
                  setIsInputFocused(false);
                }
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Telefone"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={(text) => setTelefone(formatPhone(text))}
              placeholderTextColor="#999"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => {
                if (!name && !email && !password && !confirmPassword) {
                  setIsInputFocused(false);
                }
              }}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Senha"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  if (!name && !email && !telefone && !confirmPassword) {
                    setIsInputFocused(false);
                  }
                }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOffIcon size={24} color="#999" />
                ) : (
                  <EyeIcon size={24} color="#999" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Confirme a Senha"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#999"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  if (!name && !email && !telefone && !password) {
                    setIsInputFocused(false);
                  }
                }}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOffIcon size={24} color="#999" />
                ) : (
                  <EyeIcon size={24} color="#999" />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.customButtonLogin, loading ? { opacity: 0.7 } : null]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAuthStep("login")}>
              <Text style={styles.footerText}>
                Já tem uma conta? <Text style={styles.linkText}>Login</Text>.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <ResponseModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default Register;
