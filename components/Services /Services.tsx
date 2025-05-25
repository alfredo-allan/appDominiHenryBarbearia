import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles"; // Importando os estilos
import ServiceModal from "../ServiceModal/ServiceModal"; // Importar o modal

const Services = () => {
  const [selectedService, setSelectedService] = useState<{
    name: string;
    price: string;
    duration: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const services = [
    { name: "Corte Simples", price: "R$ 30,00", duration: "45m" },
    { name: "Barba Simples", price: "R$ 20,00", duration: "20m" },
    { name: "Pézinho", price: "R$ 10,00", duration: "10m" },
    { name: "Corte + Barba", price: "R$ 50,00", duration: "1h" },
    { name: "Corte + Sobrancelha", price: "R$ 35,00", duration: "25m" },
    { name: "Corte + produto", price: "R$ 60,00", duration: "1h" },
    { name: "Corte + Luzes", price: "R$ 90,00", duration: "1,5h" },
    { name: "Máscara Simples", price: "R$ 10,00", duration: "15m" },
    { name: "Hidratação", price: "R$ 10,00", duration: "10m" },
  ];

  const handleOpenModal = (service: { name: string; price: string; duration: string }) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedService(null);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.serviceTitle}>Serviços</Text>

      <View style={styles.containerDosServicos}>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
            <Text style={styles.serviceDuration}>{service.duration}</Text>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => handleOpenModal(service)}
            >
              <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <ServiceModal
        visible={modalVisible}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </ScrollView>
  );
};

export default Services;
