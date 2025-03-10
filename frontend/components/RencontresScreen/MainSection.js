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
	favMovies: [
		{
			adult: false,
			backdrop_path: "/jl2YIADk391yc6Qjy9JhgCRkHJk.jpg",
			genre_ids: [16, 18, 35],
			id: 1064486,
			original_language: "en",
			original_title: "Memoir of a Snail",
			overview:
				"La vie de Grace Pudel, petite fille solitaire, collectionneuse d’escargots et passionnée de lecture, a volé en éclats le jour de la mort de son père. Dans une famille d’accueil indifférente, séparée de son frère jumeau dont elle attend désespérément les lettres, malmenée par ses camarades, elle s’enfonce dans le désespoir...",
			popularity: 86.264,
			poster_path: "/h7yY9BmOWKnZW45Fg125K4W403R.jpg",
			release_date: "2024-10-17",
			title: "Mémoires d’un escargot",
			video: false,
			vote_average: 7.822,
			vote_count: 256,
		},
		{
			adult: false,
			backdrop_path: "/aqMBEpd4kC8GpUg6761qFPkvQuS.jpg",
			genre_ids: [28, 80],
			id: 1188104,
			original_language: "th",
			original_title: "ปล้นทะลุไมล์",
			overview: "",
			popularity: 92.281,
			poster_path: "/2qAv3Oo5akuJgZUzMzBNamfcO1j.jpg",
			release_date: "2023-11-09",
			title: "ปล้นทะลุไมล์",
			video: false,
			vote_average: 8.5,
			vote_count: 15,
		},
	],
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
