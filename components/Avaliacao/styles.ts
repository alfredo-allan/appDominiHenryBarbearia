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
    color: theme.colors.darkGray,
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
});
