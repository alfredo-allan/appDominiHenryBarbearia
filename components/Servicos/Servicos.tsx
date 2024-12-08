import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles"; // Importando os estilos
import ServiceModal from "../../components/ServiceModal/ServiceModal"; // Importar o modal

const Servicos = () => {
  const [selectedService, setSelectedService] = useState<{
    name: string;
    price: string;
    duration: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const services = [
    { name: "Corte Simples", price: "R$ 30,00", duration: "45m" },
    { name: "Barba Simples", price: "R$ 30,00", duration: "45m" },
    { name: "Pézinho", price: "R$ 15,00", duration: "30m" },
    { name: "Corte + Barba", price: "R$ 50,00", duration: "1h" },
    { name: "Corte + Sobrancelha", price: "R$ 35,00", duration: "25m" },
    { name: "Máscara Simples", price: "R$ 15,00", duration: "30m" },
    { name: "Hidratação", price: "R$ 15,00", duration: "35m" },
    { name: "Luzes", price: "R$ 90,00", duration: "1,5h" },
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

      <ServiceModal
        visible={modalVisible}
        onClose={handleCloseModal}
        service={selectedService}
      />
    </ScrollView>
  );
};

export default Servicos;
