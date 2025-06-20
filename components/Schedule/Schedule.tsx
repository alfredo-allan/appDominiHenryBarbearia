import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCustomerBookings, deleteCustomerBooking } from "./api";
import { styles } from "./styles";
import ResponseModal from "../ResponseModal/ResponseModal"; // ajuste o caminho se necessário

interface Booking {
    id: number;
    service: string;
    barber: string;
    date: string;
    time: string;
    duration: number;
    valueservice: number;
}

const Schedule: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const showModal = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const loadBookings = async () => {
        try {
            setLoading(true);
            const response = await getCustomerBookings();

            const validBookings = response.map((booking: any) => {
                let barberName = booking.barber;

                if (booking.barber === "Erik") {
                    barberName = `Barbeiro ${booking.barber}`;
                } else if (booking.barber === "barber_1") {
                    barberName = "Barbeiro Erik";
                }

                if (booking.barber === "Alleson") {
                    barberName = `Barbeiro ${booking.barber}`;
                } else if (booking.barber === "barber_2") {
                    barberName = "Barbeiro Alesson";
                }

                const dateTimeParts = booking.date.split(" ");
                const datePart = dateTimeParts[0];
                const timePart = dateTimeParts.length > 1 ? dateTimeParts[1] : booking.time;
                const [year, month, day] = datePart.split("-");

                return {
                    id: booking.id,
                    service: booking.service,
                    barber: barberName,
                    date: `${day}/${month}/${year}`,
                    time: timePart,
                    duration: booking.duration,
                    valueservice: booking.valueservice,
                };
            });

            setBookings(validBookings);
        } catch (error) {
            console.error("Erro ao carregar agendamentos:", error);
            showModal("Não foi possível carregar os agendamentos.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (bookingId: number) => {
        if (!bookingId) {
            showModal("ID do agendamento inválido.");
            return;
        }

        try {
            await deleteCustomerBooking(bookingId);
            setBookings((prev) => prev.filter((b) => b.id !== bookingId));
            showModal("Agendamento excluído com sucesso.");
        } catch (error) {
            console.error("Erro ao excluir agendamento:", error);
            showModal("Não foi possível excluir o agendamento.");
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const renderBooking = ({ item }: { item: Booking }) => (
        <TouchableOpacity
            style={styles.bookingItem}
            activeOpacity={0.8}
            onPress={() => console.log("Agendamento selecionado:", item)}
        >
            <View style={styles.bookingInfo}>
                <Text style={styles.service}>{item.service}</Text>
                <Text style={styles.details}>
                    {item.barber} - {item.date} às {item.time} ({item.duration} min)
                </Text>
                <Text style={styles.value}>
                    R$ {item.valueservice ? item.valueservice.toFixed(2) : "0.00"}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
            >
                <Ionicons name="trash" size={20} color="#fff" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Agendamentos</Text>

            {loading ? (
                <Text style={styles.loading}>Carregando...</Text>
            ) : bookings.length > 0 ? (
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderBooking}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.noData}>Nenhum agendamento encontrado.</Text>
            )}

            <ResponseModal
                visible={modalVisible}
                message={modalMessage}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

export default Schedule;
