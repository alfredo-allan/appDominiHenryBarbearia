import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "./styles";
import {
    getAvailability,
    scheduleAppointment,
    getLoggedInUser,
    getBarbers,
} from "./api";
import AvailableTimesModal from "../AvailableTimesModal/AvailableTimesModal";
import ResponseModal from "../ResponseModal/ResponseModal"; // certifique-se que o caminho está correto

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

const friendlyNames: Record<string, string> = {
    barber_1: "Erik",
    barber_2: "Alesson",
    // barber_3: "Mateus",
};

const ServiceModal: React.FC<ServiceModalProps> = ({ visible, onClose, service }) => {
    const [selectedBarber, setSelectedBarber] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [barbers, setBarbers] = useState<{ code: string; name: string }[]>([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [dropdownItems, setDropdownItems] = useState<{ label: string; value: string }[]>([]);

    const [responseVisible, setResponseVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const showMessage = (msg: string, success: boolean | null = null) => {
        setResponseMessage(msg);
        setIsSuccess(success);
        setResponseVisible(true);
    };


    useEffect(() => {
        const loadBarbers = async () => {
            try {
                const barbersFromApi = await getBarbers();
                setBarbers(barbersFromApi);
                const items = barbersFromApi.map((barber) => ({
                    label: friendlyNames[barber.code] || barber.name,
                    value: barber.code,
                }));
                setDropdownItems(items);
            } catch (error) {
                console.error("Erro ao carregar barbeiros:", error);
            }
        };
        loadBarbers();
    }, []);

    const handleCheckAvailability = async () => {
        if (!selectedBarber || !selectedDate) {
            showMessage("Por favor, selecione um barbeiro e uma data.");
            return;
        }

        const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
        try {
            const times = await getAvailability(selectedBarber, formattedDate);
            setAvailableTimes(times);
            setShowTimeModal(true);
        } catch (error) {
            showMessage("Erro ao buscar disponibilidade. Tente novamente.");
        }
    };

    const handleConfirm = async () => {
        if (!selectedBarber || !selectedDate || !selectedTime) {
            showMessage("Por favor, selecione um barbeiro, uma data e um horário.");
            return;
        }

        const loggedUser = await getLoggedInUser();
        if (!loggedUser) {
            showMessage("Erro ao recuperar as informações do usuário logado.");
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
            duration: service?.duration ? Number(service.duration) : 40,
            service: service?.name || "Serviço padrão",
            value: valueNumeric,
            name: loggedUser.name,
            phone: loggedUser.phone,
            email: loggedUser.email,
        };

        try {
            await scheduleAppointment(payload);
            showMessage("Agendamento realizado com sucesso!", true);
        } catch (error) {
            console.error("Erro ao realizar agendamento:", error);
            showMessage("Erro ao realizar agendamento. Tente novamente.", false);
        }

    };

    return (
        <Modal visible={visible} animationType="slide">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.modalContainer}
            >
                <FlatList
                    data={["placeholder"]}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={() => null}
                    ListHeaderComponent={
                        <View style={styles.modalContent}>
                            <Image
                                source={require("../../assets/images/splash-icon.png")}
                                style={styles.logo}
                            />
                            <Text style={styles.modalTitle}>{service?.name || "Serviço"}</Text>
                            <Text style={styles.modalService}>Preço: {service?.price || "Indisponível"}</Text>
                            <Text style={styles.modalService}>Duração: {service?.duration || "Indisponível"}</Text>

                            <Text style={styles.modalText}>Escolha o Barbeiro:</Text>
                            <DropDownPicker
                                open={openDropdown}
                                value={selectedBarber}
                                items={dropdownItems}
                                setOpen={setOpenDropdown}
                                setValue={setSelectedBarber}
                                setItems={setDropdownItems}
                                placeholder="Selecione um barbeiro"
                                style={{ marginBottom: openDropdown ? 120 : 20 }}
                                containerStyle={{ zIndex: 1000 }}
                            />

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
                                <Text style={styles.buttonText}>
                                    {selectedTime ? `Horário: ${selectedTime}` : "Ver Disponibilidade"}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </KeyboardAvoidingView>

            <AvailableTimesModal
                visible={showTimeModal}
                onClose={() => setShowTimeModal(false)}
                availableTimes={availableTimes}
                onSelectTime={(time) => setSelectedTime(time)}
            />

            <ResponseModal
                visible={responseVisible}
                message={responseMessage}
                isSuccess={isSuccess}
                onClose={() => {
                    setResponseVisible(false);
                    if (isSuccess) {
                        onClose();
                    }
                }}
            />

        </Modal>
    );
};

export default ServiceModal;
