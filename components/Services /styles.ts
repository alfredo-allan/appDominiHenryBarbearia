import { Button, StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  // Tópico Serviços
  servicesContainer: {
    backgroundColor: "#f4f4f4",
    marginLeft: 40,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.darkBlack,
    marginBottom: 20,
    marginLeft: -20,
    top: 8,
    position: "relative",
  },
  serviceItem: {
    marginBottom: 30,
    marginLeft: -20,
  },
  containerDosServicos: {
    position: "relative",
    marginBottom: 50,
  },
  serviceName: {
    fontSize: 17,
    fontWeight: 600,
    color: theme.colors.darkBlack,
  },
  servicePrice: {
    fontSize: 15,
    color: theme.colors.darkBlack,
    fontWeight: 600,
    marginLeft: 170,
    display: "flex",
    position: "absolute",
    marginTop: 2,
  },
  serviceDuration: {
    fontSize: 14,
    color: "#666",
    marginLeft: 170,
  },
  // Adicionando uma seção de conteúdo abaixo do menu fixo
  content: {
    marginTop: 40, // Distância suficiente para não sobrepor o menu
    padding: 0,
    marginBottom: 290,
  },
  scrollContent: {
    padding: 20, // Espaçamento interno para a rolagem
    flexGrow: 1, // Garante que o conteúdo ocupe todo o espaço disponível
  },
  //style sercives

  customButton: {
    backgroundColor: theme.colors.gray,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    marginLeft: 250,
    marginTop: -40,
    padding: 20,
    display: "flex",
    // borderWidth: 1, // Define a largura da borda
    borderColor: theme.colors.darkBlack, // Define a cor da borda
  },
  buttonText: {
    color: theme.colors.darkBlack,
    fontSize: 15,
    fontWeight: "bold",
  },
});
