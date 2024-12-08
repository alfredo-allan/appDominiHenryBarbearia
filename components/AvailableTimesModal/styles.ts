import { StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo do modal
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "60%", // Limita a altura do modal
  },
  modalTitle: {
    color: theme.colors.darkGray,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  timeButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.darkGray,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 5,
    marginTop: 20,
  },
  scrollContainer: {
    paddingBottom: 10, // Adiciona um pouco de espaço no final para melhorar a rolagem
  },
});
