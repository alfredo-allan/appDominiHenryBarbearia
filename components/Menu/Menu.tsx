import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./styles"; // Estilos separados
import Servicos from "../Servicos/Servicos"; // Componente Serviços
import Avaliacao from "../Avaliacao/Avaliacao";
import Portfolio from "../Portfolio/Portfolio";
import Detalhes from "../Detalhes/Detalhes";
import Schedule from "../Schedule/Schedule";
import { Schedulestyles } from "./ScheculeContainerStyles";

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu); // Alterna o estado do menu
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegação */}
      <View style={styles.menu}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.navList}>
            {[
              "Serviços",
              "Avaliação",
              "Portfolio",
              "Detalhes",
              "Agendamentos",
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.navItem} // Estilo base sem ativação
                onPress={() => handleMenuClick(item)}
              >
                <Text style={styles.navText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Renderiza o conteúdo baseado no menu ativo */}
      <View
        style={[
          styles.content,
          activeMenu === "Agendamentos" ? Schedulestyles.scheduleContainer : null,
        ]}
      >
        {activeMenu === "Serviços" && <Servicos />}
        {activeMenu === "Avaliação" && <Avaliacao />}
        {activeMenu === "Portfolio" && <Portfolio />}
        {activeMenu === "Detalhes" && <Detalhes />}
        {activeMenu === "Agendamentos" && <Schedule />}
      </View>
    </View>
  );
};

export default Menu;
