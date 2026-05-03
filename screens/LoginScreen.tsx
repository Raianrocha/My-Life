import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../styles/LoginStyles";
import CustomButton from "../components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.subtitle}>
        Faça login com os dados que você inseriu durante o seu cadastro
      </Text>

      {/* EMAIL */}
      <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#999"
      />

      {/* SENHA */}
      <Text style={styles.label}>SENHA</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#999"
      />

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password</Text>
      </TouchableOpacity>

      <CustomButton title="Login" onPress={() => navigation.navigate('Fitness')} />

      {/* DIVISOR */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or login with</Text>
        <View style={styles.line} />
      </View>

      {/* SOCIAL BUTTONS */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../assets/google.png")}
            style={styles.googleIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText}>
        Não tem uma conta?{" "}
        <Text style={styles.registerLink}>Registre-se</Text>
      </Text>
    </View>
  );
}