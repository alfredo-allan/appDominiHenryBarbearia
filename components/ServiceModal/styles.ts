import { StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 50,
    marginBottom: 50,
    marginRight: "auto",
    marginLeft: "auto"
  },
  modalTitle: {
    color: theme.colors.darkBlack,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: theme.colors.darkBlack,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  modalService: {
    fontSize: 14,
    color: theme.colors.darkBlack,
    marginBottom: 4,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "flex-start",
    marginBottom: 10,
    borderRadius:50
  },
  customButton: {
    width: "100%",
    backgroundColor: theme.colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 10,
    // borderWidth: 1,
    borderColor: theme.colors.darkBlack,
  },
  confirmButton: {
    width: "40%",
    backgroundColor: theme.colors.darkBlack,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 10,
    position: "relative",
    top: 60
  },
  cancelButton: {
    width: "40%",
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 20,
    alignSelf: "flex-end",
    marginRight: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    marginBottom: 10,
    color: theme.colors.darkBlack,
    borderRadius: 6,
  },
  picker: {
    width: "100%",
    marginBottom: 10,
    zIndex: 1000, // garante que dropdown apareça acima de outros elementos
  },
  BarberName: {
    fontWeight: "bold",
  },
});
