import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { styles } from "./styles";

interface AvailableTimesModalProps {
    visible: boolean;
    onClose: () => void;
    availableTimes: string[];
    onSelectTime: (time: string) => void; // Função callback para passar o horário selecionado
}

const AvailableTimesModal: React.FC<AvailableTimesModalProps> = ({
    visible,
    onClose,
    availableTimes,
    onSelectTime,
}) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Horários Disponíveis</Text>

                    {availableTimes.length === 0 ? (
                        <Text style={styles.modalText}>Nenhum horário disponível.</Text>
                    ) : (
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false} // Para esconder a barra de rolagem
                        >
                            {availableTimes.map((time, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.timeButton}
                                    onPress={() => {
                                        onSelectTime(time); // Passa o horário selecionado
                                        onClose(); // Fecha o modal de horários
                                    }}
                                >
                                    <Text style={styles.buttonText}>{time}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}

                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AvailableTimesModal;
