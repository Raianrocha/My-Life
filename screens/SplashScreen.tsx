import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Hook de navegação
import styles from "../styles/SplashStyles";

export default function SplashScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Círculo topo esquerdo */}
      <View style={styles.topCircleLight} />
      <View style={styles.topCircleDark} />

      {/* Tornando o texto clicável */}
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => navigation.navigate("Login")} // "Login" deve ser o nome da sua rota
      >
        <Text style={styles.logoText}>My Life</Text>
      </TouchableOpacity>

      {/* Círculo inferior direito */}
      <View style={styles.bottomCircleLight} />
      <View style={styles.bottomCircleDark} />
    </View>
  );
}