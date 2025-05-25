import { Button, StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  // style do InfoBarber
  container: {
    padding: 16,
    borderBottomWidth: 0,
    borderBottomColor: theme.colors.darkBlack,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.darkBlack,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  address: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.colors.darkBlack,
  },
});
