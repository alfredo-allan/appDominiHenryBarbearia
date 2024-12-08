import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { styles } from "./styles";
import { getAvailability, scheduleAppointment, getLoggedInUser } from "./api";
import AvailableTimesModal from "../AvailableTimesModal/AvailableTimesModal";

dayjs.locale("pt-br");

interface ServiceModalProps {
    visible: boolean;
    onClose: () => void;
    service: {
        name?: string;
        price?: string;
        duration?: string;
    } | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ visible, onClose, service }) => {
    const [selectedBarber, setSelectedBarber] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [showTimeModal, setShowTimeModal] = useState(false);

    const handleCheckAvailability = async () => {
        if (!selectedBarber || !selectedDate) {
            alert("Por favor, selecione um barbeiro e uma data.");
            return;
        }

        const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
        try {
            const times = await getAvailability(selectedBarber, formattedDate);
            setAvailableTimes(times);
            setShowTimeModal(true);
        } catch (error) {
            alert("Erro ao buscar disponibilidade. Tente novamente.");
        }
    };

    const handleConfirm = async () => {
        if (!selectedBarber || !selectedDate || !selectedTime) {
            alert("Por favor, selecione um barbeiro, uma data e um horário.");
            return;
        }

        const loggedUser = await getLoggedInUser();
        if (!loggedUser) {
            alert("Erro ao recuperar as informações do usuário logado.");
            return;
        }

        const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
        const valueNumeric = service?.price
            ? parseFloat(service.price.replace("R$", "").replace(",", ".").trim())
            : 0;

        const payload = {
            barber: selectedBarber,
            date: formattedDate,
            time: selectedTime,
            duration: Number(service?.duration || 40), // 40 como valor padrão
            service: service?.name || "Serviço padrão",
            value: valueNumeric,
            name: loggedUser.name,
            phone: loggedUser.phone,
            email: loggedUser.email,
        };

        try {
            const response = await scheduleAppointment(payload);
            alert("Agendamento realizado com sucesso!");
            onClose();
        } catch (error) {
            console.error("Erro ao realizar agendamento:", error);
            alert("Erro ao realizar agendamento. Tente novamente.");
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <Image source={require("../../assets/images/kinkbarbearia-removebg-preview.png")} style={styles.logo} />
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{service?.name || "Serviço"}</Text>
                    <Text style={styles.modalService}>Preço: {service?.price || "Indisponível"}</Text>
                    <Text style={styles.modalService}>Duração: {service?.duration || "Indisponível"}</Text>

                    <Text style={styles.modalText}>Escolha o Barbeiro:</Text>
                    <Picker
                        selectedValue={selectedBarber}
                        onValueChange={(itemValue) => setSelectedBarber(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione um barbeiro" value="" />
                        <Picker.Item label="Wallace" value="Wallace" />
                        <Picker.Item label="Mateus" value="Mateus" />
                    </Picker>

                    <TouchableOpacity style={styles.customButton} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.buttonText}>
                            {selectedDate
                                ? dayjs(selectedDate).format("DD/MM/YYYY")
                                : "Selecione a data"}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate || new Date()}
                            mode="date"
                            display="calendar"
                            onChange={(event, date) => {
                                setShowDatePicker(false);
                                if (date) setSelectedDate(date);
                            }}
                        />
                    )}

                    <TouchableOpacity style={styles.customButton} onPress={handleCheckAvailability}>
                        <Text style={styles.buttonText}>Ver Disponibilidade</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <AvailableTimesModal
                visible={showTimeModal}
                onClose={() => setShowTimeModal(false)}
                availableTimes={availableTimes}
                onSelectTime={(time) => setSelectedTime(time)}
            />
        </Modal>
    );
};

export default ServiceModal;
