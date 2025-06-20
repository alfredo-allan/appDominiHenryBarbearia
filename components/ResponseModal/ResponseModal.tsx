import React from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles"; // Estilo separado para manter limpo
import logo from "../../assets/splash-icon.png"; // ajuste para o caminho correto

interface ResponseModalProps {
    visible: boolean;
    message: string;
    isSuccess?: boolean | null;
    onClose: () => void;
}


const ResponseModal: React.FC<ResponseModalProps> = ({ visible, message, onClose }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ResponseModal;
