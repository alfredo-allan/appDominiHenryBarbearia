import { StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.colors.darkGray,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: theme.colors.gray,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    color: theme.colors.gray,
    backgroundColor: theme.colors.darkGray, // Para dar contraste
  },
  footerText: {
    marginTop: 20,
    color: "#ccc",
  },
  customButtonLogin: {
    backgroundColor: theme.colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center", // Para centralizar o texto verticalmente
    width: 110,
    height: 40,
    marginTop: 10,
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
    top: "10%",
    alignSelf: "center", // Substitui o `left` para centralizar automaticamente
  },
  inner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    color: theme.colors.gray, // Cor azul, você pode ajustar conforme necessário
    textDecorationLine: "underline", // Para adicionar o estilo de link
    fontWeight: "bold",
  }
});
