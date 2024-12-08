import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { styles } from "./styles"; // Importando os estilos separados

const InfoBarber = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>King Barbearia</Text>
      <View style={styles.socialContainer}>
        <Image
          source={require("../../assets/images/compartilhar.png")}
          style={styles.icon}
          alt="compartilhar"
        />
        <Image
          source={require("../../assets/images/coracao.png")}
          style={styles.icon}
          alt="curtir"
        />
      </View>
      <Text style={styles.address}>
        Estrada das Lagrimas 1249, 04232-000,{"\n"}
        São Paulo Heliopolis.
      </Text>
    </View>
  );
};

export default InfoBarber;
