import React, { useEffect, useState, } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCustomerBookings, deleteCustomerBooking } from "./api"; // Corrigido: Uso de funções corretas do api.ts
import { styles } from "./styles";

interface Booking {
    id: number;
    service: string; // Nome do serviço
    barber: string; // Nome do barbeiro
    date: string; // Data do agendamento
    time: string; // Hora do agendamento
    duration: number; // Duração do serviço
    valueservice: number; // Valor do serviço
}


const Schedule: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Função para carregar os agendamentos do usuário logado
    const loadBookings = async () => {
        try {
            setLoading(true);

            const response = await getCustomerBookings();

            console.log("Resposta do backend:", response); // Verifique o formato aqui

            const validBookings = response.map((booking: any) => ({
                id: booking.id,
                service: booking.service,
                barber: booking.barber,
                date: booking.date,
                time: booking.time,
                duration: booking.duration,
                valueservice: booking.value, // Ajuste o campo de acordo com o JSON retornado
            }));

            console.log("Agendamentos processados:", validBookings); // Verifique aqui também
            setBookings(validBookings);
        } catch (error) {
            console.error("Erro ao carregar os agendamentos:", error);
            Alert.alert("Erro", "Não foi possível carregar os agendamentos.");
        } finally {
            setLoading(false);
        }
    };


    // Função para excluir um agendamento
    const handleDelete = async (bookingId: number) => {
        if (!bookingId) {
            Alert.alert("Erro", "ID do agendamento inválido.");
            return;
        }

        try {
            const confirmed = await new Promise((resolve) =>
                Alert.alert(
                    "Confirmar exclusão",
                    "Você deseja mesmo excluir este agendamento?",
                    [
                        { text: "Cancelar", onPress: () => resolve(false), style: "cancel" },
                        { text: "Excluir", onPress: () => resolve(true), style: "destructive" },
                    ]
                )
            );

            if (!confirmed) return;

            // Exclui o agendamento usando a função do api.ts
            await deleteCustomerBooking(bookingId);
            setBookings((prevBookings) => prevBookings.filter((b) => b.id !== bookingId));
            Alert.alert("Sucesso", "Agendamento excluído com sucesso.");
        } catch (error) {
            console.error("Erro ao excluir agendamento:", error);
            Alert.alert("Erro", "Não foi possível excluir o agendamento.");
        }
    };


    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        console.log("Agendamentos carregados:", bookings);
    }, [bookings]);

    // Renderiza cada agendamento na lista
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
        </View>
    );

};

export default Schedule;
