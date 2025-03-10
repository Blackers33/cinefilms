import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Card from "./Card";

const friend = {
	username: "Sam",
	password: "$2b$10$ZIR0Imqnl80ZUqnW9woydegDZjkLzZR20HAc5NU0vGPe2/V3Rex5.",
	email: "Sam@gmail.com",
	token: "2uttv9RTPa9iTljk6x4uDJOxUMSaPftq",
	friends: [
		"67c84e67468643ecb041563a",
		"67c84eeb468643ecb041563f",
		"67ca1d44bfc125477ece24ce",
	],
	favGenres: [
		'{"id":28,"name":"Action","_index":0}',
		'{"id":12,"name":"Adventure","_index":1}',
		'{"id":16,"name":"Animation","_index":2}',
	],
	favMovies: ["Roi de Lion"],
	__v: 0,
	age: 25,
	biography:
		"Mon film préféré? Fast and furious, celui avec le gros monsieur super fort.Mon film préféré? Fast and furious, celui avec le gros monsieur super fort.Mon film préféré? Fast and furious, celui avec le gros monsieur super fort.",
	genre: "Homme",
	location: {
		name: "Paris",
		latitude: 48.859,
		longitude: 2.347,
	},
};

export default function MainSection({ navigation, user }) {
	

	return (
		<View>
			<ScrollView keyboardShouldPersistTaps={"handled"}>
				<View style={styles.cards}>
					<Text>Hello</Text>
					<Card user={friend} />
					<Card user={friend} />
					<Card user={friend} />
					<Card user={friend} />
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	cards: {
		flex: 1,
		alignItems: "center",
		marginBottom: 200,
	},
});
