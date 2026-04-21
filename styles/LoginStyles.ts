import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 30,
    justifyContent: "center",
  },

title: {
  fontSize: 32,
  fontWeight: "700",
  marginBottom: 10,
  textAlign: "center",
  color: "#000",
},
subtitle: {
  marginBottom: 40,
  lineHeight: 20,
  textAlign: "center",
  color: "#000",
},
 label: {
  fontSize: 12,
  color: "#000", 
  marginTop: 10,
},
 input: {
  borderBottomWidth: 1,
  borderBottomColor: "#000",
  marginBottom: 15,
  paddingVertical: 8,
  color: "#000",
},
  forgot: {
    textAlign: "right",
    color: "#000",
    marginBottom: 30,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
  },

  orText: {
    marginHorizontal: 10,
    color: "#000",
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 5,
  },

  googleIcon: {
    width: 22,
    height: 22,
  },

  registerText: {
    textAlign: "center",
    color: "#000",
  },

  registerLink: {
    color: "#000",
    fontWeight: "600",
  },
});

export default styles;