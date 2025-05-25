import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import { useAuth } from "../../src/Context/AuthContext";
import { styles } from "./styles";
import { reportShare, reportLike } from "./api";

const InfoBarber = () => {
  const { user, isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);

  const handleShare = async () => {
    if (!isAuthenticated || !user?.id) {
      Alert.alert("Atenção", "Você precisa estar logado para compartilhar.");
      return;
    }

    try {
      await reportShare(user.id); // usando a API
      await Share.share({
        message: "Confira o app do nosso salão: https://meusalãoexpo.app",
      });

      Alert.alert("Sucesso", "Compartilhamento registrado.");
    } catch (error) {
      Alert.alert("Erro", "Falha ao compartilhar.");
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated || !user?.id) {
      Alert.alert("Atenção", "Você precisa estar logado para curtir.");
      return;
    }

    try {
      await reportLike(user.id); // usando a API
      setLiked(true);
    } catch (error) {
      Alert.alert("Erro", "Erro ao registrar like.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Domini Henry</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleShare}>
          <Image
            source={require("../../assets/images/compartilhar.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLike}>
          <Image
            source={
              liked
                ? require("../../assets/images/coracao-vermelho.png")
                : require("../../assets/images/coracao.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.address}>
        Rua Flores de São Pedro, 27 - Vila Heliopolis,{"\n"}
        São Paulo.
      </Text>
    </View>
  );
};

export default InfoBarber;
