import { Button, StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  // style Menu
  container: {
    padding: 16,
    borderBottomWidth: 0,
    borderBottomColor: theme.colors.darkGray,
  },

  content: {
    padding: 0,
    marginBottom: 290,
  },
  menu: {
    backgroundColor: "#232323",
    paddingVertical: 10,
    position: "absolute", // Garante que o menu fique fixo
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Garante que o menu fique sobre os outros elementos
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  navList: {
    flexDirection: "row",
    marginRight: "auto",
    position: "relative",
  },
  navItem: {
    marginLeft: 10,
  },
  navText: {
    color: "white",
    fontWeight: "300",
    fontSize: 14,
    paddingBottom: 3,
  },
  active: {
    color: "#f4f4f4",
    fontWeight: "bold",
  },
});
