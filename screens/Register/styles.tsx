import { StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.colors.darkBlack,
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
    backgroundColor: theme.colors.darkBlack, // Para dar contraste
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
    width: 150,
    height: 40,
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
  },
  buttonText: {
    color: theme.colors.darkBlack,
    fontSize: 15,
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: "auto",

  },
  logo: {
    position: "absolute",
    width: 150,
    height: 150,
    top: "5%",
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
  },
  eyeIcon: {
    // color: theme.colors.gray
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 16,
    height: 45,
  },

  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.gray,
  },

});

