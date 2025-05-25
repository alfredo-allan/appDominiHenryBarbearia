import { Button, StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  //Tópico Avaliação
  container_av: {
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  notaContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginRight: 260,
  },
  nota: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.colors.darkBlack,
  },
  estrelasContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  estrela: {
    width: 10,
    height: 10,
    marginHorizontal: 3,
  },
  totalAvaliacoes: {
    fontSize: 11,
    color: theme.colors.gray,
    position: "absolute",
    marginTop: 60,
    marginLeft: -20,
  },
  barrasContainer: {
    marginVertical: -80,
    marginBottom: 50,
  },
  barra: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 10,
  },
  barraTexto: {
    width: 30,
    fontSize: 14,
    color: theme.colors.gray,
    marginLeft: 75,
  },
  statusBar: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.gray,
    borderRadius: 4,
    overflow: "hidden",
  },
  statusBarFill: {
    height: "100%",
    backgroundColor: "#f54905",
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  comentario: {
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  usuario: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textoComentario: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  notaComentario: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  avaliarBox: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  avaliarTexto: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  ratingTexto: {
    fontSize: 14,
    color: "#666",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  inputComentario: {
    width: "100%",
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    textAlignVertical: "top",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },

  cancelar: {
    color: "#888",
    fontSize: 16,
  },

  enviar: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },
  comentarioWrapper: {
    marginBottom: 10,
    bottom: 30,
  },
});
