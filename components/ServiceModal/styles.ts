import { Button, StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFF",
    padding: 12,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    height: "50%",
  },
  modalTitle: {
    color: theme.colors.darkGray,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 1,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: theme.colors.darkGray,
    fontWeight: "bold",
  },
  picker: {
    position: "relative",
    width: "50%",
    height: 50,
    padding: 10,
    marginBottom: 10,
    left: "2%",
    borderRadius: 5,
  },
  BarberName: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    marginBottom: 10,
    color: theme.colors.darkGray,
  },
  customButton: {
    width: "70%",
    backgroundColor: theme.colors.gray,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor: theme.colors.darkGray, // Define a cor da borda
  },
  cancelButton: {
    display: "flex",
    width: "30%",
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    marginTop: -40,
    left: "20%",
  },
  confirmButton: {
    display: "flex",
    width: "30%",
    backgroundColor: theme.colors.darkGray,
    padding: 10,
    borderRadius: 5,
    right: "20%",
    marginTop: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logo: {
    width: 65,
    height: 65,
    marginRight: 273,
    top: 70,
    zIndex: 1,
  },
  modalService: {
    display: "none",
  },
});
