import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { styles } from "./styles"; // Importando os estilos separados

const imagePaths = [
  require("../../assets/images/foto1.jpeg"),
  require("../../assets/images/foto2.jpeg"),
  require("../../assets/images/foto3.jpeg"),
  require("../../assets/images/foto4.jpeg"),
  require("../../assets/images/foto5.jpeg"),
  // require("../../assets/images/foto6.jpg"),
];

const Portfolio: React.FC = () => {
  return (
    <View style={styles.portfolioContainer}>
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
    </View>
  );
};

export default Portfolio;
