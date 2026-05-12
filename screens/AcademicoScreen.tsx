import React, { useState, useEffect, useMemo } from 'react';

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

import { LineChart } from 'react-native-chart-kit';

import styles from '../styles/FitenesStyles';

type SubjectItem = {
  id: string;
  disciplina: string;
  nota: number;
};

type SubjectSection = {
  title: string;
  items: SubjectItem[];
};

const initialAcademicData: SubjectSection[] = [
  { title: 'Segunda-feira', items: [] },
  { title: 'Terça-feira', items: [] },
  { title: 'Quarta-feira', items: [] },
  { title: 'Quinta-feira', items: [] },
  { title: 'Sexta-feira', items: [] },
];

const AcademicoScreen: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] =
    useState<SubjectSection[]>(
      initialAcademicData,
    );

  const [modalVisible, setModalVisible] =
    useState(false);

  const [selectedSection, setSelectedSection] =
    useState<number | null>(null);

  const [disciplina, setDisciplina] =
    useState('');

  const [nota, setNota] = useState('');

  const [chartVisible, setChartVisible] =
    useState(false);

  const [boletimVisible, setBoletimVisible] =
    useState(false);

  // CARREGAR DADOS
  const carregarDados = async () => {
    try {
      const dadosSalvos =
        await AsyncStorage.getItem(
          '@academic_data',
        );

      if (dadosSalvos) {
        setData(JSON.parse(dadosSalvos));
      }
    } catch (e) {
      console.log(
        'Erro ao carregar dados:',
        e,
      );
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // SALVAR DADOS
  const salvarDados = async (
    novosDados: SubjectSection[],
  ) => {
    try {
      await AsyncStorage.setItem(
        '@academic_data',
        JSON.stringify(novosDados),
      );

      setData(novosDados);
    } catch (e) {
      console.log(
        'Erro ao salvar dados:',
        e,
      );
    }
  };

  // ABRIR MODAL
  const openModal = (index: number) => {
    setSelectedSection(index);
    setModalVisible(true);
  };

  // FECHAR MODAL
  const closeModal = () => {
    setModalVisible(false);

    setDisciplina('');

    setNota('');

    setSelectedSection(null);
  };

  // ADICIONAR DISCIPLINA
  const addItem = () => {
    if (
      !disciplina.trim() ||
      !nota.trim() ||
      selectedSection === null
    ) {
      Alert.alert(
        'Erro',
        'Preencha todos os campos.',
      );

      return;
    }

    const notaLimpa = nota
      .trim()
      .replace(',', '.');

    const numericNota =
      parseFloat(notaLimpa);

    // AGORA DE 0 A 100
    if (
      isNaN(numericNota) ||
      numericNota < 0 ||
      numericNota > 100
    ) {
      Alert.alert(
        'Nota inválida',
        'Digite uma nota entre 0 e 100.',
      );

      return;
    }

    const newItem: SubjectItem = {
      id: Math.random()
        .toString(36)
        .substring(7),

      disciplina: disciplina.trim(),

      nota: numericNota,
    };

    const updatedData = data.map(
      (section, index) => {
        if (index === selectedSection) {
          return {
            ...section,

            items: [
              ...section.items,
              newItem,
            ],
          };
        }

        return section;
      },
    );

    salvarDados(updatedData);

    closeModal();
  };

  // EXCLUIR
  const handleDeleteItem = (
    secIndex: number,
    itemId: string,
  ) => {
    Alert.alert(
      'Excluir Disciplina',
      'Deseja realmente excluir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',

          style: 'destructive',

          onPress: () => {
            const updatedData = data.map(
              (section, index) => {
                if (index === secIndex) {
                  return {
                    ...section,

                    items:
                      section.items.filter(
                        item =>
                          item.id !== itemId,
                      ),
                  };
                }

                return section;
              },
            );

            salvarDados(updatedData);
          },
        },
      ],
    );
  };

  // MÉDIA POR DIA
  const calcularMediaPorDia = (
    titulo: string,
  ) => {
    const secao = data.find(
      item => item.title === titulo,
    );

    if (
      !secao ||
      secao.items.length === 0
    ) {
      return 0;
    }

    const soma = secao.items.reduce(
      (acc, curr) =>
        acc + curr.nota,
      0,
    );

    return soma / secao.items.length;
  };

  // MÉDIA GERAL
  const mediaGeral = useMemo(() => {
    const todasNotas = data.flatMap(
      section =>
        section.items.map(
          item => item.nota,
        ),
    );

    if (todasNotas.length === 0) {
      return 0;
    }

    const soma = todasNotas.reduce(
      (acc, curr) => acc + curr,
      0,
    );

    return soma / todasNotas.length;
  }, [data]);

  // GRÁFICO
  const chartData = {
    labels: [
      'Seg',
      'Ter',
      'Qua',
      'Qui',
      'Sex',
    ],

    datasets: [
      {
        data: data.map(section => {
          const media =
            calcularMediaPorDia(
              section.title,
            );

          return media === 0
            ? 0.1
            : media;
        }),

        color: (opacity = 1) =>
          `rgba(255,255,255,${opacity})`,

        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() =>
            navigation.navigate(
              'Fitness' as never,
            )
          }
        >
          <Text style={styles.tabText}>
            Fitness
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() =>
            navigation.navigate(
              'Financeiro' as never,
            )
          }
        >
          <Text style={styles.tabText}>
            Financeiro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              styles.activeTabText,
            ]}
          >
            Acadêmico
          </Text>
        </TouchableOpacity>
      </View>

      {/* BOTÕES */}
      <View
        style={styles.buttonRow}
      >
        <TouchableOpacity
          style={styles.tab}
          onPress={() =>
            setChartVisible(true)
          }
        >
          <Text style={styles.tabText}>
            Gráfico
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() =>
            setBoletimVisible(true)
          }
        >
          <Text style={styles.tabText}>
            Boletim
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >
        {data.map(
          (section, secIndex) => (
            <View
              key={secIndex}
              style={styles.section}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {section.title}
                </Text>

                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() =>
                    openModal(secIndex)
                  }
                >
                  <Text
                    style={styles.addText}
                  >
                    + Adicionar
                  </Text>
                </TouchableOpacity>
              </View>

              {section.items.length ===
              0 ? (
                <Text
                  style={[
                    styles.item,
                    {
                      color: '#888',
                      fontStyle:
                        'italic',
                    },
                  ]}
                >
                  Nenhuma disciplina
                  adicionada.
                </Text>
              ) : (
                section.items.map(item => (
                  <View
                    key={item.id}
                    style={styles.row}
                  >
                    <Text
                      style={[
                        styles.item,
                        {
                          flex: 1,
                          marginBottom: 0,
                          color:
                            item.nota >= 60
                              ? 'green'
                              : 'red',
                        },
                      ]}
                    >
                      • {
                        item.disciplina
                      } - Nota:{' '}
                      {item.nota.toFixed(
                        0,
                      )}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        handleDeleteItem(
                          secIndex,
                          item.id,
                        )
                      }
                    >
                      <Text
                        style={{
                          color:
                            '#ff5c5c',
                          fontWeight:
                            'bold',
                        }}
                      >
                        🗑️
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}

              <Text
                style={styles.title}
              >
                Média:{' '}
                {calcularMediaPorDia(
                  section.title,
                ).toFixed(0)}
              </Text>
            </View>
          ),
        )}
      </ScrollView>

      {/* MODAL ADICIONAR */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={styles.modalContainer}
          >
            <Text
              style={styles.modalTitle}
            >
              Nova Disciplina
            </Text>

            <TextInput
              placeholder="Disciplina"
              value={disciplina}
              onChangeText={
                setDisciplina
              }
              style={styles.input}
            />

            <TextInput
              placeholder="Nota (0 a 100)"
              value={nota}
              onChangeText={setNota}
              keyboardType="numeric"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={addItem}
            >
              <Text
                style={
                  styles.modalButtonText
                }
              >
                Adicionar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={closeModal}
            >
              <Text
                style={styles.cancelText}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL BOLETIM */}
      <Modal
        visible={boletimVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setBoletimVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { width: '90%' },
            ]}
          >
            <Text
              style={styles.modalTitle}
            >
              📚 Boletim Escolar
            </Text>

            <ScrollView
              style={{ width: '100%' }}
            >
              {data.map(section => (
                <View
                  key={section.title}
                  style={styles.section}
                >
                  <Text
                    style={styles.title}
                  >
                    {section.title}
                  </Text>

                  {section.items.length ===
                  0 ? (
                    <Text
                      style={styles.item}
                    >
                      Nenhuma disciplina.
                    </Text>
                  ) : (
                    section.items.map(item => (
                      <Text
                        key={item.id}
                        style={[
                          styles.item,
                          {
                            color:
                              item.nota >=
                              60
                                ? 'green'
                                : 'red',
                          },
                        ]}
                      >
                        {item.disciplina} -{' '}
                        {item.nota.toFixed(
                          0,
                        )}
                      </Text>
                    ))
                  )}

                  <Text
                    style={styles.title}
                  >
                    Média:{' '}
                    {calcularMediaPorDia(
                      section.title,
                    ).toFixed(0)}
                  </Text>
                </View>
              ))}

              <Text
                style={[
                  styles.modalTitle,
                  {
                    marginTop: 10,
                  },
                ]}
              >
                Média Geral:{' '}
                {mediaGeral.toFixed(0)}
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() =>
                setBoletimVisible(false)
              }
            >
              <Text
                style={
                  styles.modalButtonText
                }
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL GRÁFICO */}
      <Modal
        visible={chartVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setChartVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { width: '90%' },
            ]}
          >
            <Text
              style={styles.modalTitle}
            >
              Desempenho Acadêmico
            </Text>

            <View
              style={{
                alignItems: 'center',
                marginVertical: 15,
              }}
            >
              <LineChart
                data={chartData}
                width={280}
                height={180}
                bezier
                fromZero
                yAxisSuffix=""
                yAxisInterval={20}
                chartConfig={{
                  backgroundColor:
                    '#8A56AC',

                  backgroundGradientFrom:
                    '#8A56AC',

                  backgroundGradientTo:
                    '#B39DDB',

                  decimalPlaces: 0,

                  color: (
                    opacity = 1,
                  ) =>
                    `rgba(255,255,255,${opacity})`,

                  labelColor: (
                    opacity = 1,
                  ) =>
                    `rgba(255,255,255,${opacity})`,
                }}
                style={{
                  borderRadius: 16,
                }}
              />
            </View>

            <Text
              style={styles.modalTitle}
            >
              Média Geral:{' '}
              {mediaGeral.toFixed(0)}
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() =>
                setChartVisible(false)
              }
            >
              <Text
                style={
                  styles.modalButtonText
                }
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AcademicoScreen;