import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

export default function Button({ text,onPress,variant }) {
  return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={variant === "ghost" ? styles.ghost : styles.bouton}
            onPress={onPress}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );


}
const styles = StyleSheet.create({
	bouton: {
		backgroundColor: "#C94106",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	ghost: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#aaa",
	},
	text: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
});