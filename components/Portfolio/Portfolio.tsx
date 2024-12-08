import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { styles } from "./styles"; // Importando os estilos separados

const imagePaths = [
  require("../../assets/images/foto1.jpg"),
  require("../../assets/images/foto2.jpg"),
  require("../../assets/images/foto3.jpg"),
  require("../../assets/images/foto4.jpg"),
  require("../../assets/images/foto5.jpg"),
  require("../../assets/images/foto6.jpg"),
];

const Portfolio: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {imagePaths.map((imagePath, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={imagePath} style={styles.image} />
        </View>
      ))}
    </ScrollView>
  );
};

export default Portfolio;
