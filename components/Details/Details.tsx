import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { styles } from "./styles";

const Details: React.FC = () => {
  const latitude = -23.615073775382466;
  const longitude = -46.592578725496786;

  const navigateToLocation = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Imagem ilustrativa do mapa com clique para abrir o Google Maps */}
        <TouchableOpacity onPress={navigateToLocation} activeOpacity={0.8}>
          <Image
            source={require("../../assets/images/mapview.png")} // coloque sua imagem aqui
            style={styles.map}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Botão de navegação */}
        <TouchableOpacity
          style={styles.navigateButton}
          onPress={navigateToLocation}
        >
          <Image
            source={require("../../assets/images/splash.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.buttonTitle}>Barbearia Domini Henry</Text>
            <Text style={styles.buttonSubtitle}>
              Rua Flores de São Pedro, 27 - {"\n"}Vila Heliopolis, São Paulo
            </Text>
            <View style={styles.divider} />
            <Image
              source={require("../../assets/images/gps.png")}
              style={styles.gps}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.infocontact}>
          <Text style={styles.strong}>Contato e Horario De Funcionamento</Text>
        </View>

        {/* Contato e Horário */}
        <View style={styles.schedules}>
          <Text style={styles.contentSchedules}>
            <Text style={styles.strong}>{"\n"}Segunda a Sabado </Text>
            <Text style={styles.span}>10:00 - 20:00{"\n"}</Text>
            <Text style={styles.strong}>Domingo </Text>
            <Text style={styles.span}>Fechado{"\n\n"}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://wa.me/5511920531626")}
          >
            <View style={styles.bar_1} />
            <Text style={styles.contactLink}>(11) 92053-1626</Text>
            <Image
              source={require("../../assets/images/whatsapp.png")}
              style={styles.whatsappIcon}
            />
            <View style={styles.bar_2} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;
