/**
 *
 * Usage : import TextInput from "../components/common/TextInput";
 * <TextInput/> Comme un TextInput normal. possibilité de changer la couleur avec <TextInput variant="light"/>
 */

import React from "react";
import { View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function TextInputStyled(props) {
	const colors =
		props.variant === "light" ? ["#CCC", "#777"] : ["#C94106", "#333"];

	return (
		<View style={{ height: 40 }}>
			<LinearGradient colors={colors} style={styles.gradiant}>
				<TextInput
					placeholderTextColor='#999'
					style={styles.buttonText}
					{...props}
				/>{props.icon && (
				<Icon
					name={props.icon}
					size={25}
					color='#fff'
					style={styles.icon}
					onPress={props.onPressIcon}
				/>
			)}
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
	buttonText: {
		paddingLeft: 10,
		color: "#FFF",
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(29, 29, 29, 0.7)",
		margin: 1,
		borderRadius: 100,
	},
	icon: { position: "absolute", right: 10, top: 6, opacity: 0.7 },
});
