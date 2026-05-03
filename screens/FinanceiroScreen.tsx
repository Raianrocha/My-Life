import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Share,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import styles from '../styles/FitenesStyles';

type FinanceItem = {
  id: string;
  name: string;
  value: number;
};

type FinanceSection = {
  title: string;
  items: FinanceItem[];
};

const initialFinanceData: FinanceSection[] = [
  { 
    title: 'Entrada:', 
    items: [] 
  },
  { 
    title: 'Saída:', 
    items: [] 
  },
];

const FinanceiroScreen: React.FC = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<FinanceSection[]>(initialFinanceData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [chartVisible, setChartVisible] = useState(false);

  // Carrega os dados salvos do AsyncStorage
  const carregarDados = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('@finance_data');
      if (dadosSalvos) {
        setData(JSON.parse(dadosSalvos));
      }
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Função para salvar dados de forma segura e explícita
  const salvarDados = async (novosDados: FinanceSection[]) => {
    try {
      await AsyncStorage.setItem('@finance_data', JSON.stringify(novosDados));
      setData(novosDados);
    } catch (e) {
      console.error('Erro ao salvar dados:', e);
    }
  };

  const openModal = (index: number) => {
    setSelectedSection(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNome('');
    setValor('');
    setSelectedSection(null);
  };

  const addItem = () => {
    if (!nome.trim() || !valor.trim() || selectedSection === null) return;

    const valorLimpo = valor.trim().replace(',', '.');
    const numericValue = parseFloat(valorLimpo);
    
    const newItem: FinanceItem = {
      id: Math.random().toString(36).substring(7),
      name: nome.trim(),
      value: numericValue
    };

    const updatedData = data.map((item, index) => {
      if (index === selectedSection) {
        return {
          ...item,
          items: [...item.items, newItem],
        };
      }
      return item;
    });

    salvarDados(updatedData);
    closeModal();
  };

  const handleDeleteItem = (secIndex: number, itemId: string) => {
    Alert.alert(
      'Excluir Registro',
      'Deseja realmente excluir este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedData = data.map((section, index) => {
              if (index === secIndex) {
                return {
                  ...section,
                  items: section.items.filter((item) => item.id !== itemId),
                };
              }
              return section;
            });
            salvarDados(updatedData);
          }
        }
      ]
    );
  };

  const calcularTotalPorSecao = (titulo: string) => {
    const secao = data.find((item) => item.title === titulo);
    if (!secao || secao.items.length === 0) return 0;
    return secao.items.reduce((acc, curr) => acc + (isNaN(curr.value) ? 0 : curr.value), 0);
  };

  const totalEntradas = calcularTotalPorSecao('Entrada:');
  const totalSaidas = calcularTotalPorSecao('Saída:');
  const saldoFinal = totalEntradas - totalSaidas;

  const gerarPlanilha = async () => {
    let csvContent = 'Categoria;Descrição;Valor\n';
    
    data.forEach((secao) => {
      secao.items.forEach((item) => {
        const categoria = secao.title.replace(':', '');
        csvContent += `"${categoria}";"${item.name}";"R$ ${item.value.toFixed(2).replace('.', ',')}"\n`;
      });
    });

    try {
      await Share.share({
        message: csvContent,
        title: 'Relatório Financeiro',
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar a planilha.');
    }
  };

  const chartData = {
    labels: ['Entrada', 'Saída', 'Saldo'],
    datasets: [
      {
        data: [
          totalEntradas === 0 ? 0.01 : totalEntradas, 
          totalSaidas === 0 ? 0.01 : totalSaidas, 
          saldoFinal
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Fitness' as never)}>
          <Text style={styles.tabText}>Fitness</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Financeiro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Academico' as never)}>
          <Text style={styles.tabText}>Acadêmico</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÕES */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
        <TouchableOpacity style={[styles.tab, { marginHorizontal: 5 }]} onPress={() => setChartVisible(true)}>
          <Text style={styles.tabText}>Gráfico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, { marginHorizontal: 5 }]} onPress={gerarPlanilha}>
          <Text style={styles.tabText}>Planilha</Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((section, secIndex) => (
          <View key={secIndex} style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.title}>{section.title}</Text>
              <TouchableOpacity style={styles.addBtn} onPress={() => openModal(secIndex)}>
                <Text style={styles.addText}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>

            {section.items.length === 0 ? (
              <Text style={[styles.item, { color: '#888', fontStyle: 'italic' }]}>
                Nenhum registro adicionado ainda.
              </Text>
            ) : (
              section.items.map((item) => (
                <View 
                  key={item.id}
                  style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, alignItems: 'center' }}
                >
                  <Text style={[styles.item, { whiteSpace: 'pre-line', flex: 1, marginBottom: 0 }]}>
                    • {item.name} - R$ {item.value.toFixed(2).replace('.', ',')}
                  </Text>
                  
                  <TouchableOpacity 
                    onPress={() => handleDeleteItem(secIndex, item.id)}
                    style={{ padding: 8 }}
                  >
                    <Text style={{ color: '#ff5c5c', fontWeight: 'bold' }}>🗑️ Excluir</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ))}
      </ScrollView>

      {/* MODAL PARA INSERIR NOVO ITEM */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Novo Registro Financeiro</Text>

            <TextInput
              placeholder="Nome ou descrição (ex: Salário, Livro, Café)"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              placeholder="Valor em R$ (ex: 50,00)"
              value={valor}
              onChangeText={setValor}
              keyboardType="decimal-pad"
              style={styles.input}
            />

            <TouchableOpacity style={styles.modalButton} onPress={addItem}>
              <Text style={styles.modalButtonText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL PARA GRÁFICO */}
      <Modal visible={chartVisible} transparent animationType="fade" onRequestClose={() => setChartVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { width: '90%' }]}>
            <Text style={styles.modalTitle}>Análise de Gastos e Entradas</Text>
            
            <View style={{ alignItems: 'center', marginVertical: 15, borderRadius: 16, overflow: 'hidden' }}>
              <LineChart
                data={chartData}
                width={280}
                height={160}
                chartConfig={{
                  backgroundColor: '#8A56AC',
                  backgroundGradientFrom: '#8A56AC',
                  backgroundGradientTo: '#B39DDB',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForBackgroundLines: { strokeDasharray: '' },
                }}
                style={{ borderRadius: 16 }}
                bezier
              />
            </View>

            <View style={{ marginVertical: 10, width: '100%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                <Text>Total de Entradas:</Text>
                <Text style={{ fontWeight: 'bold', color: 'green' }}>
                  R$ {totalEntradas.toFixed(2).replace('.', ',')}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                <Text>Total de Saídas:</Text>
                <Text style={{ fontWeight: 'bold', color: 'red' }}>
                  R$ {totalSaidas.toFixed(2).replace('.', ',')}
                </Text>
              </View>
              <View style={{ borderTopWidth: 1, borderColor: '#ddd', marginTop: 10, paddingTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: 'bold' }}>Saldo Final:</Text>
                  <Text style={{ fontWeight: 'bold', color: saldoFinal >= 0 ? 'blue' : 'orange' }}>
                    R$ {saldoFinal.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#8A56AC', marginTop: 10 }]} onPress={() => setChartVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FinanceiroScreen;