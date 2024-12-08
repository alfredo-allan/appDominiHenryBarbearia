import { StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: theme.colors.darkGray,
    justifyContent: "flex-start", // Ajusta o alinhamento para evitar sobreposição
    alignItems: "center", // Centraliza o conteúdo horizontalmente
  },
});
