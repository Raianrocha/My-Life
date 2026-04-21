import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#000",
  },

  // Top circles
  topCircleLight: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#cbb4f5",
    top: -60,
    left: -60,
  },

  topCircleDark: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#8e6ccf",
    top: -40,
    left: -40,
  },

  // Bottom circles
  bottomCircleLight: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#cbb4f5",
    bottom: -80,
    right: -80,
  },

  bottomCircleDark: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#8e6ccf",
    bottom: -60,
    right: -60,
  },
});

export default styles;