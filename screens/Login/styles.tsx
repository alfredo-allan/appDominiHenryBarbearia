import { Button, StyleSheet } from "react-native";
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
    width: 100,
    height: 40,
    marginTop: 10,
    padding: 0,
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
    left: "45%",
    top: "10%",
  },
  linkText: {
    color: theme.colors.gray, // Cor azul, você pode ajustar conforme necessário
    textDecorationLine: "underline", // Para adicionar o estilo de link
    fontWeight: "bold",
  }
});
