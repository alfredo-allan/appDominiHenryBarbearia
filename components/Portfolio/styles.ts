import { Button, StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
    top: "5%",
  },
  imageContainer: {
    margin: 5,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#000",
  },
  image: {
    width: 320,
    height: 390,
    borderRadius: 8,
  },
});
