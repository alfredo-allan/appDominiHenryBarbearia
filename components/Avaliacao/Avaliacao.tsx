import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "./styles"; // Importando os estilos separados

// Tipos para comentários e avaliações
interface Comentario {
  usuario: string;
  comentario: string;
  nota: number;
}

interface AvaliacoesPorEstrela {
  [key: number]: number;
}

const Avaliacao: React.FC = () => {
  const [nota] = useState<number>(5.0); // Nota inicial
  const totalAvaliacoes: number = 20; // Número total de avaliações

  const estrelas: number[] = [1, 2, 3, 4, 5];

  const avaliacoesPorEstrela: AvaliacoesPorEstrela = {
    5: 80, // Representa 80% de avaliações 5 estrelas
    4: 30,
    3: 1,
    2: 0,
    1: 0,
  };

  const comentarios: Comentario[] = [
    { usuario: "João", comentario: "Ótimo atendimento!", nota: 5 },
    { usuario: "Maria", comentario: "Serviço excelente.", nota: 4 },
    { usuario: "Carlos", comentario: "Muito bom, recomendo!", nota: 5 },
    // Adicione mais comentários aqui
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container_av}>
        {/* Nota e Estrelas */}
        <View style={styles.notaContainer}>
          <Text style={styles.nota}>{nota.toFixed(1)}</Text>
          <View style={styles.estrelasContainer}>
            {estrelas.map((estrela) => (
              <Image
                key={estrela}
                style={styles.estrela}
                source={require("../../assets/images/estrelanota.png")}
              />
            ))}
          </View>
          <Text style={styles.totalAvaliacoes}>
            {totalAvaliacoes} Avaliações
          </Text>
        </View>

        {/* Barras de Avaliação */}
        <View style={styles.barrasContainer}>
          {estrelas
            .slice()
            .reverse() // Reverte a ordem para mostrar 5 estrelas primeiro
            .map((estrela) => (
              <View key={estrela} style={styles.barra}>
                <Text style={styles.barraTexto}>
                  {estrela}{" "}
                  <Image
                    key={estrela}
                    style={styles.estrela}
                    source={require("../../assets/images/estrelanota.png")}
                  />{" "}
                </Text>
                <View style={styles.statusBar}>
                  <View
                    style={[
                      styles.statusBarFill,
                      { width: `${avaliacoesPorEstrela[estrela] || 0}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
        </View>

        {/* Comentários */}
        {comentarios.map((comentario, index) => (
          <View key={index} style={styles.comentario}>
            <Text style={styles.usuario}>{comentario.usuario}</Text>
            <Text style={styles.textoComentario}>{comentario.comentario}</Text>
            <Text style={styles.notaComentario}>
              {comentario.nota} estrelas
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Avaliacao;
