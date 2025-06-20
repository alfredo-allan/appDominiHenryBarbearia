import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import estrelaNota from "../../assets/images/estrelanota.png";
import estrelaVazia from "../../assets/images/estrela-vazia.png";
import { styles } from "./styles";
import { useAssessmentAPI } from "./api";
import { useAuth } from "../../src/Context/AuthContext";
import ResponseModal from "../ResponseModal/ResponseModal"; // ajuste o caminho conforme necessário

interface Comentario {
  id: number;
  comment_text: string;
  rating: number;
  timestamp: string;
  user_email: string;
  user_id: number;
  user_name: string;
}

const Assessment: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { postComentario, getComentarios } = useAssessmentAPI();

  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [notaModal, setNotaModal] = useState(5);
  const [comentarioModal, setComentarioModal] = useState("");

  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [responseModalMessage, setResponseModalMessage] = useState("");

  const mediaNota = 5.0;
  const estrelas = [1, 2, 3, 4, 5];
  const avaliacoesPorEstrela: { [key: number]: number } = {
    5: 80,
    4: 30,
    3: 1,
    2: 0,
    1: 0,
  };

  useEffect(() => {
    carregarComentarios();
  }, []);

  const carregarComentarios = async () => {
    try {
      const data = await getComentarios();
      setComentarios(data);
    } catch (error) {
      setResponseModalMessage("Não foi possível carregar os comentários.");
      setResponseModalVisible(true);
    }
  };

  const abrirModal = () => {
    if (!isAuthenticated) {
      setResponseModalMessage("Você precisa estar logado para avaliar.");
      setResponseModalVisible(true);
      return;
    }
    setModalVisible(true);
  };

  const enviarComentario = async () => {
    if (!comentarioModal.trim()) {
      setResponseModalMessage("Comentário não pode estar vazio.");
      setResponseModalVisible(true);
      return;
    }

    try {
      await postComentario({
        commentText: comentarioModal,
        rating: notaModal,
      });

      setResponseModalMessage("Comentário enviado com sucesso.");
      setResponseModalVisible(true);

      setComentarioModal("");
      setNotaModal(5);
      setModalVisible(false);
      carregarComentarios();
    } catch (error: any) {
      setResponseModalMessage(error.message || "Erro ao enviar o comentário.");
      setResponseModalVisible(true);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container_av}>
          <TouchableOpacity
            style={styles.avaliarBox}
            activeOpacity={0.8}
            onPress={abrirModal}
          >
            <Text style={styles.avaliarTexto}>Digite sua avaliação!</Text>
            <Text style={styles.ratingTexto}>Quantas estrelas merecemos?</Text>
          </TouchableOpacity>

          <View style={styles.notaContainer}>
            <Text style={styles.nota}>{mediaNota.toFixed(1)}</Text>
            <View style={styles.estrelasContainer}>
              {estrelas.map((estrela) => (
                <Image
                  key={estrela}
                  style={styles.estrela}
                  source={estrelaNota}
                />
              ))}
            </View>
          </View>

          <View style={styles.barrasContainer}>
            {estrelas.slice().reverse().map((estrela) => (
              <View key={estrela} style={styles.barra}>
                <Text style={styles.barraTexto}>
                  {estrela}{" "}
                  <Image style={styles.estrela} source={estrelaNota} />
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

          {comentarios.map((comentario) => (
            <View key={comentario.id} style={styles.comentarioWrapper}>
              <View style={styles.comentario}>
                <Text style={styles.usuario}>{comentario.user_name}</Text>
                <Text style={styles.textoComentario}>
                  {comentario.comment_text}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 4 }}>
                  {Array.from({ length: comentario.rating }).map((_, index) => (
                    <Image
                      key={index}
                      source={estrelaNota}
                      style={{ width: 20, height: 20, marginRight: 2 }}
                      resizeMode="contain"
                    />
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Avalie nosso serviço</Text>

            <View style={styles.estrelasContainer}>
              {estrelas.map((estrela) => (
                <TouchableOpacity
                  key={estrela}
                  onPress={() => setNotaModal(estrela)}
                >
                  <Image
                    style={styles.estrela}
                    source={estrela <= notaModal ? estrelaNota : estrelaVazia}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.inputComentario}
              placeholder="Escreva seu comentário..."
              multiline
              value={comentarioModal}
              onChangeText={setComentarioModal}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={enviarComentario}>
                <Text style={styles.enviar}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ResponseModal
        visible={responseModalVisible}
        message={responseModalMessage}
        onClose={() => setResponseModalVisible(false)}
      />
    </>
  );
};

export default Assessment;
