import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import Avatar from "../common/Avatar";
import MovieGenresDisplay from "../common/MovieGenresDisplay";
import MoviesScrollView from "../common/MoviesScrollView";
import { useState } from "react";

export default function Card({ profile, isFriend }) {

	console.log(isFriend);

	return (
		<View style={styles.card}>
			<View style={styles.topSection}>
				<View style={styles.userInfo}>
					<Avatar uri={profile.avatar} size={64} />
					<Text style={styles.title}>{profile.username}</Text>
				</View>
				<TouchableOpacity
					onPress={() => console.log(profile._id)}
					style={isFriend ? styles.ghostFriendButton : styles.addFriendButton}
					activeOpacity={0.8}
				>
					<Text style={isFriend ? styles.ghostText : styles.buttonText}>{isFriend ? "Supprimer" : "Ajouter"}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.biography}>
				<Text style={styles.text}>{profile.biography}</Text>
			</View>
			<Text style={styles.title}>Mes films préférés</Text>
			<MoviesScrollView moviesIds={profile.favMovies} />

			<Text style={styles.title}>Mes genres préférés</Text>
			<MovieGenresDisplay list={profile.favGenres} />
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: Dimensions.get("window").width * 0.9,
		borderWidth: 1,
		borderColor: "grey",
		borderRadius: 10,
		backgroundColor: "#303232D9",
		marginTop: 20,
		padding: 8,
	},
	topSection: {
		flexDirection: "row",
		alignItems: "center",
	},
	userInfo: {
		gap: 12,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		color: "#FFF",
		fontWeight: 600,
		fontSize: 20,
	},
	text: {
		color: "#FFF",
		fontSize: 13,
	},
	biography: {
		marginTop: 10,
		marginBottom: 15,
	},
	addFriendButton: {
		backgroundColor: "rgb(201, 65, 6)",
		width: 130,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		height: 30,
	},
	ghostFriendButton: {
		borderColor: "rgb(201, 65, 6)",
		borderWidth: 1,
		width: 130,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		height: 30,
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: 18,
		fontWeight: "500",
	},
	ghostText: {
		textAlign: "center",
		color: "rgb(201, 65, 6)",
		fontSize: 18,
		fontWeight: "500",
	},
});
