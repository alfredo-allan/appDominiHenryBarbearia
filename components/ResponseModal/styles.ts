import { StyleSheet } from "react-native";
import theme from "../../style/Theme";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    modalBox: {
        backgroundColor: "#FFF",
        width: "85%",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        elevation: 10,
    },
    logo: {
        width: 90,
        height: 90,
        marginBottom: 15,
        position: "relative",
        left: -100,
        borderRadius: 50
    },
    message: {
        fontSize: 16,
        color: theme.colors.darkBlack,
        textAlign: "left",
        marginBottom: 20,
    },
    button: {
        backgroundColor: theme.colors.darkBlack,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 6,
        width: "100%"
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center"
    },
});
