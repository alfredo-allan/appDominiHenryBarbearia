import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { styles } from "./styles";
import { useAuth } from "../../src/Context/AuthContext";
import { loginUser } from "./api";

type LoginProps = {
  setAuthStep: React.Dispatch<React.SetStateAction<"login" | "home" | "register">>;
};

const Login: React.FC<LoginProps> = ({ setAuthStep }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        await login(result.user);
        setAuthStep("home"); // troca para menu direto
      } else {
        setErrorMessage(result.message || "Erro ao realizar login.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Erro inesperado ao tentar logar.");
    } finally {
      setLoading(false);
    }
  };

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
            <Image
              source={require("../../assets/images/icon.png")}
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

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1, borderWidth: 0, top: 8, height: 50 }]}
                placeholder="Senha"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={toggleShowPassword}>
                {showPassword ? (
                  <EyeOff size={22} color="#999" />
                ) : (
                  <Eye size={22} color="#999" />
                )}
              </TouchableOpacity>
            </View>

            {errorMessage && (
              <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
                {errorMessage}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.customButtonLogin, loading ? { opacity: 0.7 } : null]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? "Entrando..." : "Entrar"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAuthStep("register")}>
              <Text style={styles.footerText}>
                Não tem uma conta? <Text style={styles.linkText}>Cadastre-se</Text>.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
