import React from "react";
import { View, Image, ImageBackground } from "react-native";
import { styles } from "./styles"; // Importando os estilos separados

const Header = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/background-image-top.png")}
      style={styles.headerBackground}
    >
      <Image
        source={require("../../assets/images/kinkbarbearia-removebg-preview.png")}
        style={styles.logo}
      />
    </ImageBackground>
  );
};

export default Header;
