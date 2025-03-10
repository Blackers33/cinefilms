import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";


export default function MainSection({ navigation, user }) {
	

	return (
		<View>
			<ScrollView keyboardShouldPersistTaps={"handled"}>
			<Text>Hello</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	cards: {
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 200,
	},
});
