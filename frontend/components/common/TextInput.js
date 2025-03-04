/**
 * @author Sacha
 *
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native";

export default function TextInputStyled(props) {
	const colors =
		props.variant === "light" ? ["#CCC", "#777"] : ["#B22E2E", "#333"];

	return (
		<View style={ styles.buttonContainer}>
			<LinearGradient
				colors={colors}
				style={styles.gradiant}
			>
				<TextInput
					placeholderTextColor='#999'
					style={styles.buttonText}
					{...props}
				/>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	gradiant: {
		
		borderRadius: 100,
		flex: 1,
		alignItems: "stretch",
	},
	buttonContainer: {
		height: 40,
	},
	buttonText: {
		paddingLeft : 10,
		color: "#FFF",
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(29, 29, 29, 0.7)",
		margin: 1,
		borderRadius: 100,
	},
});