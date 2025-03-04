import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

export default function Button({ text }) {
  return(<TouchableOpacity
    activeOpacity={0.8}
    style={styles.bouton}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>)


}
const styles = StyleSheet.create({
  bouton: {
    backgroundColor: "#C94106",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    width: 200,
    
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
})