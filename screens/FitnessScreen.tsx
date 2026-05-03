import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/FitenesStyles';

type ExerciseItem = {
  id: string;
  name: string;
  weight: string;
  reps: string;
};

type Section = {
  title: string;
  exercises: ExerciseItem[];
};

const initialData: Section[] = [
  { title: 'Segunda:', exercises: [] },
  { title: 'Terça:', exercises: [] },
  { title: 'Quarta:', exercises: [] },
  { title: 'Quinta:', exercises: [] },
  { title: 'Sexta:', exercises: [] },
  { title: 'Sábado:', exercises: [] },
  { title: 'Domingo:', exercises: [] },
];

const FitnessScreen: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<Section[]>(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [nomeExercicio, setNomeExercicio] = useState('');
  const [carga, setCarga] = useState('');
  const [repeticoes, setRepeticoes] = useState('');

  // 1. Carrega os dados salvos do AsyncStorage
  const carregarDados = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('@fitness_data');
      if (dadosSalvos) {
        setData(JSON.parse(dadosSalvos));
      }
    } catch (e) {
      console.error('Erro ao carregar dados fitness:', e);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // 2. Salva e atualiza o estado de forma simultânea
  const salvarDados = async (novosDados: Section[]) => {
    try {
      await AsyncStorage.setItem('@fitness_data', JSON.stringify(novosDados));
      setData(novosDados);
    } catch (e) {
      console.error('Erro ao salvar dados fitness:', e);
    }
  };

  const openModal = (index: number) => {
    setSelectedDay(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNomeExercicio('');
    setCarga('');
    setRepeticoes('');
    setSelectedDay(null);
  };

  const addExercise = () => {
    if (!nomeExercicio.trim() || !carga.trim() || !repeticoes.trim() || selectedDay === null) return;

    const newExerciseItem: ExerciseItem = {
      id: Math.random().toString(36).substring(7),
      name: nomeExercicio.trim(),
      weight: carga.trim(),
      reps: repeticoes.trim(),
    };

    const updatedData = data.map((item, index) => {
      if (index === selectedDay) {
        return {
          ...item,
          exercises: [...item.exercises, newExerciseItem],
        };
      }
      return item;
    });

    salvarDados(updatedData);
    closeModal();
  };

  const deleteExercise = (secIndex: number, exerciseId: string) => {
    Alert.alert(
      'Excluir Exercício',
      'Deseja realmente excluir este exercício?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedData = data.map((section, index) => {
              if (index === secIndex) {
                return {
                  ...section,
                  exercises: section.exercises.filter((ex) => ex.id !== exerciseId),
                };
              }
              return section;
            });
            salvarDados(updatedData);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER / TABS */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Fitness</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Financeiro' as never)}
        >
          <Text style={styles.tabText}>Financeiro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Acadêmico</Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((section, secIndex) => (
          <View key={secIndex} style={styles.section}>
            
            <View style={styles.row}>
              <Text style={styles.title}>{section.title}</Text>

              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => openModal(secIndex)}
              >
                <Text style={styles.addText}>+ Exercício</Text>
              </TouchableOpacity>
            </View>

            {section.exercises.length === 0 ? (
              <Text style={[styles.item, { color: '#888', fontStyle: 'italic' }]}>
                Nenhum exercício adicionado.
              </Text>
            ) : (
              section.exercises.map((item) => (
                <View 
                  key={item.id} 
                  style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, alignItems: 'center' }}
                >
                  <Text style={[styles.item, { whiteSpace: 'pre-line', flex: 1, marginBottom: 0 }]}>
                    • {item.name} - Carga: {item.weight}kg - Repetições: {item.reps}
                  </Text>
                  
                  <TouchableOpacity 
                    onPress={() => deleteExercise(secIndex, item.id)}
                    style={{ padding: 4 }}
                  >
                    <Text style={{ color: '#ff5c5c', fontWeight: 'bold' }}>🗑️ Excluir</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ))}
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            <Text style={styles.modalTitle}>Novo Exercício</Text>

            <TextInput
              placeholder="Nome do exercício"
              value={nomeExercicio}
              onChangeText={setNomeExercicio}
              style={styles.input}
            />

            <TextInput
              placeholder="Carga (ex: 50)"
              value={carga}
              onChangeText={setCarga}
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              placeholder="Repetições (ex: 3x10)"
              value={repeticoes}
              onChangeText={setRepeticoes}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={addExercise}
            >
              <Text style={styles.modalButtonText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
};

export default FitnessScreen;