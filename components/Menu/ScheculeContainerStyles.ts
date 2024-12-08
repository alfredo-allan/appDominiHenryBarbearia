import { StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const Schedulestyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    top: "-50%",
  },
  menu: {
    height: 50,
    backgroundColor: "#f5f5f5",
  },
  navList: {
    flexDirection: "row",
    alignItems: "center",
  },
  navItem: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  navText: {
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scheduleContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9", // Estilo exclusivo do container de Schedule
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});
