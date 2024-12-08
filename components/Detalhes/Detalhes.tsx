import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import MapView, { Marker } from "react-native-maps";

const Detalhes: React.FC = () => {
  const navigateToLocation = () => {
    const location = "Estrada Das Lagrimas 1249, São Paulo";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Mapa */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -23.612311250681064, // Latitude do local
            longitude: -46.594579887615446, // Longitude do local
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: -23.61966, longitude: -46.58048 }}
            title="Kink Barbearia"
            description="Estrada Das Lagrimas 1249, São Paulo"
          />
        </MapView>

        {/* Botão de navegação */}
        <TouchableOpacity
          style={styles.navigateButton}
          onPress={navigateToLocation}
        >
          <Image
            source={require("../../assets/images/kinkbarbearia-removebg-preview.png")}
            style={styles.logo}
          />
          <View>
            <Text style={styles.buttonTitle}>Kink Barbearia</Text>
            <Text style={styles.buttonSubtitle}>
              Estrada Das Lagrimas 1249, São Paulo
            </Text>
            <View style={styles.divisoria} />
            <Image
              source={require("../../assets/images/gps.png")}
              style={styles.gps}
            ></Image>
          </View>
        </TouchableOpacity>
        <View style={styles.infocontato}>
          <Text style={styles.strong}>Contato e Horario De Funcionamento</Text>
        </View>

        {/* Contato e Horário */}
        <View style={styles.horarios}>
          <Text>
            {" "}
            <Text style={styles.strong}>{"\n"}Segunda-Feira a Sabado </Text>
            <Text style={styles.span}>10:00 - 20:00{"\n"}</Text>
            <Text style={styles.strong}>Domingo </Text>
            <Text style={styles.span}>Fechado{"\n\n"}</Text>
            <Text style={styles.strong}>Wallace </Text>
            <Text style={styles.span}>Terça-Feira Folga{"\n"}</Text>
            <Text style={styles.strong}>Mateus </Text>
            <Text style={styles.span}>Quarta-Feira Folga{"\n"}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://wa.me/5511987410733")}
          >
            <View style={styles.bar_1}></View>

            <Text style={styles.contactLink}>(11) 98741-0733</Text>
            <Image
              source={require("../../assets/images/whatsapp.png")}
              style={styles.whatsappIcon}
            />
            <View style={styles.bar_2}></View>
          </TouchableOpacity>
          {/* Horários de Funcionamento */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Detalhes;
