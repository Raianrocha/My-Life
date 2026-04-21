import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function CustomButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#a084ca",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});